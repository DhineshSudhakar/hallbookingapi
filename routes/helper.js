import uniqid from "uniqid";
import { client } from "../index.js";

export function createRoom(data) {
    return client.db("Hall_Booking_api").collection("rooms").insertOne({ ...data, room_id: uniqid() });
}
export function listAllRooms() {
    return client.db("Hall_Booking_api").collection("rooms").find({}).toArray();
}



// user helper functions
export function userSignup(data) {
    return client.db("Hall_Booking_api").collection("user").insertOne({ ...data, user_id: uniqid() });
}

export function findUser(email) {
    return client.db("Hall_Booking_api").collection("user").findOne({ email: email });
}

