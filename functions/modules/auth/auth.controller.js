const User = require('../../models/user');
const { Success } = require('../../utils/Success');
const { Error } = require('../../utils/Error');
const {
    generateToken,
    verifyToken,
  } = require('../../middlewares/jwt.middleware');
  const config = require('../../commons/config');
  const bcrypt = require('bcrypt');
  const nodemailer = require('nodemailer');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
      status: 'active',
    });
    if (!user) {
      throw new Error({
        statusCode: 404,
        message: 'user.notFound',
        error: 'user has been not registered',
      });
    }
    const compare_result = await bcrypt.compare(password, user.password);
    if (!compare_result) {
      throw new Error({
        statusCode: 400,
        message: 'auth.passwordIsIncorrect',
        error: 'password is incorrect',
      });
    }
    const accessToken = await generateToken(
      user,
      config.JWT_SECRET_KEY,
      config.JWT_TOKEN_LIFE
    );

    await user.save();

    const data = {
      access_token: accessToken,
      user: {
        _id: user._id,
        username: user.username,
        full_name: user.full_name,
      },
    };
    const success = new Success({ data });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      status: 'active',
    });
    if (!user) {
      throw new Error({
        statusCode: 404,
        message: 'user.notFound',
        error: 'user has been not registered',
      });
    }
    const resetPasswordToken = await generateToken(
      user,
      config.RESET_PASSWORD_SECRET_KEY,
      config.RESET_PASSWORD_TOKEN_LIFE
    );

    //res.json(`http://localhost:27017/user/reset-password/${resetPasswordToken}`);
    // let url = await tinyUrl.shorten(`${config.HOST}/api/reset-password/${resetPasswordToken}`);
    // if (!url) {
    const url = `${config.HOST}/auth/reset-password/${resetPasswordToken}`;
    // }
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'gmail.com',
      auth: {
        user: config.EMAIL_ADDRESS,
        pass: config.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      to: user.email,
      from: config.EMAIL_ADDRESS,
      subject: 'Reset password',
      html: `<div style="font-weight: bold">Click the link below to reset password:</div> 
          <div style="font-weight: bold; color: red">This link will be expired in 5 minutes.</div>
          <div>${url}</div>`,
    };
    await transporter.sendMail(mailOptions);
    const success = new Success({});
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = req.params.token;
    const decoded = await verifyToken(
      resetPasswordToken,
      config.RESET_PASSWORD_SECRET_KEY
    );
    if (!decoded) {
      throw new Error({
        message: 'auth.tokenIsExpired',
        statusCode: 400,
        error: 'token is expired',
      });
    }
    const user = await User.findOne({
      _id: decoded.data._id,
      status: 'active',
    });
    const hash = await bcrypt.hash(req.body.new_password, 10);
    const compare_result = await bcrypt.compare(
      req.body.confirm_new_password,
      hash
    );
    if (!compare_result) {
      throw new Error({
        message: 'auth.passwordsNotMatch',
        statusCode: 400,
        error: 'password and confirm_password do not matched',
      });
    }
    user.password = hash;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'gmail.com',
      auth: {
        user: config.EMAIL_ADDRESS,
        pass: config.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      to: user.email,
      from: config.EMAIL_ADDRESS,
      subject: 'Reset password',
      html: `<div>Reset password successfully.</div>`,
    };
    await transporter.sendMail(mailOptions);

    const success = new Success({});
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};
