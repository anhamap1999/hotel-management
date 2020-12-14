import fetchApi from './index';
import sweetAlert from 'sweetalert';
import utils from '../modules/utils';

const getRoomTypes = () => {
  return fetchApi
    .get('/room-type')
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((error) => false);
};

const createOrUpdateRoomType = (id, data) => {
  const url = id ? '/room-type/update/' + id : '/room-type/create';
  if (id) {
    return fetchApi
    .patch(url, JSON.stringify(data))
    .then((response) => {
      if (response.data) {
        sweetAlert(`Cập nhật loại phòng thành công`, '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert(`Cập nhật loại phòng thất bại`, message, 'error');
      return false;
    });
  } else {
    return fetchApi
    .post(url, JSON.stringify(data))
    .then((response) => {
      if (response.data) {
        sweetAlert(`Tạo loại phòng thành công`, '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert(`Tạo loại phòng thất bại`, message, 'error');
      return false;
    });
  }
  
};

const deleteRoomType = (id) => {
  return fetchApi
    .delete('/room-type/delete/' + id)
    .then((response) => {
      if (response.data) {
        sweetAlert(`Xóa loại phòng thành công`, '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert(`Xóa loại phòng thất bại`, message, 'error');
      return false;
    });
};

export const roomTypeApis = {
  getRoomTypes,
  createOrUpdateRoomType,
  deleteRoomType
};
