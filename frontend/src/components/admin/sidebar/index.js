import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    
        return (
            <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <Link to='/' className="nav-link active">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" /></div>
                            Bảng điều khiển
                        </Link>

                        <Link  className="nav-link collapsed"  data-toggle="collapse" data-target="#collapseShops" aria-expanded="false" aria-controls="collapseShops">
                            <div className="sb-nav-link-icon"><i className="fas fa-store" /></div>
                            Danh Mục Phòng
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </Link>
                        <div className="collapse" id="collapseShops" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link  to='/listroom' className="nav-link sub_nav_link" href="/admin/room/list">Danh Sách Phòng</Link>
                             
                            </nav>
                        </div>
                        <Link to='/room-type' className="nav-link active">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" /></div>
                            Danh sách loại phòng
                        </Link>
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseProducts" aria-expanded="false" aria-controls="collapseProducts">
                            <div className="sb-nav-link-icon"><i className="fas fa-box" /></div>
                            Thuê Phòng
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="collapseProducts" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link to='/roomed' className="nav-link sub_nav_link" href="/admin/roomed/list">Phòng Đã Thuê</Link>
                                
                            </nav>
                        </div>
                        <Link  to='/seek' className="nav-link collapsed" >
                            <div className="sb-nav-link-icon"><i className="fas fa-search" /></div>
                           Tra Cứu
                        </Link>
                      
                        <Link to='/payment' className="nav-link collapsed" >
                            <div className="sb-nav-link-icon"><i className="fas fa-money-check" /></div>
                            Thanh Toán
                        </Link>
                        <Link to='/report' className="nav-link collapsed" >
                            <div className="sb-nav-link-icon"><i className="fas fa-scroll" /></div>
                            Báo Cáo
                        </Link>
                       
                        <Link to='/rule' className="nav-link" href="/admin/customer/list">
                            <div className="sb-nav-link-icon"><i className="fas fa-users" /></div>
                            Quy Định
                        </Link>
   
                    </div>
                </div>
            </nav>
        </div>

        );
    
}
