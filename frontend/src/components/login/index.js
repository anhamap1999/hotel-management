import React, { useState } from 'react';
import './styles.css';
import { authApis } from '../../apis/auth.api';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    console.log('SUBMIT')
    event.preventDefault();
    const data = {
      username,
      password
    }
    authApis.login(data);
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
            placeholder='username'
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type='password'
            id='password'
            className='fadeIn third'
            name='login'
            placeholder='password'
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type='submit'
            className='fadeIn fourth'
            value='Log In'
            
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
