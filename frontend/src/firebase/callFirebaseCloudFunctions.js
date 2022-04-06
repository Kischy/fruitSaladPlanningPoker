import { getFunctions, httpsCallable } from "firebase/functions";
import firebaseApp from "./config";
import { getAuth, signInAnonymously } from "firebase/auth";

const auth = getAuth(firebaseApp);
const functions = getFunctions(firebaseApp, "europe-west1");

export async function createNewRoom() {
  await signInAnonymously(auth);
  const result = await httpsCallable(functions, "createNewRoom")();
  return result.data;
}

export async function addUserToExistingRoom(roomCode) {
  await signInAnonymously(auth);
  await httpsCallable(functions, "addUserToExistingRoom")({ room: roomCode });
}
