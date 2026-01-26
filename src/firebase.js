// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const db = getFirestore(app);
// Ruaj aplikimin në Firestore
export const saveApplicationToFirestore = async (data) => {
    try {
        await addDoc(collection(db, "applications"), {
            ...data,
            timestamp: serverTimestamp()
        });
        console.log("✅ Application saved in Firestore");
    } catch (err) {
        console.error("❌ Error saving application:", err);
    }
};
// Kërkon lejen për njoftime
export const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    console.log("Notification permission:", permission);
    return permission;
};

// Regjistron service worker
const registerServiceWorker = async () => {
    if (!("serviceWorker" in navigator)) return null;

    try {
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        console.log("✅ Service Worker registered:", registration);
        return registration;
    } catch (err) {
        console.error("❌ Service Worker registration failed:", err);
        return null;
    }
};

// Merr token-in e Firebase
export const getFirebaseToken = async () => {
    try {
        const permission = await requestNotificationPermission();
        if (permission !== "granted") return null;

        const registration = await registerServiceWorker();
        if (!registration) return null;

  const token = await getToken(messaging, {
  vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
  serviceWorkerRegistration: registration
});


        console.log("🔥 Firebase Token:", token);
        return token;
    } catch (error) {
        console.error("Error getting Firebase token:", error);
        return null;
    }
};

// Ruaj njoftim (global ose privat)
export const saveNotificationToFirestore = async (payload, userEmail = null) => {
    const { title, body } = payload.notification || {};
    if (!title || !body) return;

    try {
        await addDoc(collection(db, "notifications"), {
            title: {
                en: title.en || title || "New Notification",
                al: title.al || title || "Njoftim i Ri"
            },
            body: {
                en: body.en || body || "",
                al: body.al || body || ""
            },
            read: false,
            timestamp: serverTimestamp(),
            userEmail: userEmail ? userEmail.toLowerCase() : null
        });
        console.log("💾 Notification saved for", userEmail || "everyone");
    } catch (err) {
        console.error("Error saving notification:", err);
    }
};

// Menaxhon mesazhet në foreground
export const onForegroundMessage = (callback) => {
    onMessage(messaging, (payload) => {
        console.log("📩 Foreground message received:", payload);
        callback(payload);
    });
};

