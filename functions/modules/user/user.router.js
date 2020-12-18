const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware');
const { handleError } = require('../../middlewares/error.middleware');
const {
  register,
  updateUser,
  changePassword,
  getUser,
  deleteStaff,
  getStaff,
  updateStatusStaff,
} = require('./user.controller');

router.post('/register', register);
router.patch('/update', isAuth, updateUser);
router.patch('/change-password', isAuth, changePassword);
router.get('/', isAuth, getUser);
router.get('/get-staff', isAuth, isAdmin, getStaff);
router.delete('/delete-staff/:id', isAuth, isAdmin, deleteStaff);
router.patch('/update-status/:id', isAuth, isAdmin, updateStatusStaff);

router.use(handleError);

module.exports = router;
