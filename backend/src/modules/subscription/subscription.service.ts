import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const SubscriptionService = {
  async getSubscription(userId: number) {
    return prisma.subscription.findFirst({
      where: { userId },
    });
  },

  async updateSubscription(userId: number, plan: string) {
    const existingSubscription = await prisma.subscription.findFirst({
      where: { userId },
    });

    if (existingSubscription) {
      return prisma.subscription.update({
        where: { id: existingSubscription.id },
        data: { plan },
      });
    } else {
      return prisma.subscription.create({
        data: {
          userId,
          plan,
        },
      });
    }
  },
};