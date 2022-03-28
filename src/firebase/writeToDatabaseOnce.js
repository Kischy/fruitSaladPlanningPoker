import firebaseApp from './config'
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";



export default async function writeToDatabaseOnce(writeFunc) {
    const auth = getAuth(firebaseApp);
    await signInAnonymously(auth);

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            await writeFunc(user.uid)
        } else {
            // Logged out
        }
    });
}
