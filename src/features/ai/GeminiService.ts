import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
// NOTE: Ideally use an environment variable. For "Free to build", user might need to set this.
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

const genAI = new GoogleGenerativeAI(API_KEY);

// Structured output schema description
const FOOD_ANALYSIS_PROMPT = `
  Analyze the following food item(s).
  Return ONLY a valid JSON object (no markdown, no backticks) with the following structure:
  {
    "name": "Short descriptive name of the meal",
    "calories": number (estimated total calories),
    "protein": number (grams),
    "carbs": number (grams),
    "fat": number (grams),
    "confidence": number (0-1 score of how sure you are),
    "ingredients": ["list", "of", "detected", "ingredients"]
  }
  Be realistic with portion sizes if not specified.
`;

export const GeminiService = {
    /**
     * Analyze food from a natural language text description
     * @param text e.g. "I ate a large pepperoni pizza"
     */
    async analyzeText(text: string) {
        if (!API_KEY) throw new Error('Gemini API Key is missing');

        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const result = await model.generateContent([
                FOOD_ANALYSIS_PROMPT,
                `User Input: "${text}"`
            ]);
            const response = await result.response;
            const textResponse = response.text();
            return JSON.parse(textResponse.replace(/```json|```/g, '').trim());
        } catch (error) {
            console.error('Gemini Text Analysis Error:', error);
            throw error;
        }
    },

    /**
     * Analyze food from a base64 image
     * @param base64Image Base64 string of the image
     * @param mimeType e.g. 'image/jpeg'
     */
    async analyzeImage(base64Image: string, mimeType = 'image/jpeg') {
        if (!API_KEY) throw new Error('Gemini API Key is missing');

        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const imagePart = {
                inlineData: {
                    data: base64Image,
                    mimeType
                }
            };

            const result = await model.generateContent([
                FOOD_ANALYSIS_PROMPT,
                imagePart
            ]);
            const response = await result.response;
            const textResponse = response.text();
            return JSON.parse(textResponse.replace(/```json|```/g, '').trim());
        } catch (error) {
            console.error('Gemini Image Analysis Error:', error);
            throw error;
        }
    }
};
