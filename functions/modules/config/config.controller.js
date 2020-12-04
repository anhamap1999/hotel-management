const Config = require('../../models/config');
const { Success } = require('../../utils/Success');
const { Error } = require('../../utils/Error');

exports.createConfig = async (req, res, next) => {
  try {
    const config = new Config(req.body);
    await config.save();
    const success = new Success({ data: config });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};
exports.getAllConfigs = async (req, res, next) => {
  try {
    const { select, sort } = req.query;
    const configs = await Config.find({})
      .select(select ? select : '')
      .sort(sort ? sort : 'name');
    const success = new Success({ data: configs });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};
exports.updateConfig = async (req, res, next) => {
  try {
    let config = await Config.findById(req.params.id);
    if (!config) {
      throw new Error({
        statusCode: 400,
        message: 'config.notFound',
        error: 'config not found',
      }); 
    }
    
    const success = new Success({ data: config });
    res.status(200).send(success);
  } catch (error) {
    return next(error);
  }
};
exports.deleteConfig = async (req, res, next) => {};
