const { Schema, model } = require('mongoose');

const recipeFavSchema = new Schema({
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

const RecipeFav = model('RecipeFav', recipeFavSchema);

module.exports = RecipeFav;
