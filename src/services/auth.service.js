import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import userRepositories from "../repositories/user.repositories.js"
import bcrypt from "bcryptjs"

dotenv.config()

const jwtKey = process.env.SECRET_JWT

const loginService = async ({ email, password }) => {
    const user = await userRepositories.findByEmailUserRepository(email)

    if (!user) throw new Error("Wrong password or username")

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) throw new Error("Invalid password")

    const token = generateToken(user.id)

    return token
}

function generateToken(id) {
    return jwt.sign({ id: id }, jwtKey, { expiresIn: 43200 })
}

export  default { loginService, generateToken }
