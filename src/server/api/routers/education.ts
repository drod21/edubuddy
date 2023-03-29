// trpc/routers/education.ts
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { chatGPTRequest } from "~/utils/chatGPTRequest"; // Move the chatGPTRequest function to a separate utility file.

// Input types
const GenerateContentInput = z.object({
  age: z.number(),
  category: z.string(),
});

const GradeAnswerInput = z.object({
  question: z.string(),
  userAnswer: z.string(),
  correctAnswer: z.string(),
});

export const educationRouter = createTRPCRouter({
  generateContent: publicProcedure
    .input(GenerateContentInput)
    .query(async ({ input }) => {
      const { age, category } = input;
      const prompt = `Create age-appropriate educational content for a ${age}-year-old in the subject of ${category}.`;

      const content = await chatGPTRequest(prompt);
      return { content };
    }),
  gradeAnswer: publicProcedure
    .input(GradeAnswerInput)
    .query(async ({ input }) => {
      const { question, userAnswer, correctAnswer } = input;
      const prompt = `Question: ${question}\nUser's answer: ${userAnswer}\nCorrect answer: ${correctAnswer}\nIs the user's answer correct?`;

      const isCorrect = await chatGPTRequest(prompt);

      return { isCorrect: isCorrect?.trim()?.toLowerCase() === "yes" };
    }),
});
