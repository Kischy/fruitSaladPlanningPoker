import firebaseApp from "./config";
import { getDatabase, onDisconnect  } from 'firebase/database'
import { getAuth  } from 'firebase/auth'

const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp); 


export async function makeSpectatorOnDisconnectFromRoom(userAreaRef) {
  onDisconnect(userAreaRef).update(
    {
      isSpectator: true,
    }
  )
}
