exports.loginByEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
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

    user.access_tokens.push({ token: accessToken });
    await user.save();

    const data = {
      access_token: accessToken,
      user: {
        _id: user._id,
        email: user.email,
        phone_number: user.phone_number,
        user_name: user.user_name,
        full_name: user.full_name,
      },
    };
    const success = new Success({ data });
    res.status(200).send(success);
  } catch (error) {
    () => next(error);
  }
};
