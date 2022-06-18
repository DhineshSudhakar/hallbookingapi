import express from "express"
import { listAllRooms, createRoom } from "./helper.js"

const router = express.Router()

router.get("/listall", async (req, res) => {
    try {
        const result = await listAllRooms()
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

export const roomRoutes = router


