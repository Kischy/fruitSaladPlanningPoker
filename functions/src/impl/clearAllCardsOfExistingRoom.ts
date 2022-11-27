import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {throwIfUnauthenticatedOrRoomUnexistend} from
  "./throwIfUnauthenticatedOrRoomUnexistend";

export const clearAllCardsOfExistingRoom = functions
    .region("europe-west1")
    .https.onCall(async (data, context) => {
      await throwIfUnauthenticatedOrRoomUnexistend(data, context);

      const usersRef = admin.database()
          .ref("rooms/" + data.room + "/users/");

      const usersSnapshot = await usersRef.once("value");

      if (usersSnapshot.exists() === false) {
        throw new functions.https.HttpsError(
            "not-found",
            "no users found in room");
      }

      for (const user of Object.keys(usersSnapshot.val())) {
        const userRef = admin.database()
            .ref("rooms/" + data.room + "/users/" + user);

        await userRef.update(
            {
              selectedCard: null,
            }
        );
      }
    });
