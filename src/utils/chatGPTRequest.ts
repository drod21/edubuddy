import axios, { type AxiosResponse } from "axios";

type Res = {
  choices: {
    text: string;
  }[];
};
export const chatGPTRequest = async (prompt: string) => {
  const apiKey = process.env.CHATGPT_API_KEY;
  const apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";
  if (!apiKey) {
    return "Error: Unable to generate content.";
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const body = {
    prompt,
    max_tokens: 50,
    n: 1,
    stop: null,
    temperature: 0.8,
  };

  try {
    const response: AxiosResponse<Res> = await axios.post(apiUrl, body, {
      headers: headers,
    });

    return response?.data?.choices?.[0]?.text;
  } catch (error) {
    console.error(error);
    return "Error: Unable to generate content.";
  }
};
