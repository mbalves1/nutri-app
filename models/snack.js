const mongoose = require("mongoose")

const { Schema } = mongoose

const { ingredientSchema } = require("./Ingredient")

const snackSchema = new Schema({
  type: String,
  name: String,
  ingredients: [ingredientSchema],
  sum: Number,
  userid: String
},
{ timestamps: true }
)

const Snack = mongoose.model("Snack", snackSchema)

module.exports = {
  Snack,
  snackSchema,
}