import Joi from 'joi';

export default Joi.object().keys({
  userName: Joi.string()
    .alphanum()
    .min(3)
    .max(10)
    .required()
    .label('User Name'),
  userEmail: Joi.string()
    .email()
    .required()
    .label('Email'),
  phoneNumber: Joi.string()
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
    }),
  password: Joi.string()
    .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,20}$/)
    .label('Password')
    .options({
      language: {
        string: {
          regex: {
            base: 'Lowercase, uppercase, number and special character'
          }
        }
      }
    })
});
