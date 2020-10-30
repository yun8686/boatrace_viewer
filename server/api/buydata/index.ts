import { buydata, jyomst, raceinfo, raceresult } from '@prisma/client'

export type Methods = {
  get: {
    query: { date: string }
    resBody: (buydata & {
      jyomst: jyomst
      raceinfo: raceinfo & { raceresult: raceresult | null }
    })[]
  }
}
