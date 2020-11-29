import { GetSearchResultType, ResultSearchData } from '$/service/resultsearch'

export type Methods = {
  get: {
    query: GetSearchResultType
    resBody: ResultSearchData[]
  }
}
