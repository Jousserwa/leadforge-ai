import axios from "axios";

export async function searchLeads(industry: string, description: string, location: string) {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) {
    console.warn("Serper API key is not set. Skipping web search.");
    return null;
  }

  const query = `${industry} ${description} in ${location} companies contact info`;
  
  try {
    const response = await axios.post(
      "https://google.serper.dev/search",
      {
        q: query,
        num: 10,
      },
      {
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Serper search error:", error);
    return null;
  }
}
