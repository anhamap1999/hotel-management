import fetchApi from './index';
import sweetAlert from 'sweetalert';
import utils from '../modules/utils';

const getCustomerTypes = async () => {
  return fetchApi
    .get('/customertype')
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((error) => false);
};
const createOrUpdateCustomerType = (id, data) => {
  const url = id ? '/customertype/update/' + id : '/customertype/create';
  if (id) {
    return fetchApi
      .patch(url, JSON.stringify(data))
      .then((response) => {
        if (response.data) {
          sweetAlert(`Cập nhật loại khách thành công`, '', 'success');
          return response.data;
        }
      })
      .catch((error) => {
        const message = utils.getMessage(error.error);
        sweetAlert(`Cập nhật loại khách thất bại`, message, 'error');
        return false;
      });
  } else {
    return fetchApi
      .post(url, JSON.stringify(data))
      .then((response) => {
        if (response.data) {
          sweetAlert(`Tạo loại khách thành công`, '', 'success');
          return response.data;
        }
      })
      .catch((error) => {
        const message = utils.getMessage(error.error);
        sweetAlert(`Tạo loại khách thất bại`, message, 'error');
        return false;
      });
  }
};

const deleteCustomerType = (id) => {
  return fetchApi
    .delete('/customer/delete/' + id)
    .then((response) => {
      if (response.data) {
        sweetAlert(`Xóa loại khách thành công`, '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert(`Xóa loại khách thất bại`, message, 'error');
      return false;
    });
};

export const customerTypeApis = {
  getCustomerTypes,
  createOrUpdateCustomerType,
  deleteCustomerType,
};
