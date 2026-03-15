const axios = require("axios");

async function testSnap() {
  const url = "https://www.instagram.com/reel/C2pG4Vxo4Q2/";
  
  try {
    const params = new URLSearchParams();
    params.append("url", url);
    params.append("action", "post");

    const res = await axios.post("https://snapinsta.app/action.php", params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Origin": "https://snapinsta.app",
        "Referer": "https://snapinsta.app/"
      }
    });
    
    console.log("Status:", res.status);
    console.log("Response starts with:", res.data.substring ? res.data.substring(0, 200) : res.data);
  } catch (err) {
    console.log("Error:", err.message);
  }
}
testSnap();
