import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type MoneyGraphRow = {
  racedate: string
  paysum: number
  payoutsum: number
}
export type MoneyGraphType = {
  startData: MoneyGraphRow
  monthDataList: MoneyGraphRow[]
}

export const getMoneyGraph = async ({
  from: firstDate,
  to: lastDate
}: {
  from: Date
  to: Date
}): Promise<MoneyGraphType> => {
  const startData = await prisma.$queryRaw<MoneyGraphRow[]>(
    ` select 
        max(racedate) as racedate,
        sum(price) as paysum,
        round(
            sum(
                price * (
                    case when kumiban = santankumiban then 1 else 0 end
                ) * santanodds
            )
        ) as payoutsum
    from buydata 
    join raceresult using (racedate, jyocode, raceno) 
    where buystatus = 'complete' and racedate < ?
    ;`,
    firstDate
  )
  const monthDataList = await prisma.$queryRaw<MoneyGraphRow[]>(
    ` select 
        racedate,
        sum(price) as paysum,
        round(
            sum(
                price * (
                    case when kumiban = santankumiban then 1 else 0 end
                ) * santanodds
            )
        ) as payoutsum
    from buydata 
    join raceresult using (racedate, jyocode, raceno) 
    where buystatus = 'complete' and racedate between ? and ?
    group by racedate
    ;`,
    firstDate,
    lastDate
  )
  return { startData: startData[0], monthDataList }
}
