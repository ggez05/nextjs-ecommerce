import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCg2Z4seRsPwI3Oon1U0yg9GtC4wfrWKJs",
  authDomain: "nextjs-ecom-a6267.firebaseapp.com",
  projectId: "nextjs-ecom-a6267",
  storageBucket: "nextjs-ecom-a6267.appspot.com",
  messagingSenderId: "479668911762",
  appId: "1:479668911762:web:19835c92bff3a09fcab04b",
  measurementId: "G-P1SNC0Z3RZ",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app, "gs://nextjs-ecom-a6267.appspot.com");
