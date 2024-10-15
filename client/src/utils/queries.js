import { gql } from '@apollo/client';

export const QUERY_PROFILE = gql`
  query profile($username: String!) {
    profile(username: $username) {
      _id
      username
      email
      favRecipe {
        _id
        recipeTitle
        recipeImageUrl
        recipeUrl
      }
      recentRecipe {
        _id
        recipeTitle
        recipeImageUrl
        recipeUrl
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      favRecipe {
        _id
        recipeTitle
        recipeImageUrl
        recipeUrl
      }
      recentRecipe {
        _id
        recipeTitle
        recipeImageUrl
        recipeUrl
      }
    }
  }
`;
