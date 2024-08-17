const express = require('express')
const router = express.Router()
const reservedController = require('../controllers/reserved-controller')
const authenticate = require('../middlewares/authenticate')

router.get("/show", authenticate, reservedController.showBooking)
router.get("/:id", authenticate, reservedController.getResevedId)
router.get("/admin/show", authenticate, reservedController.adminShowBooking)
router.get("/doctor/show", authenticate, reservedController.doctorShowBooking)
router.post("/creacte", reservedController.creacteBooking)
router.patch("/update/:bookingId", reservedController.statusReserve)
router.patch("/patch/:bookingId", authenticate, reservedController.editRerved)

module.exports = router