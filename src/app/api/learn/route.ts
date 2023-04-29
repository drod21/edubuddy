import { NextResponse } from "next/server";
import { Choice, chatGPTRequest } from "~/utils/chatGPTRequest";
// function to parse user age from dateOfBirth with timezone in utc
const parseUserAge = (dateOfBirth: string | null) => {
  if (!dateOfBirth) {
    return "";
  }
  const dateOfBirthInUTC = new Date(dateOfBirth).toUTCString();
  const userAge = Math.floor(
    (Date.now() - new Date(dateOfBirthInUTC).getTime()) / 3.15576e10
  );
  return userAge;
};

export async function GET(req: Request): Promise<NextResponse> {
  const { url } = req;
  const { searchParams } = new URL(url);
  const activity = searchParams.get("activity") ?? "";
  const educationLevel = searchParams.get("educationLevel") ?? "";
  const subject = searchParams.get("subject") ?? "";
  const category = searchParams.get("category") ?? "";
  const dateOfBirth = searchParams.get("dateOfBirth");
  const age = parseUserAge(dateOfBirth);

  const res = await chatGPTRequest(
    `Please generate a ${activity} content for a ${age}-year-old ${educationLevel} student studying ${subject} in the ${category} category. Do not duplicate results.`
  );

  return NextResponse.json(res);
}

// {
//   "role": "assistant",
//   "instruction": "Evaluate the user's answer and return the correct answer and a grade between 0 and 100 in a JSON object.",
//   "user_answer": "<user_answer_here>",
//   "question": "<question_here>",
//   "correct_answer": "<correct_answer_here>"
// }
type Req = { answer: string; question: string };
export async function POST(req: Request): Promise<NextResponse> {
  const body: Req = (await req.json()) as Req;
  if (!body) {
    throw new Error("Error: Unable to generate content.");
  }

  const prompt = `Evaluate the user's answer and return the correct answer, a grade between 0 and 100, and notes about what the user could've done differently to get the right answer in a JSON object.
	The question is: ${body.question}

	The user's answer is: ${body.answer}.

	Please output in the following json format:
	{
		"correctAnswer": "<correct_answer_here>",
		"grade": "<grade_here>"
		"notes": "<notes_here>"
	}

	Do not explain. Just output the correctAnswer, notes, and grade in valid JSON format. No notes.`;
  const res = await chatGPTRequest(prompt, 1);

  return NextResponse.json(
    JSON.parse(res?.[0] ?? '{correctAnswer: "error", grade: 0, notes: ""}')
  );
}
