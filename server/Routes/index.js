const router = require('express').Router()
const RoomCtrl = require('../controllers')

router.post('/', RoomCtrl.addNewProduct)
router.get('/', RoomCtrl.getNewProduct)
router.delete('/', RoomCtrl.clearDB)

module.exports = router