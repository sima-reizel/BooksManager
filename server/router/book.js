const express = require('express')
const router = express.Router()
const bookController = require('../controller/book')

router.get('/', bookController.get)
router.post('/add', bookController.post)

module.exports = router