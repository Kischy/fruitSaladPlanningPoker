import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import randomString from "./utility/random_string";

admin.initializeApp();

export const createNewRoom = functions
    .region("europe-west1")
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "only authenticated users can create rooms");
      }
      let roomExists = true;
      let newRoom = "";
      let newRoomRef = admin.database().ref("rooms");

      while (roomExists) {
        newRoom = randomString(20);
        newRoomRef = admin.database().ref("rooms/" + newRoom);
        const roomSnapshot = await newRoomRef.once("value");
        roomExists = roomSnapshot.exists();
      }

      await newRoomRef.update({
        createBy: context.auth.uid,
        cardValues: ["🍇", "🍏", "🍒", "🍍", "🍉", "🍅", "🥑"],
      });

      const newRoomsNewUserRef = admin.database()
          .ref("rooms/" + newRoom + "/users/" + context.auth.uid);

      await newRoomsNewUserRef.update(
          {
            isSpectator: false,
          }
      );

      return newRoom;
    });


export const addUserToExistingRoom = functions
    .region("europe-west1")
    .https.onCall(async (data, context) => {
      if (!context.auth) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "only authenticated users can create rooms");
      }

      if (Object.prototype.hasOwnProperty.call(data, "room") === false ||
      data.room === null ||
      data.room === "") {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "room code can't be empty");
      }

      const roomRef = admin.database()
          .ref("rooms/" + data.room);

      const roomSnapshot = await roomRef.once("value");

      if (roomSnapshot.exists() == false) {
        throw new functions.https.HttpsError(
            "not-found",
            "room not found");
      }

      const newUsersRef = admin.database()
          .ref("rooms/" + data.room + "/users/" + context.auth.uid);

      await newUsersRef.update(
          {
            isSpectator: false,
          }
      );
    });
