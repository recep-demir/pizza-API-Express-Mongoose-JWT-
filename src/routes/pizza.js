"use strict"

const router = require('express').Router()
const pizza=require("../controllers/pizza")
const upload = require('../middlewares/upload');



router.route("/").get(pizza.list).post(pizza.create)

router.route("/:id")
.get(pizza.read)
.put(pizza.update)
.patch(pizza.update)
.delete(pizza.delete)
module.exports = router