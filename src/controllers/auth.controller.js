import bcrypt from 'bcrypt-nodejs'

const login = async (req, res) => {
    const { email, password } = req.body
    res.send('Login OK!')
}

export { login }