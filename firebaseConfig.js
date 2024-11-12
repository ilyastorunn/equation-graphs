import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASJ-438BifsRSqW-YoLiknz_mYGDMVecI",
  authDomain: "equationgraphingapp.firebaseapp.com",
  projectId: "equationgraphingapp",
  storageBucket: "equationgraphingapp.firebasestorage.app",
  messagingSenderId: "1030248410285",
  appId: "1:1030248410285:web:746f58bb52913bea65ea24",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
