import userService from '../services/user.service.js'
import mongoose from 'mongoose'

const create = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body

  if (!name || !username || !email ||  !password || !avatar || !background){
    res.status(400).send({ message: "Submit all fields for registration" })
  }
  
  const user = await userService.createService(req.body)

  if (!user){
    return res.status(400).send({ message: 'Error creating User'})
  }

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name,
        username,
        email,
        avatar,
        background
      }
    })
}

const findAll = async (req, res) => {
  const users = await userService.findAllService()

  if (users.length === 0){
    return res.status(400).send({ message: 'There are no registered users' })
  }

  res.send(users)
}

const findById = async (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).send({ message: 'Invalid Id' })
  }

  const user = await userService.findByIdService(id)

  if (!user){
    return res.status(400).send({ message: 'User not found' })
  }

  res.send(user)
}

const update = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body

  if (!name && !username && !email &&  !password && !avatar && !background){
    res.status(400).send({ message: "Submit all fields for registration" })
  }

  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).send({ message: 'Invalid Id' })
  }

  const user = await userService.findByIdService(id)

  if (!user){
    return res.status(400).send({ message: 'User not found' })
  }

  await userService.updateService(
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
  )

  res.send({ message: 'User successfully update!'})

}

export default { create, findAll, findById, update }
