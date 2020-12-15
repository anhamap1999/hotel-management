import fetchApi from './index';
import utils from '../modules/utils';
import sweetAlert from 'sweetalert';

const getCustomers = (query) => {
  const queryString = utils.formatQuery(query);
  return fetchApi
    .get('/customer' + queryString)
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((error) => false);
};
const createCustomer = (customer) => {
  return fetchApi.post('/customer/create', {
    data: [customer],
  });
};

const createOrUpdateCustomer = (id, data) => {
  const url = id ? '/customer/update/' + id : '/customer/create';
  if (id) {
    return fetchApi
      .patch(url, JSON.stringify(data))
      .then((response) => {
        if (response.data) {
          sweetAlert(`Cập nhật thành công`, '', 'success');
          return response.data;
        }
      })
      .catch((error) => {
        const message = utils.getMessage(error.error);
        sweetAlert(`Cập nhật thất bại`, message, 'error');
        return false;
      });
  } else {
    return fetchApi
      .post(
        url,
        JSON.stringify(data)
      )
      .then((response) => {
        if (response.data) {
          sweetAlert(`Tạo thành công`, '', 'success');
          return response.data;
        }
      })
      .catch((error) => {
        const message = utils.getMessage(error.error);
        sweetAlert(`Tạo thất bại`, message, 'error');
        return false;
      });
  }
};

const deleteCustomer = (id) => {
  return fetchApi
    .delete('/customer/delete/' + id)
    .then((response) => {
      if (response.data) {
        sweetAlert(`Xóa thành công`, '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert(`Xóa thất bại`, message, 'error');
      return false;
    });
};

export const customerApis = {
  getCustomers,
  createCustomer,
  deleteCustomer,
  createOrUpdateCustomer,
};
