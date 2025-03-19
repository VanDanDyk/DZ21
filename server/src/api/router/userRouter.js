const { Router } = require('express')
const UserController = require('../controllers/userController')

const router = Router()

router.get('/api/getUsers', UserController.getUsers)
router.get('/api/getUser/:id', UserController.getUser)
router.patch('/api/updateUser/:id', UserController.updateUser)
router.post('/api/addUser', UserController.addUser)
router.delete("/api/delUser/:id", UserController.delUser)

module.exports = router
