import { collection, addDoc, Timestamp, doc } from "firebase/firestore";
import { db } from "./firebase.js";
import { logAction } from "./logAction.js";

export async function createInvoice(issuedTo, items) {
  const invoiceRef = collection(db, "invoices");

  const enrichedItems = items.map(item => ({
    ...item,
    totalCost: item.unitCost * item.quantity * (1 + item.gstRate),
    itemRef: doc(db, "items", item.itemId)
  }));

  const totalInvoiceValue = enrichedItems.reduce((sum, i) => sum + i.totalCost, 0);

  await addDoc(invoiceRef, {
    issuedTo,
    date: Timestamp.now(),
    items: enrichedItems,
    totalInvoiceValue
  });

  await logAction("created invoice", { issuedTo, totalInvoiceValue });
}