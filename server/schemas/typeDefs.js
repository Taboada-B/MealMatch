const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Recipe {
    _id: ID!
    recipeText: String!
    recipeAuthor: String!
    createdAt: String
  }

  type Profile {
    _id: ID!
    username: String!
    email: String!
    recipes: [Recipe]
    favRecipe: [Recipe]
    recentRecipe: [Recipe]
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]
    profile(username: String!): Profile
    recipes(username: String): [Recipe]
    recipe(recipeId: ID!): Recipe
    recipeFavorites(username: String): [Recipe]
    recipeRecents(username: String): [Recipe]
    me: Profile
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRecipeFavorite(recipeText: String!): Recipe
    addRecipeRecent(recipeText: String!): Recipe
    removeRecipeFavorite(recipeId: ID!): Recipe
    removeRecipeRecent(recipeId: ID!): Recipe
  }
`;

module.exports = typeDefs;
