"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// The Firebase web config is PUBLIC (it ships in the client bundle either way),
// so these literals are safe defaults. Env vars (build args) override them when set.
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ??
    "AIzaSyBDqxhgtG8K7TQGLgU7ueeMmRXai2jOb54",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ??
    "media-noche-c8ae0.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "media-noche-c8ae0",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    "media-noche-c8ae0.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "619441303032",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??
    "1:619441303032:web:d1b8d2f5588546f8e0fa0d",
};

// Reuse the app across HMR reloads / multiple imports.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
