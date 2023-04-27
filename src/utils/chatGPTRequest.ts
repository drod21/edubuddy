type Choice = { message: { content: string } };
type Res = {
  choices: Choice[];
};
export const chatGPTRequest = async (prompt: string): Promise<string> => {
  const apiKey = process.env.CHATGPT_API_KEY;
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  if (!apiKey) {
    return "Error: Unable to generate content.";
  }
  // const config = new

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const body = {
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    n: 1,
    stop: null,
    temperature: 0.8,
  };

  try {
    console.log(body);
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: new Headers(headers),
      body: JSON.stringify(body),
    });
    const res = (await response.json()) as Res;
    console.log(res.choices);
    return res?.choices?.[0]?.message?.content ?? "";
  } catch (error) {
    console.error(error);
    return "Error: Unable to generate content.";
  }
};
