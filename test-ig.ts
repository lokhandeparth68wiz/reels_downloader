import { extractVideoInfo } from "./src/lib/instagram";

async function test() {
  try {
    const info = await extractVideoInfo("https://www.instagram.com/reel/C2pG4Vxo4Q2/");
    console.log(JSON.stringify(info, null, 2));
  } catch (err) {
    console.error(err);
  }
}

test();
