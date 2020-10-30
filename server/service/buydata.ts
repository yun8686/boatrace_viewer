import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

export const getTodayBuyData = async (date: Date) => {
  return await prisma.buydata.findMany({
    where: {
      racedate: { equals: date }
    },
    include: {
      jyomst: true,
      raceinfo: {
        include: {
          raceresult: true
        }
      }
    }
  })
}
export const getBuySummary = async () =>
  await prisma.buydata.findFirst({
    where: {
      racedate: { gte: new Date() }
    }
  })
