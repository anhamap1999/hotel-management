import fetchApi from './index';
import utils from '../modules/utils';
import sweetAlert from 'sweetalert';

const getBookings = (query) => {
  const queryString = utils.formatQuery(query);
  return fetchApi
    .get('/booking' + queryString)
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((error) => false);
};

const createOrUpdateBooking = (id, data) => {
  const url = id ? '/booking/update/' + id : '/booking/create';
  if (id) {
    return fetchApi
      .patch(url, JSON.stringify(data))
      .then((response) => {
        if (response.data) {
          sweetAlert(`Cập nhật phiếu thuê phòng thành công`, '', 'success');
          return response.data;
        }
      })
      .catch((error) => {
        const message = utils.getMessage(error.error);
        sweetAlert(`Cập nhật phiếu thuê phòng thất bại`, message, 'error');
        return false;
      });
  } else {
    return fetchApi
      .post(
        url,
        JSON.stringify({
          data: [data],
        })
      )
      .then((response) => {
        if (response.data) {
          sweetAlert(`Tạo phiếu thuê phòng thành công`, '', 'success');
          return response.data;
        }
      })
      .catch((error) => {
        const message = utils.getMessage(error.error);
        sweetAlert(`Tạo phiếu thuê phòng thất bại`, message, 'error');
        return false;
      });
  }
};

const deleteBooking = (id) => {
  return fetchApi
    .delete('/booking/delete/' + id)
    .then((response) => {
      if (response.data) {
        sweetAlert(`Xóa phiếu thuê phòng thành công`, '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert(`Xóa phòng thất bại`, message, 'error');
      return false;
    });
};

export const bookingApis = {
  getBookings,
  createOrUpdateBooking,
  deleteBooking,
};