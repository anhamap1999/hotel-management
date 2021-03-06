import React from 'react';
import { Link } from 'react-router-dom';
import HomeScreen from '../../../page/homeScreen';
import CreateBooking from './createBooking';
export default function Home() {
  return (
    <HomeScreen>
      <div id='layoutSidenav_content'>
        <main>
          <div className='container-fluid'>
            <h2 className='mt-30 page-title'>Dashboard</h2>
            <ol className='breadcrumb mb-30'>
              <li className='breadcrumb-item active'>Dashboard</li>
            </ol>
            <div className='row'>
              <div className='col-xl-3 col-md-6'>
                <CreateBooking />
              </div>

              <div className='col-xl-3 col-md-6'>
                <div className='dashboard-report-card purple'>
                  <div className='card-content'>
                    <span className='card-title'>Phòng Đặt Trước</span>
                    <span className='card-count'>2</span>
                  </div>
                  <div className='card-media'>
                    <i className='fab fa-rev' />
                  </div>
                </div>
              </div>

              <div className='col-xl-3 col-md-6'>
                <div className='dashboard-report-card success'>
                  <div className='card-content'>
                    <span className='card-title'>Phòng Sử Dụng</span>
                    <span className='card-count'>5</span>
                  </div>
                  <div className='card-media'>
                    <i className='fas fa-sync-alt rpt_icon' />
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-md-6'>
                <div className='dashboard-report-card income'>
                  <div className='card-content'>
                    <span className='card-title'>Thu Nhập Hôm nay </span>
                    <span className='card-count'>$9568.00</span>
                  </div>
                  <div className='card-media'>
                    <i className='fas fa-money-bill rpt_icon' />
                  </div>
                </div>
              </div>
              <div className='col-xl-12 col-md-12'>
                <div className='card card-static-2 mb-30'>
                  <div className='card-title-2'>
                    <h4>Chi tiết Phòng đang sử dụng</h4>
                    <Link to='/roomed' className='view-btn hover-btn'>
                      Xem tất cả
                    </Link>
                  </div>
                  <div className='card-body-table'>
                    <div className='table-responsive'>
                      <table className='table ucp-table table-hover'>
                        <thead>
                          <tr>
                            <th style={{ width: 130 }}>Room ID</th>
                            <th style={{ width: 130 }}>Số lượng khách</th>
                            <th style={{ width: 200 }}>Ngày bắt đầu thuê</th>

                            <th style={{ width: 130 }}>Loại phòng</th>
                            <th style={{ width: 130 }}>Total</th>
                            <th style={{ width: 200 }}>Ghi chú</th>
                            <th style={{ width: 100 }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>#ORDER 123</td>
                            <td>5 </td>
                            <td>2013-01-12 09:10</td>
                            <td>VIP</td>
                            <td>Pending</td>
                            <td>&#8377;5000</td>
                            <td className='action-btns'>
                              <i className='fas fa-eye' />

                              <i className='fas fa-edit' />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </HomeScreen>
  );
}
