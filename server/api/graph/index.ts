import { MoneyGraphType } from '$/service/graph'

export type Methods = {
  get: {
    query: { from: string; to: string }
    resBody: MoneyGraphType
  }
}
