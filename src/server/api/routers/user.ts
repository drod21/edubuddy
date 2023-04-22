// trpc/routers/education.ts
import { clerkClient } from "@clerk/nextjs/server";
import type { PrismaClient, User } from "@prisma/client";
import { cache } from "react";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure, // TODO: Add protected routes
} from "~/server/api/trpc";

// Input types
const SetUserProfile = z.object({
  dateOfBirth: z.date(),
  educationLevel: z.string(),
  externalId: z.string(),
  userId: z.string(),
});

const GetUserProfile = z.object({
  userId: z.string(),
});
export const getUserProfile = async (
  userId: string,
  prisma: PrismaClient
): Promise<Pick<User, "dateOfBirth" | "id" | "educationLevel"> | null> => {
  const user = await prisma.user.findUnique({
    select: { dateOfBirth: true, educationLevel: true, id: true },
    where: { id: userId },
  });

  return user;
};
export const userRouter = createTRPCRouter({
  getUserProfile: publicProcedure.input(GetUserProfile).query(
    cache(
      async ({
        ctx,
        input,
      }): Promise<Pick<
        User,
        "dateOfBirth" | "id" | "educationLevel"
      > | null> => {
        const { prisma } = ctx;
        const { userId } = input;
        return await getUserProfile(userId, prisma);
      }
    )
  ),
  setUserProfile: publicProcedure
    .input(SetUserProfile)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { dateOfBirth, educationLevel, externalId, userId } = input;
      if (!externalId) {
        const user = await clerkClient.users.getUser(userId);
        const createdUser = await prisma.user.create({
          data: {
            email: user.emailAddresses?.[0]?.emailAddress ?? "",
            emailVerified: new Date(user.createdAt),
            dateOfBirth,
            educationLevel,
          },
          select: {
            dateOfBirth: true,
            educationLevel: true,
            id: true,
          },
        });
        console.log(createdUser);
        await clerkClient.users.updateUser(userId, {
          externalId: createdUser.id,
        });
        return createdUser;
      }

      return prisma.user.update({
        select: {
          dateOfBirth: true,
          educationLevel: true,
          id: true,
        },
        where: { id: externalId },
        data: {
          dateOfBirth,
          educationLevel,
        },
      });
    }),
});
