import fetchApi from './index';

const getRoomTypes = () => {
  return fetchApi
    .get('/room-type')
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((error) => false);
};

export const roomTypeApis = {
  getRoomTypes,
};
