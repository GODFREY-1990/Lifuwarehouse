import { doc, updateDoc, addDoc, collection, Timestamp, increment } from "firebase/firestore";
import { db } from "./firebase.js";
import { logAction } from "./logAction.js";

export async function addStockMovement(itemId, type, quantity, issuedTo, reference, remarks) {
  const itemRef = doc(db, "items", itemId);
  const movementRef = collection(db, "movements");

  await addDoc(movementRef, {
    itemRef,
    type,
    quantity,
    date: Timestamp.now(),
    issuedTo,
    reference,
    remarks
  });

  const stockChange = type === "IN" ? quantity : -quantity;
  await updateDoc(itemRef, {
    quantityInStock: increment(stockChange),
    lastUpdated: Timestamp.now()
  });

  await logAction("added stock movement", { itemId, type, quantity, issuedTo, reference });
}