const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: { type: String, required: true},
	cost: { type: Number},
	discount: { type: Boolean }
})

const UserModel = mongoose.model('products', userSchema)

module.exports = UserModel
