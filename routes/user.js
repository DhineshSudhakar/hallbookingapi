import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import uniqid from "uniqid";

import { findBookedUsers, findUser, userSignup } from "./helper.js"

const router = express.Router()

router.get("/booked", async (req, res) => {
    try {
        const result = await findBookedUsers().toArray()
        res.send({bookedUsers: result})
    } catch (error) {
        res.status(401).send({msg: error.message})
    }
})

router.post("/signup", async (req, res) => {
    const {username, email, password} = req.body
    const noOfRounds = 10
    const user_id = uniqid()
    try {
        const isUserExists = await findUser(email)
        if(!isUserExists){
            const hashedPass = await bcrypt.hash(password, noOfRounds)
            const token = jwt.sign({email, id: user_id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
            const result = await userSignup({username, hashedPass, email: req.body.email, token, user_id})
            res.send({msg: "signed up successfully", result})
        }else{
            res.status(401).send({msg: "User already exists. Please sign in for the token"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(401).send({msg: error.message})
    }
})

router.post("/login", async (req, res) => {
    const {email, password} = req.body
    
    try {
        const isUserExists = await findUser(email)
        const hashedPass = isUserExists.hashedPass
        if(isUserExists){
            const isPasswordMatch = bcrypt.compareSync(password, hashedPass)
            if(isPasswordMatch){
                const token = jwt.sign({email, id: isUserExists.user_id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
                res.send({msg: "Login successfully", token})
            }else{
                res.status(401).send({msg: "Invalid credentials"})
            }
        }else{
            res.status(401).send({msg: "Invalid credentials"})
        }

    } catch (error) {
        console.log(error)
        res.status(401).send({msg: error.message})
    }
})

export const userRoutes = router

