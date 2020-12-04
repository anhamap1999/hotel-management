const express = require('express');

const router = express.Router();
const {
  createConfig,
  deleteConfig,
  getAllConfigs,
  updateConfig,
} = require('./config.controller');

router.get('/', getAllConfigs);
router.delete('/:id', deleteConfig);
router.patch('/update/:id', updateConfig);
router.post('/create', createConfig);

module.exports = router;
