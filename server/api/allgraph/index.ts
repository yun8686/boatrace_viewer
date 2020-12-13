import { AllGraphRow } from '$/service/allgraph'

export type Methods = {
  get: {
    query: { year: number }
    resBody: AllGraphRow[]
  }
}
