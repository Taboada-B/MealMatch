const { Profile, Recipe } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find().populate('recipes');
    },
    profile: async (parent, { username }) => {
      return Profile.findOne({ username }).populate('recipes');
    },
    recipes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Recipe.find(params).sort({ createdAt: -1 });
    },
    recipe: async (parent, { recipeId }) => {
      return Recipe.findOne({ _id: recipeId });
    },
    me: async (parent, args, context) => {
      if (context.profile) {
        return Profile.findOne({ _id: context.profile._id }).populate('favRecipe recentRecipe');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addProfile: async (parent, { username, email, password }) => {
      const profile = await Profile.create({ username, email, password });
      const token = signToken(profile); 
      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);

      return { token, profile };
    },
    addRecipe: async (parent, { recipeText }, context) => {
      if (context.profile) {
        const recipe = await Recipe.create({
          recipeText,
          recipeAuthor: context.profile.username,
        });

        await Profile.findOneAndUpdate(
          { _id: context.profile._id },
          { $addToSet: { recipes: recipe._id } }
        );

        return recipe;
      }
      throw AuthenticationError;
    },

    removeRecipe: async (parent, { recipeId }, context) => {
      if (context.profile) {
        const recipe = await Recipe.findOneAndDelete({
          _id: recipeId,
          recipeAuthor: context.profile.username,
        });

        await Profile.findOneAndUpdate(
          { _id: context.profile._id },
          { $pull: { recipes: recipe._id } }
        );

        return recipe;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
