import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import randomString from "../utility/random_string";


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

      let cards: string[] = [];

      if (Object.prototype.hasOwnProperty.call(data, "cards") === false ||
      data.cards === null ||
      data.cards === "") {
        cards = ["🍇", "🍏", "🍒", "🍍", "🍉", "🍅", "🥑"];
      } else {
        cards = data.cards.split(",").map((el: string) => {
          return el.trim();
        });
      }

      await newRoomRef.update({
        createBy: context.auth.uid,
        gameState: 0,
        cardValues: cards,
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
