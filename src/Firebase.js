import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyATD9X0Kxd8qAY-fcOs3elDOmJ8l1SCdlQ",
  authDomain: "netflix-clone-02802.firebaseapp.com",
  projectId: "netflix-clone-02802",
  storageBucket: "netflix-clone-02802.appspot.com",
  messagingSenderId: "439415550216",
  appId: "1:439415550216:web:a7aad93a9f8cc7951bbcbd",
  measurementId: "G-KD8WCMFLPQ",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success('Account Created');
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success('Login Successful');
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    toast.success('Logged Out Successfully');
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in:", user);
  } else {
    console.log("User signed out");
  }
});

export { auth, db, login, signup, logout, onAuthStateChanged };
