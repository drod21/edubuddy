import { NextResponse } from "next/server";
import { chatGPTRequest } from "~/utils/chatGPTRequest";
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

export async function GET(req: Request) {
  const { url } = req;
  const { searchParams } = new URL(url);
  const activity = searchParams.get("activity") ?? "";
  const educationLevel = searchParams.get("educationLevel") ?? "";
  const subject = searchParams.get("subject") ?? "";
  const category = searchParams.get("category") ?? "";
  const dateOfBirth = searchParams.get("dateOfBirth");
  const age = parseUserAge(dateOfBirth);

  const res = await chatGPTRequest(
    `Please generate a ${activity} content for a ${age}-year-old ${educationLevel} student studying ${subject} in the ${category} category.`
  );

  return NextResponse.json({ res });
}
