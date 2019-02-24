import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import {
  APP_PORT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  IN_PROD,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  SESS_LIFETIME,
  SESS_NAME,
  SESS_SECRET
} from './config';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

// Self invoking async function
// (async() => {})()
(async () => {
  try {
    await mongoose.connect(
      `mongodb://${DB_USERNAME}:${encodeURIComponent(
        DB_PASSWORD
      )}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
      {
        useNewUrlParser: true // fixes deprication warning
      }
    );

    const app = express();

    app.disable('x-powered-by');

    const RedisStore = connectRedis(session);

    const store = new RedisStore({
      host: REDIS_HOST,
      port: REDIS_PORT,
      pass: REDIS_PASSWORD
    });

    app.use(
      session({
        store,
        name: SESS_NAME,
        secret: SESS_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: SESS_LIFETIME,
          sameSite: true,
          secure: IN_PROD,
          expires: false
        }
      })
    );

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      cors: false,
      playground: IN_PROD
        ? false
        : {
            settings: {
              'request.credentials': 'include'
            }
          },
      context: ({ req, res }) => ({ req, res })
    });

    server.applyMiddleware({ app }); // app is from an existing express app

    app.listen({ port: APP_PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`
      )
    );
  } catch (e) {
    console.error(e);
  }
})();
