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
export const billApis = {
  getBills,
};
