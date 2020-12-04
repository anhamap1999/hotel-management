const express = require('express');
const { isAdmin, isAuth } = require('../../middlewares/auth.middleware');
const { handleError } = require('../../middlewares/error.middleware');

const router = express.Router();
const {
  createConfig,
  deleteConfig,
  getAllConfigs,
  updateConfig,
} = require('./config.controller');

// router.use(isAuth);

router.get('/', getAllConfigs);
router.delete('/delete/:id', deleteConfig);
router.patch('/update/:id', updateConfig);
router.post('/create', createConfig);

router.use(handleError);

module.exports = router;
