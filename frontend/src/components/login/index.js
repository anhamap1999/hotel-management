import React, { useState } from 'react';
import './styles.css';
import { authApis } from '../../apis/auth.api';
import { userApis } from '../../apis/user.api';
import { useHistory } from 'react-router-dom';
import sweetAlert from 'sweetalert';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [register, setRegister] = useState(false);
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    const data = {
      username,
      password,
    };
    if (username.length < 5) {
      setError('Tên đăng nhập phải dài hơn 4 ký tự');
      return;
    } else if (!password.length) {
      setError('Mật khẩu không được để trống');
      return;
    }
    if (register) {
      if (password !== confirmPassword) {
        setError('Mật khẩu không trùng khớp');
      } else if (!fullName.length) {
        setError('Họ tên không được để trống');
      } else {
        setError(null);
        data.confirm_password = confirmPassword;
        data.full_name = fullName;
        userApis.register(data).then((res) => res && setRegister(false));
      }
    } else {
      setError(null);
      authApis.login(data).then((res) => {
        if (res) {
          localStorage.setItem('app-user', JSON.stringify(res.user));
          localStorage.setItem('token', res.access_token);
          history.push('/');
        }
      });
    }
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
          {register ? (
            <input
              type='password'
              id='confirm_password'
              className='fadeIn third'
              name='login'
              placeholder='Nhập lại mật khẩu'
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          ) : null}
          {register ? (
            <input
              type='text'
              id='full_name'
              className='fadeIn third'
              name='login'
              placeholder='Họ tên'
              onChange={(event) => setFullName(event.target.value)}
            />
          ) : null}
          <input
            type='submit'
            className='fadeIn fourth'
            value={!register ? 'Đăng nhập' : 'Đăng ký'}
          />
        </form>

        <div id='formFooter'>
          {error && (
            <div
              className='err'
              style={{
                textAlign: 'center',
                color: 'red',
                fontWeight: 500,
                display: 'block',
              }}
            >
              {error}
            </div>
          )}
          <a
            className='underlineHover frnt-link'
            onClick={() => setRegister(!register)}
          >
            {register ? 'Đăng nhập' : 'Đăng ký'}
          </a>
        </div>
      </div>
    </div>
  );
}
