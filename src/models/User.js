import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', async function(next){
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hashSync(this.password, salt)
    next()
})

const User = mongoose.model('User', UserSchema)

export default User