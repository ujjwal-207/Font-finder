import { GoogleGenerativeAI } from "@google/generative-ai";

export function initializeGeminiAI() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  return new GoogleGenerativeAI(apiKey);
}

// Detects fonts from text using Gemini AI
export async function detectFontFromText(text) {
  const genAI = initializeGeminiAI();
  // Use the newer gemini-1.5-flash model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  Analyze the following text and identify the font that was likely used.
  Return your analysis as a JSON object with this structure:
  {
    "detectedFonts": [
      {
        "name": "Font Name",
        "confidence": 0.XX,
        "properties": {
          "weight": "regular/bold/etc.",
          "style": "normal/italic"
        }
      }
    ],
    "reasoning": "Brief explanation of your analysis"
  }
  
  Only include fonts with a confidence score of 0.50 or higher.
  Limit to the top 3 most likely fonts.
  
  Text to analyze:
  ${text}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    // Extract JSON from the response
    const jsonMatch =
      textResponse.match(/```json\n([\s\S]*?)\n```/) ||
      textResponse.match(/{[\s\S]*}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[1] || jsonMatch[0]);
    } else {
      throw new Error("Failed to parse JSON from Gemini response");
    }
  } catch (error) {
    console.error("Error detecting font from text:", error);
    throw error;
  }
}

export async function detectFontFromImage(imageData) {
  const genAI = initializeGeminiAI();

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const base64Data = imageData.split(",")[1];
  const mimeType = imageData.split(";")[0].split(":")[1];

  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };

  const prompt = `
  Analyze this image and identify the fonts visible in it.
  Return your analysis as a JSON object with this structure:
  {
    "detectedFonts": [
      {
        "name": "Font Name",
        "confidence": 0.XX,
        "properties": {
          "weight": "regular/bold/etc.",
          "style": "normal/italic"
        }
      }
    ],
    "reasoning": "Brief explanation of your analysis"
  }
  
  Only include fonts with a confidence score of 0.50 or higher.
  Limit to the top 3 most likely fonts.
  `;

  try {
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const textResponse = response.text();

    // Extract JSON from the response
    const jsonMatch =
      textResponse.match(/```json\n([\s\S]*?)\n```/) ||
      textResponse.match(/{[\s\S]*}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[1] || jsonMatch[0]);
    } else {
      throw new Error("Failed to parse JSON from Gemini response");
    }
  } catch (error) {
    console.error("Error detecting font from image:", error);
    throw error;
  }
}
