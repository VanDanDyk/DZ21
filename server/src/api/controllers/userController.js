const UserModel = require('../models/user.model')

class UserController {
	static async getUsers(req, res) {
		try {
			const users = await UserModel.find()
			res.send(users)
		} catch (err) {
			console.log('Произошла ошибка при получении пользователей', err)
			res.send({ message: 'Произошла ошибка при получении пользователей', err })
		}
	}

	static async getUser(req, res) {
		const { id } = req.params
		try {
			const user = await UserModel.findById(id)
			res.send(user)
		} catch (err) {
			console.log('Произошла ошибка при получении пользователя по id', err)
			res.send({ message: 'Произошла ошибка при получении пользователя по id', err })
		}
	}

	static async updateUser(req, res) {
		const { id } = req.params
		const objKey = JSON.stringify(req.body).slice(2,6)
		const objVal = Object.values(req.body)[0]
		let updatedUser
		console.log(objKey)
		try {
			switch(objKey){
				case 'cost':
				updatedUser = await UserModel.findByIdAndUpdate(id, { $set: { 'cost' : objVal} })
				break;
				case 'name':
				updatedUser = await UserModel.findByIdAndUpdate(id, { $set: { 'name' : objVal} })
				break;
			}
			
			res.status(200).send(200, ('Пользоватеь успешно обновлён, новый пользователь: ', updatedUser))
		} catch (err) {
			console.log('Произошла ошибка при изменении пользователя по id', err)
			res.send({ message: 'Произошла ошибка при изменении пользователя по id', err })
		}
	}

	static async addUser(req, res) {
		const { name, cost, discount } = req.body
		try {
			const newUser = new UserModel({
				name,
				cost,
				discount
			})

			const savedUser = await newUser.save()
			res.status(201).send(savedUser)
		} catch (err) {
			console.log('Ошибка при создании пользователя', err)
			res
				.status(500)
				.send({ message: `Ошибка при создании пользователя: ${err.message}` })
		}
	}
	static async delUser(req, res) {
		const { id } = req.params

		try {
			const updatedUser = await UserModel.findByIdAndDelete(id)
			res.send('Пользоватеь успешно удалён')
		} catch (err) {
			console.log('Произошла ошибка при удалении пользователя по id', err)
			res.send({ message: 'Произошла ошибка при удалении пользователя по id', err })
		}
	}
}

module.exports = UserController
