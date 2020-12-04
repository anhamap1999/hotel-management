import fetchApi from './index';
import sweetAlert from 'sweetalert';
import utils from '../modules/utils';

const login = data => {
    return fetchApi.post('/auth/login', JSON.stringify(data)).then(response => {
        if (response.data) {
            sweetAlert('Đăng nhập thành công', '', 'success');
            return response.data;
        }        
    }).catch(error => {
        const message = utils.getMessage(error.error);
        sweetAlert('Đăng nhập thất bại', message, 'error');
        return false;
    });
}

export const authApis = {
    login
}