import fetchApi from './index';
import utils from '../modules/utils';
import sweetAlert from 'sweetalert';

const getReport = (query) => {
  const queryString = utils.formatQuery(query);
  return fetchApi
    .get('/report' + queryString)
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((error) => false);
};
export const reportApis = {
  getReport,
};
