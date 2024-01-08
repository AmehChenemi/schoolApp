const express = require('express')
const router = express.Router()

const scoreRouter= require('../controller/scoreController')
const {authenticate,role} = require('../middleware/authenthecation')

router.post('/add-score',scoreRouter.addScore)
router.get('/fetch-score/:studentId',authenticate,scoreRouter.getStudentScore)
router.put('/update-score/:studentId',authenticate,scoreRouter.updateScore)
router.delete('/delete-score/:studentId',authenticate,scoreRouter.delete)

module.exports = router