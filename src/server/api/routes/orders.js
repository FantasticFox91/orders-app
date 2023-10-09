const express = require('express')
const router = express.Router()

const { getOrders, updateOrder, deleteOrder, addOrder } = require('../controllers/orders.js')

router.route('/').get(getOrders).patch(updateOrder).post(addOrder)
router.route('/:id').delete(deleteOrder)

module.exports = router
