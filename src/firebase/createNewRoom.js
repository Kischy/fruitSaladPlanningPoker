import firebaseApp from './config'
import { getDatabase, update, ref } from "firebase/database";
import writeToDatabaseOnce from './writeToDatabaseOnce'
import RandomString from '../utility/random_string';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { roomCodeKey } from '../utility/asyncstorageKeys';


export default async function createNewRoom() {
    const roomId =  RandomString(15);
    let roomCode;
    await writeToDatabaseOnce(
        async (userId) => {
            const db = getDatabase(firebaseApp);
            await update(ref(db, 'users/' + userId), {
                room: {
                    id: roomId,
                },
            });
            roomCode = 'users/' + userId + "/" + roomId;
            await AsyncStorage.setItem(roomCodeKey,roomCode);
        }
    );    

}