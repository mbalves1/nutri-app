const router = require("express").Router()

const ingredientController = require("../controllers/ingredientController")
const checkToken = require("../middleware/checkToken.js")

router
  .route("/ingredients/register")
  .post(checkToken, (req, res) => ingredientController.create(req, res))

router
  .route("/ingredients")
  .get(checkToken, (req, res) => ingredientController.getIngredients(req, res))

router
  .route("/ingredients/:id")
  .delete(checkToken, (req, res) => ingredientController.deleteIngredients(req, res))



  module.exports = router