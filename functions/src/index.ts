import * as admin from "firebase-admin";

admin.initializeApp();

export {createNewRoom} from "./impl/createNewRoom";
export {addUserToExistingRoom} from "./impl/addUserToExistingRoom";

