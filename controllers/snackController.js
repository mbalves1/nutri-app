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

      return res.status(201).json({ msg: "Refeição registrada criado com sucesso!" })
    } catch (error) {
      console.error(error)
      throw new Error('Error para criar refeição!');
    }
  },

  getSnacks: async (req, res) => {
    try {
      const { id } = req.user
      const ingredients = await SnackModel.find({ userid: id });

      return res.json(ingredients)

    } catch(e) {
      console.error(e);
      throw new Error('Error to get snacks!');
    }
  },

  deleteSnacks: async (req, res) => {
    try {
      const id = req.params.id;
      const snack = await SnackModel.findById(id);

      if (!snack) {
        throw new Error('Snack not founded');
      }
      
      const deleteService = await SnackModel.findByIdAndDelete(id)

      res.status(200).json({deleteService, msg: "Snack excluido com sucesso!"})

    } catch(e) {
      console.error(e);
      throw new Error('Error to delete snack!');
    }
  }
}

module.exports = snackController