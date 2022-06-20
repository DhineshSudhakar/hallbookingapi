
import { client } from "../index.js";

export function createRoom(data) {
    return client.db("Hall_Booking_api").collection("rooms").insertOne({ ...data, room_id: uniqid() });
}

export function bookRoom(id, data) {
    return client.db("Hall_Booking_api").collection("rooms").updateOne(
        {room_id: id}, 
        {$set:{
            booking_status: true,
            booking_details: data 
        } 
    });
}


export function listAllRooms() {
    return client.db("Hall_Booking_api").collection("rooms").find({}).toArray();
}

export function bookedRooms() {
    return client.db("Hall_Booking_api").collection("rooms").find({booking_status: true}).toArray();
}

// user helper functions
export function userSignup(data) {
    return client.db("Hall_Booking_api").collection("user").insertOne(data);
}

export function findUser(email) {
    return client.db("Hall_Booking_api").collection("user").findOne({ email: email });
}

export function findBookedUsers() {
    return client.db("Hall_Booking_api").collection("user").find({ "booking_details.0" : { $exists: true}});
}


export function updateUser(id, data) {
    return client.db("Hall_Booking_api").collection("user").updateOne(
        { user_id: id },
        {$push : {
                booking_details : {
                    $each: [data],
                    $position: 0
                }
            }
        }
     )
}

export function genBookDate(currentTime){
    const timeStamp = currentTime
    const timeStampString = timeStamp.toDateString()
    return timeStampString
}

export function genStartTime(currentTime) {
    const timeStamp = currentTime
    const timeStampHours = timeStamp.getHours()
    const start_time = timeStampHours.toString() + ":" + timeStamp.getMinutes().toString()
    return start_time
}

export function genEndTime(currentTime) {
    const timeStamp = currentTime
    const timeStampHours = timeStamp.getHours()
    let endTimeHours = timeStampHours + 24
    if(endTimeHours > 24){
        endTimeHours = endTimeHours - 24
    }
    const end_time = endTimeHours.toString() + ":" + timeStamp.getMinutes().toString()
    // console.log(start_time, end_time)
    return end_time
}



