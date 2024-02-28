const router = require("express").Router()

const snackController = require("../controllers/snackController")
const checkToken = require("../middleware/checkToken.js")

router
  .route("/snack")
  .post(checkToken, (req, res) => snackController.createSnack(req, res))

router
  .route("/snack")
  .get(checkToken, (req, res) => snackController.getSnacks(req, res))


  module.exports = router