const express = require('express');
const { isAdmin, isAuth } = require('../../middlewares/auth.middleware');
const { handleError } = require('../../middlewares/error.middleware');

const router = express.Router();
const {
  getRooms,
  getRoomById,
  createRooms,
  updateRoom,
  updateStatusRoom,
  deleteRoom,
} = require('./room.controller');

router.use(isAuth);

router.get('/', getRooms);
router.get('/:id', getRoomById);
router.post('/create', createRooms);
router.put('/update/:id', updateRoom);
router.put('/update-status/:id', updateStatusRoom);
router.delete('/delete/:id', deleteRoom);

router.use(handleError);
module.exports = router;
