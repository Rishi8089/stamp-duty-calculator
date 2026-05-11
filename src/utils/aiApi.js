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
  
  Respond strictly with valid JSON only, matching the exact keys requested above. Do not wrap in markdown tags like \\\`\\\`\\\`json.
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

export const analyzeDocumentWithClaude = async (text, apiKey) => {
  const url = "https://api.anthropic.com/v1/messages";
  
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
  
  Respond strictly with valid JSON only, matching the exact keys requested above. Do not wrap in markdown tags like \\\`\\\`\\\`json.
  `;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        temperature: 0.2,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || 'Failed to analyze document with Claude');
    }

    const data = await response.json();
    let resultText = data.content[0].text;
    
    // Clean up potential markdown formatting
    if (resultText.startsWith('\`\`\`json')) {
      resultText = resultText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    }
    
    return JSON.parse(resultText);
  } catch (error) {
    console.error("Claude API Error:", error);
    throw error;
  }
};

export const analyzeDocumentWithChatGPT = async (text, apiKey) => {
  const url = "https://api.openai.com/v1/chat/completions";
  
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
  
  Respond strictly with valid JSON only. Do not wrap in markdown tags like \\\`\\\`\\\`json.
  `;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are a helpful legal assistant that outputs only valid JSON." },
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || 'Failed to analyze document with ChatGPT');
    }

    const data = await response.json();
    const resultText = data.choices[0].message.content;
    
    return JSON.parse(resultText);
  } catch (error) {
    console.error("ChatGPT API Error:", error);
    throw error;
  }
};

export const analyzeDocumentWithCopilot = async (text, apiKey, endpoint) => {
  // Azure OpenAI requires the endpoint URL. For simplicity in this demo, if no endpoint is provided,
  // we'll throw an error telling the user they need to configure it, or we could simulate it.
  if (!endpoint) {
    throw new Error("Azure OpenAI (Copilot) requires an Endpoint URL. Please use ChatGPT or Gemini for this demo.");
  }
  
  const url = `${endpoint.replace(/\/$/, '')}/openai/deployments/gpt-4/chat/completions?api-version=2023-05-15`;
  
  // Implementation similar to ChatGPT but using api-key header
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
  
  Respond strictly with valid JSON only. Do not wrap in markdown tags like \\\`\\\`\\\`json.
  `;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        temperature: 0.2,
        messages: [
          { role: "system", content: "You are a helpful legal assistant that outputs only valid JSON." },
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || 'Failed to analyze document with Azure OpenAI');
    }

    const data = await response.json();
    const resultText = data.choices[0].message.content;
    
    return JSON.parse(resultText);
  } catch (error) {
    console.error("Azure OpenAI API Error:", error);
    throw error;
  }
};

export const analyzeDocument = async (text, apiKey, provider, endpoint = '') => {
  switch (provider) {
    case 'claude':
      return await analyzeDocumentWithClaude(text, apiKey);
    case 'chatgpt':
      return await analyzeDocumentWithChatGPT(text, apiKey);
    case 'copilot':
      return await analyzeDocumentWithCopilot(text, apiKey, endpoint);
    case 'gemini':
    default:
      return await analyzeDocumentWithGemini(text, apiKey);
  }
};
