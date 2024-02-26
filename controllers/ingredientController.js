const { Ingredient: IngredientModel } = require("../models/Ingredient")
const { User: UserModel } = require("../models/Auth")

const ingredientController = {
  
  create: async(req, res) => {
    const {
      name, carbvalue, quantityvalue, unity, type
    } = req.body

    // create user
    const ingredient = new IngredientModel({
      name, carbvalue, quantityvalue, unity, type, userid: req.user.id
    })

    try {
      await ingredient.save()

      return res.status(201).json({ msg: "Ingrediente registrado criado com sucesso!" })
    } catch (error) {
      console.error(error)
      throw new Error('Error to get ingredient!');
    }
  },

  getIngredients: async (req, res) => {
    try {
      const { id } = req.user
      console.log(id)
      const ingredients = await IngredientModel.find({ userid: id });

      return res.json(ingredients)

    } catch(e) {
      console.error(e);
      throw new Error('Error to get ingredient!');
    }
  },

  deleteIngredients: async (req, res) => {
    try {
      const id = req.params.id;
      const ingredients = await IngredientModel.findById(id);

      if (!ingredients) {
        throw new Error('Ingredient not founded');
      }
      
      const deleteService = await IngredientModel.findByIdAndDelete(id)

      res.status(200).json({deleteService, msg: "Ingrediente excluido com sucesso!"})

    } catch(e) {
      console.error(e);
      throw new Error('Error to delete ingredient!');
    }
  }
}

module.exports = ingredientController