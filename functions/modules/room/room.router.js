const express = require('express');
const { isAdmin, isAuth } = require('../../middlewares/auth.middleware');
const { handleError } = require('../../middlewares/error.middleware');

const router = express.Router();
const {
  getRooms,
  getRoomById,
  createRooms
} = require('./room.controller');

// router.use(isAuth);

router.get('/', getRooms);
router.get('/:id', getRoomById);
router.post('/create', createRooms);

router.use(handleError);
// router.patch('/update/:id', updateType);
module.exports = router;
