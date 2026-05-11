export const analyzeDocumentWithGemini = async (text, apiKey) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const prompt = `
  You are an expert Indian Legal and Real Estate AI Assistant. 
  Analyze the following extracted text from a legal document and provide a structured JSON response.
  
  Extract the following information:
  1. "documentType": The type of instrument (e.g., Sale Deed, Lease Agreement, Power of Attorney).
  2. "state": The Indian state mentioned (e.g., Maharashtra, Delhi) if any.
  3. "propertyValue": The estimated transaction value or consideration amount mentioned in INR (as a number, or null if not found).
  4. "parties": Brief summary of the parties involved.
  5. "clauses": Key legal clauses identified (list of 3-4 bullet points).
  6. "stampDutyEstimate": A brief note about standard stamp duty implications for this type of document in the identified state.
  7. "recommendations": 2-3 actionable recommendations for the user before proceeding with registration.

  Document Text:
  """
  ${text.substring(0, 15000)} 
  """
  
  Respond strictly with valid JSON only, matching the exact keys requested above. Do not wrap in markdown tags like \`\`\`json.
  `;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || 'Failed to analyze document');
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    
    return JSON.parse(resultText);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
