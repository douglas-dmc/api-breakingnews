import User from "../models/User.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const jwtKey = process.env.SECRET_JWT

const loginService = (email) =>
    User.findOne({ email: email }).select("+password")

const generateToken = (id) => jwt.sign({ id: id }, jwtKey, { expiresIn: 43200 })

export { loginService, generateToken }
