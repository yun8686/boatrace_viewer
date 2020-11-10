import { RaceInfoData } from '$/service/raceinfo'
import { jyomst, raceinfo } from '@prisma/client'

export type Methods = {
  get: {
    query: { date: string }
    resBody: RaceInfoData[]
  }
}
