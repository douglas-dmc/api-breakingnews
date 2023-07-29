import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import userService from "../services/user.service.js"

dotenv.config()

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers

        // Validação do Bearer
        if (!authorization) {
            return res.sendStatus(401)
        }

        const parts = authorization.split(" ")
        const [schema, token] = parts

        if (schema !== "Bearer") {
            return res.sendStatus(401)
        }

        if (parts.length !== 2) {
            return res.sendStatus(401)
        }

        // Validação do token
        const secret = process.env.SECRET_JWT

        jwt.verify(token, secret, async (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "Invalid token!" })
            }

            const user = await userService.findByIdService(decoded.id)
            
            if (!user || !user.id) {
                return res.status(401).send({ message: "Invalid token!" })
            }

            req.userId = user.id

            return next()
        })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}
