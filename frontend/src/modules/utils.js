import vi from '../assets/languages/vi.json';
import _ from 'lodash';
const keyDefined = {

}

function getMessage(key, param = []) {
  let string = _.get('vi', key);
  if (string && param.length > 0) {
    for (let i = 0; i < param.length; i++) {
      try {
        const regexString = `\\{${i}\\}`;
        const regex = new RegExp(regexString, 'g');
        string = string.replace(regex, param[i]);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return string;
}

function getMessageError(errors) {
  if (!errors || _.isEmpty(errors)) {
    return 'server error';
  }

  for (let key in errors) {
    const messageError = getMessage(errors[key]) || 'lỗi không xác định';

    return (keyDefined[key] ? keyDefined[key] + ': ' : '') + messageError;
  }
}

export default {
  getMessageError,
};
