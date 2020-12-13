import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export type AllGraphRow = {
  year: number
  month: number
  jyocode: string
  jyoname: string
  racenum: number
  winnum: number
}

export const getAllGraph = async ({
  year
}: {
  year: number
}): Promise<AllGraphRow[]> => {
  const firstDate = new Date(year, 0, 1)
  const lastDate = new Date(year + 1, 0, 0)
  const result = await prisma.$queryRaw<AllGraphRow[]>(
    ` select 
        min(year(racedate)) as year,
        month(racedate) as month,
        jyocode,
        (select name from jyomst where code = jyocode) as jyoname,
        count(1) as racenum,
        count(case when santankumiban = '1-2-3' then 1 end) as winnum
    from raceinfo 
    join raceresult using (racedate, jyocode, raceno) 
    where racedate between ? and ?
    group by month(racedate), jyocode
    order by month(racedate), jyocode
        ;`,
    firstDate,
    lastDate
  )
  return result
}
