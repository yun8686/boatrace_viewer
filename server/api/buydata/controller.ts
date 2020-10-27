import { getTodayBuyData } from '$/service/buydata'
import { defineController } from './$relay'
import { stringToDate } from '../../../utils/dateUtils'

export default defineController(() => ({
  get: async (param) => {
    return {
      status: 200,
      body: await getTodayBuyData(stringToDate(param.query.date))
    }
  }
}))
