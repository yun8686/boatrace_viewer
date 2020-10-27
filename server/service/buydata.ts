import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query'] })

export const getTodayBuyData = async (date: Date) => {
  console.log('date', date)
  return await prisma.buydata.findMany({
    where: {
      racedate: { equals: date }
    }
  })
}
export const getBuySummary = async () =>
  await prisma.buydata.findFirst({
    where: {
      racedate: { gte: new Date() }
    }
  })
