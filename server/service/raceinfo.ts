import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query'] })

export type RaceInfoData = {
  jyoname: string
  raceNo: string
  time: number
  fstkumiban: string
  fstodds: number
  buyprice: number
  buykumiban: string
  buystatus: 'closed' | 'complete' | null
  reskumiban: string
}

export const getTodayRaceInfo = async (date: Date) => {
  return await prisma.$queryRaw<RaceInfoData[]>(
    `select racedate, raceNo, name as jyoname, time, 
        rentan3.kumiban as fstkumiban,
        rentan3.odds as fstodds,
        buydata.kumiban as buykumiban,
        buydata.price as buyprice,
        buydata.buystatus,
        raceresult.santankumiban as reskumiban
     from raceinfo 
     join jyomst on raceinfo.jyocode = jyomst.code 
     left join rentan3 using (racedate,jyocode,raceno)
     left join buydata using (racedate,jyocode,raceno)
     left join raceresult using (racedate,jyocode,raceno)
     where (rentan3.rank = 1 or rentan3.racedate is null) and raceinfo.racedate = ?;`,
    date
  )
}
