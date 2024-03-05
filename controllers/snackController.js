const { Ingredient: IngredientModel } = require("../models/Ingredient")
const { User: UserModel } = require("../models/Auth")
const { Snack: SnackModel } = require("../models/snack")

const snackController = {
  
  createSnack: async(req, res) => {
    const {
      type, name, ingredients, sum
    } = req.body

    const currentUserId = req.user.id

    // create user
    const snack = new SnackModel({
      type, name, ingredients, sum, userid: currentUserId
    })

    try {
      await snack.save()

      return res.status(201).json({ msg: "Ingrediente registrado criado com sucesso!" })
    } catch (error) {
      console.error(error)
      throw new Error('Error to get ingredient!');
    }
  },

  getSnacks: async (req, res) => {
    try {
      const { id } = req.user
      const ingredients = await SnackModel.find({ userid: id });

      return res.json(ingredients)

    } catch(e) {
      console.error(e);
      throw new Error('Error to get ingredient!');
    }
  },
}

module.exports = snackController