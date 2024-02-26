const mongoose = require("mongoose")

const { Schema } = mongoose

const { userSchema } = require("./Auth")

const ingredientSchema = new Schema({
  name: String,
  carbvalue: Number,
  quantityvalue: Number,
  unity: String,
  type: String,
  userid: String
},
{ timestamps: true }
)

const Ingredient = mongoose.model("Ingredient", ingredientSchema)

module.exports = {
  Ingredient,
  ingredientSchema,
}