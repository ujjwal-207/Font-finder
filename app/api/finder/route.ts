import { detectFontFromText, detectFontFromImage } from "../../../lib/gemini";

export async function POST(request) {
  try {
    const data = await request.json();
    const { inputType, content } = data;

    let result;

    if (inputType === "text") {
      result = await detectFontFromText(content);
    } else if (inputType === "image") {
      result = await detectFontFromImage(content);
    } else {
      return Response.json({ error: "Invalid input type" }, { status: 400 });
    }

    return Response.json(result);
  } catch (error) {
    console.error("Error in font detection API:", error);
    return Response.json(
      { error: "Failed to process request", message: error.message },
      { status: 500 }
    );
  }
}
