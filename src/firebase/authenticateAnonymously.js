import fireBaseApp from './config'
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";


export default async function authenticateAnonymousUser() {
    const auth = getAuth(fireBaseApp);
    try {
        await signInAnonymously(auth);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log("signed in");
                console.log(user.uid);
                // ...
            } else {
                // User is signed out
                // ...
            }
        });

    }
    catch (error) {
        console.log(error);
    }
}
