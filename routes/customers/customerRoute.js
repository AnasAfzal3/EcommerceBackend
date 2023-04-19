const express = require('express')
const {getCustomers,createCustomer,updateCustomer,DeleteCustomer} = require('../../controllers/customers/customerController')
const router = express.Router()
router.get("/customer",getCustomers)
router.post("/customer",createCustomer)
router.put("/customer/:id",updateCustomer)
router.delete("/customer/:id",DeleteCustomer)

module.exports = router;