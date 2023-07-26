import userService from '../services/user.service.js'

const create = async (req, res) => {
  try {
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
  } catch (error) {
      res.status(500).send({ message: error.message })
  }
}

const findAll = async (req, res) => {
  const users = await userService.findAllService()

  if (users.length === 0){
    return res.status(400).send({ message: 'There are no registered users' })
  }

  res.send(users)
}

const findById = async (req, res) => {

  const user = req.user

  res.send(user)
}

const update = async (req, res) => {
  const { name, username, email, password, avatar, background } = req.body

  if (!name && !username && !email &&  !password && !avatar && !background){
    res.status(400).send({ message: "Submit all fields for registration" })
  }

  const {id, user} = req

  await userService.updateService(
    id,
    name,
    username,
    email,
    password,
    avatar,
    background
  )

  res.send({ message: 'User successfully update!' })

}

export default { create, findAll, findById, update }
