export const {
  APP_PORT,
  NODE_ENV,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,

  SESS_NAME = 'sid',
  SESS_SECRET = 'secret',
  SESS_LIFETIME = 2 * 60 * 60 * 1000,

  REDIS_HOST = 'localhost',
  REDIS_PORT = 6379,
  REDIS_PASSWORD = 'secret'
} = process.env;

export const IN_PROD = NODE_ENV === 'production';
