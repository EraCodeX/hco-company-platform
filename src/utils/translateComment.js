// src/utils/translateComment.js
export const translateComment = async (text, targetLang) => {
  try {
    // Kontrollo nëse gjuha është e mbështetur nga LibreTranslate
    const supported = ["en", "sq", "fr", "de", "it", "es"];
    const lang = supported.includes(targetLang) ? targetLang : "en";

    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: lang,
        format: "text",
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
};
