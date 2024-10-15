// utils/auth.js
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'FlockchenisOurHero';
const expiration = process.env.JWT_EXPIRATION || '2h';

const AuthenticationError = new GraphQLError('Could not authenticate user.', {
  extensions: { code: 'UNAUTHENTICATED' },
});

const authMiddleware = ({ req }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) return { profile: null };

  try {
    const { authenticatedPerson } = jwt.verify(token, secret, { maxAge: expiration });
    return { profile: authenticatedPerson };
  } catch (err) {
    console.log('Invalid token:', err.message);
    return { profile: null };
  }
};

const signToken = ({ email, username, _id }) => {
  const payload = { email, username, _id };
  return jwt.sign({ authenticatedPerson: payload }, secret, { expiresIn: expiration });
};

module.exports = {
  AuthenticationError,
  authMiddleware,
  signToken,
};
