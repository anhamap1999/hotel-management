import React from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
  const onLogout = () => {
    localStorage.removeItem('app-user', {});
    localStorage.removeItem('token', '');
  };

  const user = JSON.parse(localStorage.getItem('app-user'));

  return (
    <div>
      <nav className='sb-topnav navbar navbar-expand navbar-light bg-clr' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <a className='navbar-brand logo-brand' href='/'>
          Quản lý Khách Sạn
        </a>

        <div>
          <Link to='/profile' className='frnt-link' style={{ fontWeight: 'bold', marginRight: '5px' }}>{user.full_name ? user.full_name : user.username}</Link>
        <Link to='/login' className='frnt-link' onClick={onLogout}>
          <i className='fas fa-user ' />
          Đăng xuất
        </Link>
        </div>
      </nav>
    </div>
  );
}
