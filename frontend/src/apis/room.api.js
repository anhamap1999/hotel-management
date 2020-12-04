import fetchApi from './index';

const getRooms = () => {
    return fetchApi.get('/room').then(response => {
        if (response.data) {
            return response.data;
        }
    }).catch(error => false);
}

export const roomApis = {
    getRooms
}