import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export type GetSearchResultType = {
  text: string
}
export type ResultSearchData = {
  racedate: Date
  jyocode: string
  raceno: string
  jyoname?: string
  kumiban: string
  odds: string
}
export const getSearchResult = async ({ text }: GetSearchResultType) => {
  const texts = text.split(/\n/)
  const data: ResultSearchData[] = []
  let racedate = { year: '', month: '', date: '' }
  let jyocode = ''
  let raceno = ''

  const jyomst = (await prisma.jyomst.findMany()).reduce(
    (prev, curr) => ({
      ...prev,
      [curr.name]: curr.code,
      [curr.code]: curr.name
    }),
    {} as { [key: string]: string }
  )
  texts.forEach((text) => {
    const dates = text.match(/(\d{4})\/(\d{1,2})\/(\d{1,2})/)
      ? text.match(/(\d{4})\/(\d{1,2})\/(\d{1,2})/)
      : [null, racedate.year, racedate.month, racedate.date]

    Object.keys(jyomst).forEach((key) => {
      if (isNaN(parseInt(key))) {
        const jyo = jyomst[key]
        if (text.indexOf(key) >= 0) {
          jyocode = jyo
        }
      }
    })

    const rn = text.match(/(\d+)R/)
    const rno = rn ? rn[1] : ''

    racedate.year = dates && dates[1] ? dates[1] : racedate.year
    racedate.month = dates && dates[2] ? dates[2] : racedate.month
    racedate.date = dates && dates[3] ? dates[3] : racedate.date

    data.push({
      racedate: new Date(
        parseInt(racedate.year),
        parseInt(racedate.month) - 1,
        parseInt(racedate.date)
      ),
      jyocode: jyocode,
      jyoname: jyomst[jyocode],
      raceno: ('0' + (rno ? rno : raceno)).slice(-2),
      kumiban: '',
      odds: ''
    })
  })
  const res = await searchResult(data)
  console.log('data', data, res)
  return await searchResult(data)
}

const searchResult = async (
  data: ResultSearchData[]
): Promise<ResultSearchData[]> => {
  const inSet = data
    .filter((data) => data.racedate && data.jyocode && data.raceno)
    .map(
      (data) =>
        `('${data.racedate.toLocaleDateString()}','${data.jyocode}','${
          data.raceno
        }')`
    )
    .join(',')
  if (inSet.length === 0) return data
  const query = ` select 
        racedate as racedate,
        jyocode,
        raceno,
        santankumiban as kumiban,
        santanodds as odds
    from buydata 
    join raceresult using (racedate, jyocode, raceno) 
    where (racedate,jyocode,raceno) in (${inSet})
  ;`
  console.log('query', query)

  const result = await prisma.$queryRaw<Omit<ResultSearchData, 'jyoname'>[]>(
    query
  )
  return result
}
