import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {throwIfUnauthenticatedOrRoomUnexistend} from
  "./throwIfUnauthenticatedOrRoomUnexistend";


export const addUserToExistingRoom = functions
    .region("europe-west1")
    .https.onCall(async (data, context) => {
      await throwIfUnauthenticatedOrRoomUnexistend(data, context);

      // Should never happen, already
      // checked in throwIfUnauthenticatedAndRommUnexistend
      if (!context.auth) {
        return;
      }

      const newUsersRef = admin.database()
          .ref("rooms/" + data.room + "/users/" + context.auth.uid);

      await newUsersRef.update(
          {
            isSpectator: false,
          }
      );
    });
