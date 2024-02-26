const router = require("express").Router()

const authRouter = require("./auth")
const ingredientRouter = require("./ingredients")

router.use("/", authRouter)
router.use("/", ingredientRouter)

module.exports = router