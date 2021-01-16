const express = require('express');
// const { isEmpty } = require('lodash');
// const jwt = require('jsonwebtoken');

const router = express.Router();

// const User = require('../../models/user');

// const InvalidCredentialsError = 'Invalid credentials.';

// const SECRET = 'omg some secret';

router.post('/login', async function(req, res, next) {
  return next();

  // const { email, password } = req.body;

  // try {
  //   if(isEmpty(email) || isEmpty(password)) throw new Error(InvalidCredentialsError);

  //   let user = await User.findOne({ email });

  //   if(isEmpty(user)) throw new Error(`No account was found for email ${email}.`);

  //   if(password !== user.password) throw new Error(InvalidCredentialsError);

  //   const token = await jwt.sign({ email }, SECRET);

  //   res.status(200).json({
  //     success: 'The user was logged in successfully.',
  //     token
  //   });
  // } catch (err) {
  //   res.status(422).json({
  //     error: err.message
  //   });
  // }
});

module.exports = router;
