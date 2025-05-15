"use strict"

const router = require('express').Router()
const pizza=require("../controllers/pizza")
const upload = require('../middlewares/upload');



router.route("/")
.get(pizza.list)
.post(upload.single('image'), pizza.create)

router.route("/:id")
.get(pizza.read)
.put(upload.single('image'),pizza.update)
.patch(upload.single('image'),pizza.update)
.delete(pizza.delete)
module.exports = router