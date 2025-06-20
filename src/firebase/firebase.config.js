import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3ulbIO9DF-xbqlV24yUMw-iwFsAW7uOU",
  authDomain: "cou-finder.firebaseapp.com",
  projectId: "cou-finder",
  storageBucket: "cou-finder.firebasestorage.app",
  messagingSenderId: "686573550578",
  appId: "1:686573550578:web:11a2571704a80312b8c96b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

export default app;
