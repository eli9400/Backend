const { generateAuthToken, verifyToken } = require("../../auth/providers/jwt");
const { handleError } = require("../../utils/errorHandler");
const normalizeUser = require("../helpers/normlaizeUser");
const { comparePassword } = require("../models/bcrypt");
const validateLogin = require("../models/joi/loginValidation");
const validateUser = require("../models/joi/validateUser");
const User = require("../models/mongoose/User");

const register = async (req, res) => {
  try {
    const user = req.body;

    const { error } = validateUser(user);
    if (error)
      return handleError(res, 400, `joi Error: ${error.details[0].message}`);
    const normalizeUserFrom = normalizeUser(user);
    const newUser = new User(normalizeUserFrom);
    const userFormDB = await newUser.save();
    res.status(201).send(userFormDB);
  } catch (error) {
    handleError(res, 500, `mongo error: ${error.message}`);
  }
};

const login = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;
    const { error } = validateLogin(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const userInDb = await User.findOne({ email });
    if (!userInDb)
      throw new Error("Authentication Error: Invalid email or password");

    const isPasswordValid = comparePassword(user.password, userInDb.password);
    if (!isPasswordValid)
      throw new Error("Authentication Error: Invalid email or password");

    const { _id, isBusiness, isAdmin } = userInDb;
    const token = generateAuthToken({ _id, isBusiness, isAdmin });

    res.send(token);
  } catch (error) {
    const isAuthError =
      error.message === "Authentication Error: Invalid email or password";

    return handleError(
      res,
      isAuthError ? 403 : 500,
      `Mongoose Error: ${error.message}`
    );
  }
};

const getUsers = async (req, res) => {
  try {
    const token = req.user;

    if (!token.isAdmin)
      throw new Error(
        "To get information about the all users the  user must be admin"
      );
    const users = await User.find();
    res.status(201).send(users);
  } catch (error) {
    handleError(res, 500, `mongo error: ${error.message}`);
  }
};
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const token = req.user;

    if (id !== token._id)
      throw new Error(
        "To get information about this user the following user must be logged in"
      );
    const user = await User.findById(id);
    if (!user) throw new Error("user id not found");
    res.status(201).send(user);
  } catch (error) {
    handleError(res, 500, `mongo error: ${error.message}`);
  }
};
const editUser = async (req, res) => {
  try {
    const token = req.user;
    const { id } = req.params;
    if (token._id !== id)
      throw new Error("Only the user is self can make changes to this profile");
    const UserFromClient = req.body;
    const updateUser = await User.findByIdAndUpdate(id, UserFromClient, {
      new: true,
    });
    if (!updateUser) throw new Error("user id not found");
    /*  console.log(updateUser); */

    res.status(201).send(updateUser);
  } catch (error) {
    handleError(res, 403, error.message);
  }
};

const changeStatusBiz = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!user.isAdmin)
      throw new Error("Only an authorized user may perform this action");
    const userFromDB = await User.findById(id);
    if (!userFromDB) throw new Error("User not found");

    userFromDB.isBusiness = !userFromDB.isBusiness;

    await userFromDB.save();

    res.status(201).send(userFromDB);
  } catch (error) {
    handleError(res, 403, error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id.trim();

    if (!user.isAdmin && user._id !== id) {
      console.log(user._id !== id);
      throw Error("Only an admin user or register user may delete a user");
    } else {
      console.log("Condition NOT triggered");
    }
    const userDelete = await User.findByIdAndDelete(id);
    if (!userDelete) throw Error("user id not found");
    res.status(201).send(userDelete);
  } catch (error) {
    handleError(res, 403, error.message);
  }
};
exports.register = register;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.editUser = editUser;
exports.deleteUser = deleteUser;
exports.login = login;
exports.changeStatusBiz = changeStatusBiz;
