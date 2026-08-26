import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const getMessagingIfSupported = async () => {
  try {
    const supported = await isSupported();

    if (!supported) {
      console.warn("Firebase Messaging is not supported in this browser.");
      return null;
    }

    if (!("serviceWorker" in navigator)) {
      console.warn("Service Worker is not supported in this browser.");
      return null;
    }

    return getMessaging(app);
  } catch (error) {
    console.error("Messaging support check failed:", error);
    return null;
  }
};

export const saveApplicationToFirestore = async (data) => {
  try {
    await addDoc(collection(db, "applications"), {
      ...data,
      timestamp: serverTimestamp(),
    });
    console.log("Application saved in Firestore");
  } catch (err) {
    console.error("Error saving application:", err);
  }
};

export const requestNotificationPermission = async () => {
  try {
    if (!("Notification" in window)) {
      console.warn("Notifications are not supported in this browser.");
      return null;
    }

    const permission = await Notification.requestPermission();
    console.log("Notification permission:", permission);
    return permission;
  } catch (error) {
    console.error("Notification permission error:", error);
    return null;
  }
};

const registerServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) {
    return null;
  }

  try {
    const params = new URLSearchParams({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
      messagingSenderId:
        process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "",
      appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "",
    });

    const registration = await navigator.serviceWorker.register(
      `/firebase-messaging-sw.js?${params.toString()}`,
    );

    console.log("Service Worker registered:", registration);
    return registration;
  } catch (err) {
    console.error("Service Worker registration failed:", err);
    return null;
  }
};

export const getFirebaseToken = async () => {
  try {
    const messaging = await getMessagingIfSupported();
    if (!messaging) return null;

    const permission = await requestNotificationPermission();
    if (permission !== "granted") return null;

    const registration = await registerServiceWorker();
    if (!registration) return null;

    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log("Firebase Token:", token);
      return token;
    }

    console.warn("No Firebase token received.");
    return null;
  } catch (error) {
    console.error("Error getting Firebase token:", error);
    return null;
  }
};

export const saveNotificationToFirestore = async (
  payload,
  userEmail = null,
) => {
  const { title, body } = payload.notification || {};
  if (!title || !body) return;

  try {
    await addDoc(collection(db, "notifications"), {
      title: {
        en: typeof title === "object" ? title.en || "New Notification" : title,
        al: typeof title === "object" ? title.al || "Njoftim i Ri" : title,
      },
      body: {
        en: typeof body === "object" ? body.en || "" : body,
        al: typeof body === "object" ? body.al || "" : body,
      },
      read: false,
      timestamp: serverTimestamp(),
      userEmail: userEmail ? userEmail.toLowerCase() : null,
    });

    console.log("Notification saved for", userEmail || "everyone");
  } catch (err) {
    console.error("Error saving notification:", err);
  }
};

export const onForegroundMessage = async (callback) => {
  try {
    const messaging = await getMessagingIfSupported();
    if (!messaging) return;

    onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      callback(payload);
    });
  } catch (error) {
    console.error("Foreground messaging error:", error);
  }
};
