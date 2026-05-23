import { initializeApp } from "firebase/app";
import { getAI, GoogleAIBackend, getGenerativeModel } from "firebase/ai";
import { geminiJsonSchema } from "../types/inference";
import systemPrompt from "./systemPrompt";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const ai = getAI(app, { backend: new GoogleAIBackend() });
export const geminiModel = getGenerativeModel(ai, {
  model: import.meta.env.VITE_MODEL_NAME ?? "gemini-3.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: geminiJsonSchema,
  },
  systemInstruction: systemPrompt,
});
