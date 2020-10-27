import { buydata } from '@prisma/client'

export type Methods = {
  get: {
    query: { date: string }
    resBody: buydata[]
  }
}
