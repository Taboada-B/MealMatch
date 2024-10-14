const { Profile, RecipeFav, RecipeRecent } = require('../models');
const { signToken,  AuthenticationError } = require('../utils/auth');




const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find().populate('recipes');
    },
    profile: async (parent, { username }) => {
      return Profile.findOne({ username }).populate('recipes');
    },
    recipeFavorites: async (parent, { username }) => {
      const params = username ? { username } : {};
      return RecipeFav.find(params).sort({ createdAt: -1 });
    },
    recipeRecents: async (parent, { username }) => {
      const params = username ? { username } : {};
      return RecipeRecent.find(params).sort({ createdAt: -1 });
    },
    me: async (parent, args, context) => {
      if (context.profile) {
        return Profile.findOne({ _id: context.profile._id }).populate('favRecipe recentRecipe');
      }
      throw new AuthenticationError('Not authenticated');
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
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(profile);

      return { token, profile };
    },
    addRecipeFavorite: async (parent, { recipeTitle, recipeImageUrl, recipeUrl }, context) => {
      if (context.profile) {
        const recipe = await RecipeFav.create({
          recipeTitle,
          recipeImageUrl,
          recipeUrl,
        });
    
        await Profile.findOneAndUpdate(
          { _id: context.profile._id },
          { $addToSet: { favRecipe: recipe._id } }
        );
    
        return recipe;
      }
      throw new AuthenticationError('Not authenticated');
    },
    
    addRecipeRecent: async (parent, { recipeTitle, recipeImageUrl, recipeUrl }, context) => {
      if (!context.profile) {
        throw new AuthenticationError('Not authenticated');
      }
    
      const recipe = await RecipeRecent.create({
        recipeTitle,
        recipeImageUrl,
        recipeUrl,
        recipeAuthor: context.profile.username,
      });
    
      await Profile.findOneAndUpdate(
        { _id: context.profile._id },
        { $addToSet: { recentRecipe: recipe._id } }
      );
    
      return recipe;
    },
    

    removeRecipeFavorite: async (parent, { recipeId }, context) => {
      if (context.profile) {
        const recipe = await RecipeFav.findOneAndDelete({
          _id: recipeId,
          recipeAuthor: context.profile.username,
        });

        await Profile.findOneAndUpdate(
          { _id: context.profile._id },
          { $pull: { favRecipe: recipe._id } }
        );

        return recipe;
      }
      throw new AuthenticationError('Not authenticated');
    },
    removeRecipeRecent: async (parent, { recipeId }, context) => {
      if (context.profile) {
        const recipe = await RecipeRecent.findOneAndDelete({
          _id: recipeId,
          recipeAuthor: context.profile.username,
        });

        await Profile.findOneAndUpdate(
          { _id: context.profile._id },
          { $pull: { recentRecipe: recipe._id } }
        );

        return recipe;
      }
      throw new AuthenticationError('Not authenticated');
    },
  },
};

module.exports = resolvers;
