import fetchApi from './index';
import sweetAlert from 'sweetalert';
import utils from '../modules/utils';

const register = (data) => {
  return fetchApi
    .post('/user/register', JSON.stringify(data))
    .then((response) => {
      if (response.data) {
        sweetAlert('Đăng ký thành công', '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert('Đăng ký thất bại', message, 'error');
      return false;
    });
};

const getInfo = () => {
  return fetchApi
    .get('/user')
    .then((response) => {
      if (response.data) {
        // sweetAlert('Đăng ký thành công', '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert('Lấy thông tin tài khoản thất bại', message, 'error');
      return false;
    });
};

const updateInfo = (data) => {
  return fetchApi
    .patch('/user/update', JSON.stringify(data))
    .then((response) => {
      if (response.data) {
        sweetAlert('Cập nhật thông tin tài khoản thành công', '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert('Cập nhật thông tin tài khoản thất bại', message, 'error');
      return false;
    });
};

const updatePassword = (data) => {
  return fetchApi
    .patch('/user/change-password', JSON.stringify(data))
    .then((response) => {
      if (response.data) {
        sweetAlert('Cập nhật mật khẩu thành công', '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert('Cập nhật mật khẩu thất bại', message, 'error');
      return false;
    });
};

const getStaff = () => {
  return fetchApi
    .get('/user/get-staff')
    .then((response) => {
      if (response.data) {
        // sweetAlert('Đăng ký thành công', '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert('Lấy danh sách nhân viên thất bại', message, 'error');
      return false;
    });
};

const updateStatusStaff = (id, status) => {
  return fetchApi
    .patch('/user/update-status/' + id, JSON.stringify({ status }))
    .then((response) => {
      if (response.data) {
        sweetAlert('Cập nhật trạng thái nhân viên thành công', '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert('Cập nhật trạng thái nhân viên thất bại', message, 'error');
      return false;
    });
};

const deleteStaff = (id) => {
    return fetchApi
      .delete('/user/delete-staff/' + id)
      .then((response) => {
        if (response.data) {
          sweetAlert('Xóa nhân viên thành công', '', 'success');
          return response.data;
        }
      })
      .catch((error) => {
        const message = utils.getMessage(error.error);
        sweetAlert('Xóa nhân viên thất bại', message, 'error');
        return false;
      });
  };

export const userApis = {
  register,
  getInfo,
  updateInfo,
  updatePassword,
  getStaff,
  deleteStaff,
  updateStatusStaff
};
