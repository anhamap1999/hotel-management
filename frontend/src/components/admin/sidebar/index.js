import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem('app-user'));
  return (
    <div id='layoutSidenav_nav' style={{ overflowX: 'auto' }}>
      <nav
        className='sb-sidenav accordion sb-sidenav-dark'
        id='sidenavAccordion'
      >
        <div className='sb-sidenav-menu'>
          <div className='nav'>
            <Link to='/' className='nav-link active'>
              <div className='sb-nav-link-icon'>
                <i className='fas fa-tachometer-alt' />
              </div>
              Bảng Điều Khiển
            </Link>
            <div style={{ opacity: '0%', fontSize: '8pt' }}>divider</div>
            {/* <Link
              className='nav-link collapsed'
              data-toggle='collapse'
              data-target='#collapseShops'
              aria-expanded='false'
              aria-controls='collapseShops'
            >
              <div className='sb-nav-link-icon'>
                <i className='fas fa-store' />
              </div>
              Danh Mục Phòng
              <div className='sb-sidenav-collapse-arrow'>
                <i className='fas fa-angle-down' />
              </div>
            </Link>
            <div
              className='collapse'
              id='collapseShops'
              aria-labelledby='headingTwo'
              data-parent='#sidenavAccordion'
            >
              <nav className='sb-sidenav-menu-nested nav'>
                <Link
                  to='/listroom'
                  className='nav-link sub_nav_link'
                  href='/admin/room/list'
                >
                  Danh Sách Phòng
                </Link>
              </nav>
            </div>
            <a
              className='nav-link collapsed'
              href='#'
              data-toggle='collapse'
              data-target='#collapseProducts'
              aria-expanded='false'
              aria-controls='collapseProducts'
            >
              <div className='sb-nav-link-icon'>
                <i className='fas fa-box' />
              </div>
              Thuê Phòng
              <div className='sb-sidenav-collapse-arrow'>
                <i className='fas fa-angle-down' />
              </div>
            </a>
            <div
              className='collapse'
              id='collapseProducts'
              aria-labelledby='headingTwo'
              data-parent='#sidenavAccordion'
            >
              <nav className='sb-sidenav-menu-nested nav'>
                <Link
                  to='/roomed'
                  className='nav-link sub_nav_link'
                  href='/admin/roomed/list'
                >
                  Phòng Đã Thuê
                </Link>
              </nav>
            </div> */}

            <Link to='/listroom' className='nav-link collapsed'>
              <div className='sb-nav-link-icon'>
                <i className='fas fa-store' />
              </div>
              Phòng
            </Link>
            <Link to='/seek' className='nav-link collapsed'>
              <div className='sb-nav-link-icon'>
                <i className='fas fa-search' />
              </div>
              Tra Cứu Phòng
            </Link>
            <Link to='/room-type' className='nav-link active'>
              <div className='sb-nav-link-icon'>
                <i className='fas fa-store-alt' />
              </div>
              Loại Phòng
            </Link>
            <div style={{ opacity: '0%', fontSize: '8pt' }}>divider</div>
            <Link to='/customer' className='nav-link collapsed'>
              <div className='sb-nav-link-icon'>
                <i className='fas fa-users' />
              </div>
              Khách Hàng
            </Link>
            <Link to='/customertype' className='nav-link collapsed'>
              <div className='sb-nav-link-icon'>
                <i className='fas fa-child' />
              </div>
              Loại Khách Hàng
            </Link>
            <div style={{ opacity: '0%', fontSize: '8pt' }}>divider</div>
            <Link to='/roomed' className='nav-link collapsed'>
              <div className='sb-nav-link-icon'>
                <i className='fas fa-box' />
              </div>
              Phiếu Thuê Phòng
            </Link>

            <Link to='/payment' className='nav-link collapsed'>
              <div className='sb-nav-link-icon'>
                <i className='fas fa-money-check' />
              </div>
              Thanh Toán
            </Link>
            <Link to='/order' className='nav-link collapsed'>
              <div className='sb-nav-link-icon'>
                <i
                  className='fas fa-clipboard-list'
                  style={{ fontSize: '12pt' }}
                />
              </div>
              Hóa Đơn
            </Link>
            <div style={{ opacity: '0%', fontSize: '8pt' }}>divider</div>
            <Link to='/report' className='nav-link collapsed'>
              <div className='sb-nav-link-icon'>
                <i className='fas fa-scroll' />
              </div>
              Báo Cáo
            </Link>

            {user.isAdmin && (
              <Link to='/staff' className='nav-link collapsed'>
                <div className='sb-nav-link-icon'>
                  <i className='fas fa-users' />
                </div>
                Nhân viên
              </Link>
            )}
            {user.isAdmin && (
              <Link to='/rule' className='nav-link' href='/admin/customer/list'>
                <div className='sb-nav-link-icon'>
                  <i className='fas fa-users-cog' />
                </div>
                Quy Định
              </Link>
            )}
            <Link to='/profile' className='nav-link collapsed'>
              <div className='sb-nav-link-icon'>
                <i className='fas fa-user' />
              </div>
              Thông tin cá nhân
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
