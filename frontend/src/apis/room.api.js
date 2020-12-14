import fetchApi from './index';
import utils from '../modules/utils';
import sweetAlert from 'sweetalert';

const getRooms = (query) => {
  const queryString = utils.formatQuery(query);
  return fetchApi
    .get('/room' + queryString)
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((error) => false);
};

const createRoom = (room) => {
  return fetchApi.post('/room/create', {
    data: [room],
  });
};

const createOrUpdateRoom = (id, data) => {
  const url = id ? '/room/update/' + id : '/room/create';
  if (id) {
    return fetchApi
    .patch(url, JSON.stringify(data))
    .then((response) => {
      if (response.data) {
        sweetAlert(`Cập nhật phòng thành công`, '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert(`Cập nhật phòng thất bại`, message, 'error');
      return false;
    });
  } else {
    return fetchApi
    .post(url, JSON.stringify({
      data: [data],
    }))
    .then((response) => {
      if (response.data) {
        sweetAlert(`Tạo phòng thành công`, '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert(`Tạo phòng thất bại`, message, 'error');
      return false;
    });
  }
  
};

const deleteRoom = (id) => {
  return fetchApi
    .delete('/room/delete/' + id)
    .then((response) => {
      if (response.data) {
        sweetAlert(`Xóa phòng thành công`, '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert(`Xóa phòng thất bại`, message, 'error');
      return false;
    });
};

export const roomApis = {
  getRooms,
  createRoom,
  deleteRoom,
  createOrUpdateRoom
};
