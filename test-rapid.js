require('dotenv').config({ path: '.env.local' });
const axios = require('axios');

async function testRapidAPI() {
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST || "instagram-scraper-api2.p.rapidapi.com";
  
  console.log("Testing with Key:", apiKey ? apiKey.substring(0, 5) + "..." : "MISSING");
  console.log("Testing with Host:", apiHost);

  if (!apiKey) {
    console.error("No API key found in .env.local!");
    return;
  }

  const url = "https://www.instagram.com/reel/C2pG4Vxo4Q2/";

  try {
    const options = {
      method: "GET",
      url: `https://${apiHost}/v1.2/info`,
      params: { url_embed: url },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiHost,
      },
    };

    console.log("Sending request to RapidAPI...");
    const response = await axios.request(options);
    console.log("Response Status:", response.status);
    console.log("Success! Data preview:", JSON.stringify(response.data).substring(0, 150));
  } catch (error) {
    console.error("Request Failed!");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
  }
}

testRapidAPI();
