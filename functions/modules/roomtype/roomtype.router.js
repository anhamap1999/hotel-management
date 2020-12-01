const express = require('express');

const router = express.Router();
const {
  createType,
  getRoomType,
  deleteType,
  updateType,
} = require('./roomtype.controller');

router.get('/', getRoomType);
router.delete('/:id', deleteType);
router.post('/create', createType);
router.patch('/update/:id', updateType);
module.exports = router;
