import fetchApi from './index';

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
export const customerTypeApis = {
  getCustomerTypes,
};
