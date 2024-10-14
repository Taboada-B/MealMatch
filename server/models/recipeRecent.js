

const { Schema, model } = require('mongoose');

const recipeRecentSchema = new Schema({
  recipeTitle: {
    type: String,
    required: true,
  },
  recipeImageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  recipeUrl: {
    type: String,
    required: true,
  },
 

});

const RecipeRecent = model('RecipeRecent', recipeRecentSchema);

module.exports = RecipeRecent;