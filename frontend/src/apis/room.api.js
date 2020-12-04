import fetchApi from './index';
import utils from '../modules/utils';

const getRooms = (query) => {
  const queryString = utils.formatQuery(query);
  return fetchApi
    .get('/room' + queryString)
    .then((response) => {
      if (response.data) {
        return response.data;
      }
    })
    .catch((error) => false);
};

const createRoom = (room) => {
  return fetchApi.post('/room/create', {
    data: [room],
  });
};

export const roomApis = {
  getRooms,
  createRoom,
};
