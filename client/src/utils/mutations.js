import { gql } from '@apollo/client';

export const LOGIN_PROFILE = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation addProfile($username: String!, $email: String!, $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const ADD_RECIPEFAV = gql`
  mutation addRecipeFavorite(
    $recipeTitle: String!
    $recipeImageUrl: String!
    $recipeUrl: String!
  ) {
    addRecipeFavorite(
      recipeTitle: $recipeTitle
      recipeImageUrl: $recipeImageUrl
      recipeUrl: $recipeUrl
    ) {
      _id
      recipeTitle
      recipeImageUrl
      recipeUrl
    }
  }
`;