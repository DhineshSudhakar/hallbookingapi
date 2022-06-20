import express from "express"
import jwt from "jsonwebtoken"
import { listAllRooms, createRoom, genStartTime, genEndTime, bookRoom, genBookDate, bookedRooms, updateUser } from "./helper.js"

const router = express.Router()

router.get("/listall", async (req, res) => {
    try {
        const result = await listAllRooms()
        res.send({rooms: result})
    } catch (error) {
        res.status(401).send({msg: error.message})
    }
})

router.get("/booked", async (req, res) => {
    try {
        const result = await bookedRooms()
        res.send({rooms: result})
    } catch (error) {
        res.status(401).send({msg: error.message})
    }
})

router.post("/create", async (req, res) => {
    const data = req.body
    
    // db.collection.insertOne({})
    try {
        const result = await createRoom(data)
        res.send({msg: "Room created successfully", result})
    } catch (error) {
        res.status(401).send({msg: error.message})
    }
    
})

router.put("/book/:id", async (req, res) => {
    const {id} = req.params
    const token = req.header("auth-x")
    const {customerName} = req.body
    const isTokenVerified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const timeStamp = new Date()
    const startTime = genStartTime(timeStamp)
    const endTime = genEndTime(timeStamp)
    const bookingDate = genBookDate(timeStamp)
    try {
        if(isTokenVerified){
            const data = {customerName, user_id: isTokenVerified.id, bookingDate, startTime, endTime, room_id: id}
            const result = await bookRoom(id, data)
            const updateUserData = await updateUser(isTokenVerified.id, data)
            res.send({msg: "Room booket successfully", result, updateUserData})
        }else{
            res.status(401).send({msg: "Access prohibited"})
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({msg: error.message})
    }
    
})

export const roomRoutes = router


