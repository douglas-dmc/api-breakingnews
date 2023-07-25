import mongoose from 'mongoose'
import userService from '../services/user.service.js'

const validId = (req, res, next) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({ message: 'Invalid Id' })
    }

    next()
}

const validUser = async (req, res, next) => {
    const id = req.params.id

    const user = await userService.findByIdService(id)

    if (!user){
        return res.status(400).send({ message: 'User not found' })
    }

    req.id = id
    req.user = user

    next()
}

export default { validId, validUser }
