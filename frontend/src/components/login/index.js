import React, { useState } from 'react';
import './styles.css';
import { authApis } from '../../apis/auth.api';
import { useHistory } from 'react-router-dom';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    const data = {
      username,
      password
    }
    authApis.login(data).then(res => {
      if (res) {
        localStorage.setItem('app-user', JSON.stringify(res.user));
        localStorage.setItem('token', JSON.stringify(res.access_token));
        history.push('/');
      }
    });
  };
  return (
    <div className='wrapper fadeInDown'>
      <div id='formContent'>
        <div className='fadeIn first'>
          <i className='far fa-user'></i>
        </div>

        <form onSubmit={onSubmit}>
          <input
            type='text'
            id='username'
            className='fadeIn second'
            name='username'
            placeholder='Tên đăng nhập'
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type='password'
            id='password'
            className='fadeIn third'
            name='login'
            placeholder='Mật khẩu'
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type='submit'
            className='fadeIn fourth'
            value='Đăng nhập'
            
          />
        </form>

        <div id='formFooter'>
          <a className='underlineHover' href='#'>
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
