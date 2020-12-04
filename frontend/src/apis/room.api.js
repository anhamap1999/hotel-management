import fetchApi from './index';

const getRooms = () => {
  return fetchApi
    .get('/room')
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
