import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from './config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 
const storage = getStorage(app); 

export { auth, db, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword };


export const updateUserProfile = async (userId, profileData) => {
  const userRef = doc(db, "users", userId);
  try {
      await setDoc(userRef, profileData, { merge: true });
      console.log("User profile updated successfully.");
  } catch (error) {
      console.error("Failed to update user profile: ", error);
      throw new Error("Failed to update user profile.");
  }
};