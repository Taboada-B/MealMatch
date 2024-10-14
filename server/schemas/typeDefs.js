const typeDefs = `
  type Profile {
    _id: ID
    profilename: String
    email: String
    password: String
    favRecipes: [RecipeFav]! 
    recentRecipes: [RecipeRecent]! 
  }

 type RecipeFav {
  _id: ID
  recipeTitle: String
  recipeImageUrl: String
  recipeUrl: String
}

type RecipeRecent {
  _id: ID
  recipeTitle: String
  recipeImageUrl: String
  recipeUrl: String
}

  type Auth {
    token: ID!
    profile: Profile
  }

type Query {
    profiles: [Profile]
    profile(profilename: String!): Profile
    recipes(profilename: String): [RecipeFav]  
    recipe(recipeId: ID!): RecipeFav  
    me: Profile 
  }

 type Mutation {
    addProfile (profilename: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRecipe (recipeText: String!): RecipeFav  
    removeRecipe (recipeId: ID!): RecipeFav  
    
  }
`;

module.exports = typeDefs;


