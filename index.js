const { App } = require("@slack/bolt");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const expressApp = express();
expressApp.use(bodyParser.json());

expressApp.post("/slack/events", (req, res) => {
  const { type, challenge } = req.body;

  if (type === "url_verification") {
    res.status(200).send(challenge);
  } else {
    // Manejar otros eventos
    app.processEvent(req, res);
  }
});

app.message(async ({ message, say }) => {
  if (message.text.startsWith("translate:")) {
    const textAndLang = message.text.replace("translate:", "").trim();
    const [textToTranslate, targetLang] = textAndLang.split(" to ");

    if (!textToTranslate || !targetLang) {
      await say(
        "Please use the format: `translate: [text] to [language code]` (e.g., `translate: Hello, how are you? to ES`)"
      );
      return;
    }

    const translatedText = await translateText(
      textToTranslate.trim(),
      targetLang.toUpperCase()
    );
    await say(`Translation: ${translatedText}`);
  }
});

async function translateText(text, targetLang) {
  try {
    const response = await axios.post(
      "https://api-free.deepl.com/v2/translate",
      null,
      {
        params: {
          auth_key: process.env.DEEPL_API_KEY,
          text: text,
          target_lang: targetLang,
        },
      }
    );

    return response.data.translations[0].text;
  } catch (error) {
    console.error("Error translating text:", error);
    return "Error translating text";
  }
}

(async () => {
  await app.start(process.env.PORT || 3001);
  console.log("⚡️ Bolt app is running!");
})();
