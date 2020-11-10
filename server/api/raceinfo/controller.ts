import { stringToDate } from '$/../utils/dateUtils'
import { getTodayRaceInfo } from '$/service/raceinfo'
import { defineController } from './$relay'

export default defineController(() => ({
  get: async (param) => {
    return {
      status: 200,
      body: await getTodayRaceInfo(stringToDate(param.query.date))
    }
  }
}))
