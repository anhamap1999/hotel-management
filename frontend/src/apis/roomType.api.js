import fetchApi from './index';

const getRoomTypes = () => {
    return fetchApi.get('/roomtype').then(response => {
        if (response.data) {
            return response.data;
        }
    }).catch(error => false);
}

export const roomTypeApis = {
    getRoomTypes
}