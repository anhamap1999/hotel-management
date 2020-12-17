import fetchApi from './index';
import utils from '../modules/utils';
import sweetAlert from 'sweetalert';

const getBills = (query) => {
  const queryString = utils.formatQuery(query);
  return fetchApi
    .get('/bill' + queryString)
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((error) => false);
};

const calculateFee = (id) => {
  return fetchApi
    .get('/bill/calculate-fee/' + id)
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      // sweetAlert(`Xóa phòng thất bại`, message, 'error');
      return false;
    });
};

const createBill = (data) => {
  return fetchApi
    .post('/bill/create', JSON.stringify(data))
    .then((response) => {
      if (response.data) {
        sweetAlert(`Thanh toán thành công`, '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert(`Thanh toán thất bại`, message, 'error');
      return false;
    });
};
export const billApis = {
  getBills,
  calculateFee,
  createBill
};
