import Joi from 'joi';

const userName = Joi.string()
  .alphanum()
  .min(3)
  .max(10)
  .required()
  .label('User Name');
const phoneNumber = Joi.string()
  .regex(/^07/)
  .label('Phone Number')
  .options({
    language: {
      string: {
        regex: {
          base: 'Must start with 07'
        }
      }
    }
  });
const password = Joi.string()
  .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,20}$/)
  .label('Password')
  .options({
    language: {
      string: {
        regex: {
          base:
            'Lowercase, uppercase, number and special character, between 8 and 20 characters'
        }
      }
    }
  });

export const signUp = Joi.object().keys({
  userName,
  phoneNumber,
  password
});

export const signIn = Joi.object().keys({
  phoneNumber,
  password
});
