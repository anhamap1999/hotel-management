import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(){
 
        return <div>
        <nav className="sb-topnav navbar navbar-expand navbar-light bg-clr">
            <a className="navbar-brand logo-brand" href="/">Quản lý Khách Sạn</a>
            <Link to='/login' className="frnt-link"><i className="fas fa-user " />Logout</Link>  
        </nav>
    </div>
};
