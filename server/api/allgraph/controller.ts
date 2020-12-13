import { getAllGraph } from '$/service/allgraph'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async (params) => ({
    status: 200,
    body: await getAllGraph(params.query)
  })
}))
