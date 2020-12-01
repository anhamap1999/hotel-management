import fetchApi from './index';

const getRooms = async () => {
    return await fetchApi.get('/room');
}

export const roomApis = {
    getRooms
}