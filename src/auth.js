import { AuthenticationError } from 'apollo-server-core';
import { SESS_NAME } from './config';
import { User } from './models';

const signedIn = req => req.session.userId;

const message = 'Invalid credentials, please try again.';

export const attemptSignin = async (phoneNumber, password) => {
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    throw new AuthenticationError(message);
  }

  if (!(await user.matchesPassword(password))) {
    throw AuthenticationError(message);
  }

  return user;
};

export const checkSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be singed in.');
  }
};

export const checkSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError('You are already signed in.');
  }
};

export const signOut = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err);

      res.clearCookie(SESS_NAME);

      resolve(true);
    });
  });
