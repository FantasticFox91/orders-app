const express = require('express')
const router = express.Router()

const { getUsers, auth } = require('../controllers/users.js')

router.route('/').get(getUsers).post(auth)

module.exports = router
