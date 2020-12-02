import fetchApi from './index';

const getCustomer = async () => {
  return fetchApi
    .get('/customer')
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((error) => false);
};
export const customerApis = {
  getCustomer,
};
