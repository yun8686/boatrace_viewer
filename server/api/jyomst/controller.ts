import { defineController } from './$relay'
import { getJyoList } from '$/service/jyomst'

export default defineController({ getJyoList }, ({ getJyoList }) => ({
  get: async () => {
    return { status: 200, body: await getJyoList() }
  }
}))
