import fetchApi from './index';
import sweetAlert from 'sweetalert';
import utils from '../modules/utils';

const login = data => {
    return fetchApi.post('/auth/login', JSON.stringify(data)).then(response => {
        if (response.data) {
            return response.data;
        } else {
            const message = utils.getMessageError(response.errors);
            sweetAlert('Đăng nhập thất bại', message, 'error');
            return false;
        }
    }).catch(error => {
        sweetAlert('Đăng nhập thất bại', 'Username hoặc password sai', 'error');
        return false;
    });
}

export const authApis = {
    login
}