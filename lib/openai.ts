import OpenAI from "openai";
import { searchLeads } from "./serper";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "sk-dummy",
});

export default openai;

export async function generateLeads(industry: string, description: string, location: string) {
  const searchResults = await searchLeads(industry, description, location);
  
  let searchContext = "";
  if (searchResults) {
    searchContext = `Here are some real-time search results to help you find accurate leads:\n${JSON.stringify(searchResults.organic)}\n\n`;
  }

  const prompt = `${searchContext}You are a professional lead generation expert. 
  Find 5 highly qualified potential leads for a business in the ${industry} industry.
  Target customer description: ${description}
  Location: ${location}

  For each lead, provide:
  - Name
  - Email (if not in search results, use realistic looking but fake emails ending in @company.com)
  - Phone
  - Company
  - LinkedIn URL
  - Why they are a good lead (lead score: HOT, WARM, or COLD)

  Format the output as a JSON array of objects with the following keys:
  "name", "email", "phone", "company", "linkedinUrl", "score", "description"
  
  Return the data in a root object with the key "leads".`;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: "You are a lead generation assistant that outputs only valid JSON." },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" }
  });

  const content = response.choices[0].message.content;
  if (!content) return [];
  
  const parsed = JSON.parse(content);
  return Array.isArray(parsed.leads) ? parsed.leads : parsed.data || [];
}

export async function generatePersonalizedEmail(leadName: string, company: string, userProduct: string) {
  const prompt = `Write a short, personalized cold email to ${leadName} at ${company}.
  The email should pitch: ${userProduct}
  Keep it professional, concise, and focused on how it solves their pain points.
  Include a clear call to action.
  Do not include subject lines or placeholders like [Your Name]. Just the body.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: "You are a professional cold email copywriter." },
      { role: "user", content: prompt }
    ]
  });

  return response.choices[0].message.content;
}
