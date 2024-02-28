const router = require("express").Router()

const authRouter = require("./auth")
const ingredientRouter = require("./ingredients")
const snackRouter = require("./snack")

router.use("/", authRouter)
router.use("/", ingredientRouter)
router.use("/", snackRouter)

module.exports = router