const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const userController = require('../controllers/user-controller')

router.get('/infomation',authenticate, userController.getByUser)
router.patch('/patch',authenticate, userController.editProfile)
router.get('/getall',authenticate,userController.getallUser)

module.exports = router