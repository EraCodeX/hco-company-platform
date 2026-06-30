const CHATBASE_BOT_ID = process.env.REACT_APP_CHATBASE_ID;

const loadChatbase = () => {
  const isSmallScreen = window.innerWidth <= 1024;

  if (isSmallScreen) return;
  if (!CHATBASE_BOT_ID) return;

  if (document.getElementById(CHATBASE_BOT_ID)) return;

  window.chatbaseConfig = {
    chatbotId: CHATBASE_BOT_ID,
  };

  setTimeout(() => {
    if (document.getElementById(CHATBASE_BOT_ID)) return;

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    script.id = CHATBASE_BOT_ID;

    document.body.appendChild(script);
  }, 3000);
};

export default loadChatbase;
