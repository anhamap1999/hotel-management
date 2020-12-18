const User = require('../../models/user');
const { Success } = require('../../utils/Success');
const { Error } = require('../../utils/Error');
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
  try {
    const existedUser = await User.findOne({
      username: req.body.username
    });
    if (existedUser) {
      throw new Error({
        statusCode: 400,
        message: 'user.usernameExisted',
        error: 'username has been registered',
      });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const compare_result = await bcrypt.compare(
      req.body.confirm_password,
      hash
    );
    if (!compare_result) {
      throw new Error({
        statusCode: 400,
        message: 'user.passwordsNotMatch',
        error: 'password and confirm_password do not matched',
      });
    }
    const user = new User({ username: req.body.username, password: hash, full_name: req.body.full_name });
    const savedUser = await user.save();

    const success = new Success({ data: savedUser });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.user._id,
      status: 'active',
    });
    if (!user) {
      throw new Error({
        statusCode: 400,
        message: 'user.notFound',
        error: 'user not found',
      });
    }
    const result = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!result) {
      throw new Error({
        message: 'user.passwordIncorrect',
        statusCode: 400,
        error: 'password is incorrect',
      });
    }
    const hash = await bcrypt.hash(req.body.new_password, 10);
    const compare_result = await bcrypt.compare(
      req.body.confirm_new_password,
      hash
    );
    if (!compare_result) {
      throw new Error({
        message: 'user.passwordsNotMatch',
        statusCode: 400,
        error: 'password and confirm_password do not matched',
      });
    }
    user.password = hash;
    req.user.password = hash;
    await User.findByIdAndUpdate(req.user._id, user);

    const success = new Success({ data: user });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.user._id,
      status: 'active',
    });
    if (!user) {
      throw new Error({
        statusCode: 400,
        message: 'user.notFound',
        error: 'user not found',
      });
    }

    await User.findByIdAndUpdate(req.user._id, req.body);
    const updatedUser = await User.findOne({
        _id: req.user._id,
        status: 'active',
      });

    const success = new Success({ data: updatedUser });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};

exports.getUser = async (req, res, next) => {
    try {
      const user = await User.findOne({
        _id: req.user._id,
        status: 'active',
      });
      if (!user) {
        throw new Error({
          statusCode: 400,
          message: 'user.notFound',
          error: 'user not found',
        });
      }

      const success = new Success({ data: user });
      res.status(200).send(success);
    } catch (error) {
      return next(error);
    }
  };
  
exports.getStaff = async (req, res, next) => {
  try {
    const users = await User.find({
      isAdmin: false,
    });

    const success = new Success({ data: users });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};

exports.deleteStaff = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      status: 'active',
    });
    if (!user) {
      throw new Error({
        statusCode: 400,
        message: 'user.notFound',
        error: 'user not found',
      });
    }

    await User.findByIdAndRemove(req.params.id);

    const success = new Success({ data: user });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};


exports.updateStatusStaff = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      // status: 'active',
    });
    if (!user) {
      throw new Error({
        statusCode: 400,
        message: 'user.notFound',
        error: 'user not found',
      });
    }

    await User.findByIdAndUpdate(req.params.id, { status: req.body.status });
    user.status = req.body.status;
    const success = new Success({ data: user });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};