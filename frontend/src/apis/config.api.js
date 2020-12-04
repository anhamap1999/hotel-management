import fetchApi from './index';

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

export const configApis = {
  getConfigs,
};
