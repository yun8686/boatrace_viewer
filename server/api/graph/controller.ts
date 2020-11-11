import { stringToDate } from '$/../utils/dateUtils'
import { getMoneyGraph } from '$/service/graph'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async (param) => {
    return {
      status: 200,
      body: await getMoneyGraph(stringToDate(param.query.date))
    }
  }
}))
