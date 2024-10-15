// typeDefs.js
const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Recipe {
    _id: ID!
    recipeTitle: String!
    recipeImageUrl: String!
    recipeUrl: String!
    createdAt: String
  }

  type Profile {
    _id: ID!
    username: String!
    email: String!
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
    recipeFavorites(username: String): [Recipe]
    recipeRecents(username: String): [Recipe]
    me: Profile
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRecipeFavorite(recipeTitle: String!, recipeImageUrl: String!, recipeUrl: String!): Recipe
    addRecipeRecent(recipeTitle: String!, recipeImageUrl: String!, recipeUrl: String!): Recipe
    removeRecipeFavorite(recipeId: ID!): Recipe
    removeRecipeRecent(recipeId: ID!): Recipe
  }
`;

module.exports = typeDefs;
