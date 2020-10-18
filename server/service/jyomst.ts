import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getJyoList = async (limit?: number) =>
  (await prisma.jyomst.findMany()).slice(0, limit)
