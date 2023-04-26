// function to parse user age from dateOfBirth with timezone in utc
const parseUserAge = (dateOfBirth: string) => {
	const dateOfBirthInUTC = new Date(dateOfBirth).toUTCString()
	const userAge = Math.floor(
		(Date.now() - new Date(dateOfBirthInUTC).getTime()) / 3.15576e10
	)
	return userAge
}
import type { NextApiRequest, NextApiResponse } from 'next'
import { chatGPTRequest } from '~/utils/chatGPTRequest'

type QueryString = {
	activity: string
	educationLevel: string
	subject: string
	category: string
	dateOfBirth: string
}
export default async function personHandler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { query } = req
  const { activity, educationLevel, subject, category, dateOfBirth } = query as QueryString
  const age = parseUserAge(dateOfBirth)

	const chatGpt = await chatGPTRequest(`Please generate a ${activity} content for a ${age}-year-old ${educationLevel} student studying ${subject} in the ${category} category.`)

	return res.status(200).json(chatGpt);
}
