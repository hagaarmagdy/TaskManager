const { User } = require("../models/user");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const schemas = require("../validators/schemas");

const getUser = async (req, res) => {
  const { error } = schemas.userSchema.validate();
  if (error) return res.status(400).send(error.details[0].message);
  res.send(req.user);
};

const signup = async (req, res) => {
  const { error } = schemas.userSchema.validate();
  if (error) return res.status(400).send(error.details[0].message);
  const user = new User(req.body);
  await user.save();
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(user);
};

const login = async (req, res) => {
  const { error } = schemas.userSchema.validate();
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatePassword)
    return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(user);
};

const updateUser = async (req, res) => {
  const { error } = schemas.userSchema.validate();
  if (error) return res.status(400).send(error.details[0].message);
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
  req.user = decoded;
  if (req.user._id === req.params.id) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(user);
  } else return res.status(400).send("User not found.");
};

const deleteUser = async (req, res) => {
  const { error } = schemas.userSchema.validate();
  if (error) return res.status(400).send(error.details[0].message);
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
  req.user = decoded;
  if (req.user._id === req.params.id) {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } else return res.status(400).send("No access.");
};

module.exports = {
  getUser,
  signup,
  login,
  updateUser,
  deleteUser,
};
