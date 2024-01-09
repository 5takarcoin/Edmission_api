const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: String,
})

UserSchema.pre('save', async function(next) {
    this.password = this.password = await bcrypt.hash(this.password, 10);
    console.log(this.password)
    next()
})

UserSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username })
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            console.log("tumi shofol")
            return user
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

module.exports = mongoose.model("User", UserSchema)