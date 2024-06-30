const express = require('express')
const router = express.Router()
const authorController = require('../controller/author')

router.get('/', authorController.get)
router.post('/add', authorController.post)
router.post('/edit', authorController.editStatus)


module.exports = router