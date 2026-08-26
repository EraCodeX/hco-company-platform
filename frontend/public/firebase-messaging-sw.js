importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js",
);

const searchParams = new URL(self.location).searchParams;

firebase.initializeApp({
  apiKey: searchParams.get("apiKey"),
  authDomain: searchParams.get("authDomain"),
  projectId: searchParams.get("projectId"),
  storageBucket: searchParams.get("storageBucket"),
  messagingSenderId: searchParams.get("messagingSenderId"),
  appId: searchParams.get("appId"),
  measurementId: searchParams.get("measurementId"),
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};

  console.log(
    "[firebase-messaging-sw.js] Background message received:",
    payload,
  );

  self.registration.showNotification(title || "New Notification", {
    body: body || "",
    icon: "/hocompany-logo192.png",
    badge: "/hocompany-favicon.png",
  });
});
