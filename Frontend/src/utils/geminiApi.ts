import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";

export const createChatSession = (apiKey: string) => {
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  return chatSession;
};

export const getTaskSuggestions = async (task: string, apiKey: string): Promise<string[]> => {
  const chatSession = createChatSession(apiKey);

  try {
    const result = await chatSession.sendMessage(
      `Can you provide some helpful suggestions related to this task: "${task}"?`
    );

    // Clean up the response text and convert markdown to HTML
    const rawText = await result.response.text();
    const htmlText = marked(rawText); // Convert markdown to HTML

    // Add inline style to make the text smaller
    const styledHtmlText = htmlText.replace(/<\/(h[1-6])>/g, (match) => {
      return `${match}<div style="font-size: 1rem;">`;
    }).replace(/<\/div><div style="font-size:1rem;">/g, '</div><div style="font-size: 0.8rem;">');

    // Split the HTML by sections and clean up
    const cleanedSuggestions = styledHtmlText
      .split(/<\/h2>|<\/h3>|<\/h4>|<\/h5>|<\/h6>/) // Split by heading tags
      .map((section  ) => section.trim())
      .filter((section) => section !== '');

    return cleanedSuggestions;
  } catch (error) {
    console.error("Error fetching suggestions from Gemini API", error);
    return ["No suggestions available at this time."];
  }
};
