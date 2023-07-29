import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

export const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;

    // Validação do Bearer
    if (!authorization) {
        return res.sendStatus(401);
    }

    const parts = authorization.split(" ");
    const [schema, token] = parts;

    if (schema !== "Bearer") {
        return res.sendStatus(401);
    }

    if (parts.length !== 2) {
        return res.sendStatus(401);
    }

    // Validação do token
    const secret = process.env.SECRET_JWT
    
    jwt.verify(token, secret, (error, decode) => {
        console.log(error)
        console.log(decode)
    })

    next()
}
