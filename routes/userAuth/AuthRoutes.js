const express = require('express')
const {userAuth} = require('../../controllers/Auth/userAuthController')
const router = express.Router()
router.post('/admin/login',userAuth)
module.exports = router;