import express from "express"
import dotenv from "dotenv"
import { roomRoutes } from "./routes/rooms.js"

import {MongoClient} from "mongodb"
import { userRoutes } from "./routes/user.js"

dotenv.config()

const app = express()

app.use(express.json())  //third party inbuilt middleware to parse the request body

const PORT = process.env.PORT

const MONGO_URL = process.env.MONGO_URL

async function createConnection(url){
    const client = new MongoClient(url)
    await client.connect()
    console.log("Connected to mongo db")
    return client
}

export const client = await createConnection(MONGO_URL)

app.get("/", (req, res) => {
    res.send("Welcome to hall booking api")
})

app.use("/rooms", roomRoutes)

app.use("/user", userRoutes)

app.listen(PORT, () => {
    console.log("server running on: ", PORT);
})