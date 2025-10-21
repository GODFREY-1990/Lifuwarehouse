import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "./firebase.js";

export async function logAction(action, details = {}) {
  const user = auth.currentUser;
  if (!user) return;

  await addDoc(collection(db, "logs"), {
    action,
    userId: user.uid,
    email: user.email,
    timestamp: Timestamp.now(),
    details
  });
}