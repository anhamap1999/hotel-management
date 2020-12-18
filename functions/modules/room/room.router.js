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

// router.use(isAuth);

router.get('/', isAuth, getRooms);
router.get('/:id', isAuth, getRoomById);
router.post('/create', isAuth, createRooms);
router.patch('/update/:id', isAuth, updateRoom);
router.patch('/update-status/:id', isAuth, updateStatusRoom);
router.delete('/delete/:id', isAuth, deleteRoom);

router.use(handleError);
module.exports = router;
