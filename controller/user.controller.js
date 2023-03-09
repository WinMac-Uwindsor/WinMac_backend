const validation = require("../middleware/validator");
const UserServices = require("../models/user.model");


exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await UserServices.findOne({ username: req.body.username });
    console.log(existingUser);

    if (!existingUser) {
      res.send({ error: 'User doesn\'t exist!' });
    }
    else{
      if(existingUser.password===req.body.password){
        res.send({ message: 'login successful' });
      }
      else{
        res.send({ error: 'Password doesn\'t match!' });
      }
    }
  } catch (error) {
    console.error(error);
    res.send({ error: 'An error occurred while processing your request' });
  }
};

