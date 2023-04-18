// trpc/routers/education.ts
import { clerkClient } from "@clerk/nextjs/server";
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
  userId: z.string(),
});

const GetUserProfile = z.object({
  userId: z.string(),
});

export const userRouter = createTRPCRouter({
  getUserProfile: publicProcedure
    .input(GetUserProfile)
    .query(({ ctx, input }) => {
      const { prisma } = ctx;
      const { userId } = input;

      return prisma.user.findUnique({
        select: { dateOfBirth: true, educationLevel: true, id: true },
        where: { id: userId },
      });
    }),
  setUserProfile: publicProcedure
    .input(SetUserProfile)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { dateOfBirth, educationLevel, userId } = input;
      const user = await clerkClient.users.getUser(userId);

      return prisma.user.upsert({
        select: {
          dateOfBirth: true,
          educationLevel: true,
          id: true,
        },
        where: { id: userId },
        create: {
          email: user.emailAddresses?.[0]?.emailAddress ?? "",
          emailVerified: new Date(user.createdAt),
          dateOfBirth,
          educationLevel,
        },
        update: {
          dateOfBirth,
          educationLevel,
        },
      });
    }),
});
