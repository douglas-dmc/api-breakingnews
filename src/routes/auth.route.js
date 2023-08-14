import { Router } from "express"

const authRouter = Router()

import authController from "../controllers/auth.controller.js"

authRouter.post("/login", authController.loginController)

export default authRouter
