export type Choice = { message: { content: string } };
type Res = {
  choices: Choice[];
};
export const chatGPTRequest = async (prompt: string): Promise<string[]> => {
  const apiKey = process.env.CHATGPT_API_KEY;
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  if (!apiKey) {
    throw new Error("Error: Unable to generate content.");
  }
  // const config = new

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const body = {
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    n: 3,
    stop: null,
    temperature: 0.4,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: new Headers(headers),
      body: JSON.stringify(body),
    });
    const res = (await response.json()) as Res;
    // filter out choices that are identical.
    const uniqueChoices = [
      ...new Set(res?.choices.map((question) => question.message.content)),
    ];
    return uniqueChoices ?? [];
  } catch (error) {
    console.error(error);
    throw new Error("Error: Unable to generate content.");
  }
};
