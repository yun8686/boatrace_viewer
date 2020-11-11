import { MoneyGraphType } from '$/service/graph'

export type Methods = {
  get: {
    query: { date: string }
    resBody: MoneyGraphType
  }
}
