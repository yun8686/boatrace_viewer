import { getSearchResult } from '$/service/resultsearch'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async (req) => ({ status: 200, body: await getSearchResult(req.query) })
}))
