import fetchApi from './index';
import utils from '../modules/utils';
import sweetAlert from 'sweetalert';

const getConfigs = () => {
  return fetchApi
    .get('/config')
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((error) => false);
};

const updateConfig = (id, data) => {
  return fetchApi
    .patch('/config/update/' + id, JSON.stringify(data))
    .then((response) => {
      if (response.data) {
        sweetAlert(`Cập nhật quy định thành công`, '', 'success');
        return response.data;
      }
    })
    .catch((error) => {
      const message = utils.getMessage(error.error);
      sweetAlert(`Cập nhật quy định thất bại`, message, 'error');
      return false;
    });
};

export const configApis = {
  getConfigs,
  updateConfig
};
