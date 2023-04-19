// trpc/routers/education.ts
import { clerkClient } from "@clerk/nextjs/server";
import { PrismaClient, User } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";
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
    .query(
      async ({
        ctx,
        input,
      }): Promise<Pick<
        User,
        "dateOfBirth" | "id" | "educationLevel"
      > | null> => {
        const { prisma } = ctx;
        const { userId } = input;
        const user = await prisma.user.findUnique({
          select: { dateOfBirth: true, educationLevel: true, id: true },
          where: { id: userId },
        });

        return user;
      }
    ),
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
