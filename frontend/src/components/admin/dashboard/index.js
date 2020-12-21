import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeScreen from '../../../page/homeScreen';
import CreateBooking from './createBooking';
import { roomApis } from '../../../apis/room.api';
import { bookingApis } from '../../../apis/booking.api';
import { roomTypeApis } from '../../../apis/roomType.api';
import { billApis } from '../../../apis/bill.api';
import moment from 'moment';

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [bills, setBills] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    roomApis.getRooms().then((rooms) => {
      if (rooms) {
        setRooms(rooms);
        roomTypeApis.getRoomTypes().then((types) => {
          if (types) {
            bookingApis.getBookings({ total: 0 }).then((res) => {
              if (res) {
                setBookings(
                  res.map((item) => {
                    const roomIndex = rooms.findIndex(
                      (r) => r._id === item.room_id
                    );
                    item.room = rooms[roomIndex] ? rooms[roomIndex] : '';

                    const typeIndex = types.findIndex(
                      (t) => t._id === rooms[roomIndex].room_type_id
                    );
                    item.room_type = types[typeIndex] ? types[typeIndex] : '';
                    return item;
                  })
                );
              }
              setIsFetching(false);
            });
          } else setIsFetching(false);
        });
      } else setIsFetching(false);
    });
  }, [reload]);

  useEffect(() => {
    setIsFetching(true);
    billApis
      .getBills({
        start_time: moment().startOf('date').format('YYYY-MM-DD'),
        end_time: moment().endOf('date').format('YYYY-MM-DD'),
      })
      .then((res) => {
        if (res) {
          // setBills(
          //   res.filter(
          //     (item) =>
          //       moment(item.created_at).format('DD/MM/YYYY') ===
          //       moment().format('DD/MM/YYYY')
          //   )
          // );
          setBills(res);
        }
        setIsFetching(false);
      });
    setIsFetching(true);
    // roomApis.getRooms().then((rooms) => {
    //   if (rooms) {
    //     setRooms(rooms);
        roomTypeApis.getRoomTypes().then((types) => {
          if (types) {
            bookingApis.getBookings({ total: 0 }).then((res) => {
              if (res) {
                setBookings(
                  res.map((item) => {
                    // const roomIndex = rooms.findIndex(
                    //   (r) => r._id === item.room_id
                    // );
                    // item.room = rooms[roomIndex] ? rooms[roomIndex] : '';

                    // const typeIndex = types.findIndex(
                    //   (t) => t._id === rooms[roomIndex].room_type_id
                    // );
                    const typeIndex = types.findIndex(
                      (t) => t._id === item.room.room_type_id
                    );
                    item.room_type = types[typeIndex] ? types[typeIndex] : '';
                    return item;
                  })
                );
              }
              setIsFetching(false);
            });
          } else setIsFetching(false);
        });
      // } else setIsFetching(false);
      // setRooms(res)
    // });
  }, []);
  const dataRender = bookings
    ? bookings.map((item, index) => (
        <tr key={index}>
          <td>{item.room ? item.room.name : ''}</td>
          <td>{item.customers.length}</td>
          <td>
            {item.check_in_at
              ? moment(item.check_in_at).format('hh:mm DD/MM/yyyy')
              : item.status === 'reserved'
              ? 'Chưa check in'
              : moment(item.created_at).format('hh:mm DD/MM/yyyy')}
          </td>
          <td>{item.room_type ? item.room_type.name : ''}</td>
          <td>{item.room_type ? item.room_type.price : 0}</td>
        </tr>
      ))
    : null;

  let todayRevenue = 0;
  // console.log(bills);
  // bills.forEach((bill) => {
  //   bill.booking_ids.forEach((id) => {
  //     const index = bookings.findIndex((item) => item._id === id);
  //     if (bookings[index]) {
  //       const roomIndex = rooms.findIndex(
  //         (r) => r._id === bookings[index].room_id
  //       );
  //       if (rooms[roomIndex]) {
  //         todayRevenue += rooms[roomIndex].total;
  //       }
  //     }
  //   });
  // });
  bills.forEach((bill) => {
    bill.bookings.forEach((item) => todayRevenue += item.total)
  });
  return (
    <HomeScreen>
      <div id='layoutSidenav_content'>
        <main>
          <div className='container-fluid'>
            <h2 className='mt-30 page-title'>Bảng điều khiển</h2>

            <div className='row'>
              <div className='col-xl-3 col-md-6'>
                <CreateBooking setReload={setReload} />
              </div>

              <div className='col-xl-3 col-md-6'>
                <div className='dashboard-report-card purple'>
                  <div className='card-content'>
                    <span className='card-title'>Phòng Đặt Trước</span>
                    <span className='card-count'>
                      {!isFetching ? (
                        bookings.filter((i) => i.status === 'reserved').length
                      ) : (
                        <div className='spinner-border'></div>
                      )}
                    </span>
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
                    <span className='card-count'>
                      {!isFetching ? (
                        bookings.filter((i) => i.status === 'booking').length
                      ) : (
                        <div className='spinner-border'></div>
                      )}
                    </span>
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
                    <span className='card-count'>
                      {!isFetching ? (
                        todayRevenue
                      ) : (
                        <div className='spinner-border'></div>
                      )}
                    </span>
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
                  <div
                    className='card-body-table listroom'
                    style={{ height: '200px' }}
                  >
                    <div
                      className='table-responsive listroom-table'
                      style={{ height: '200px' }}
                    >
                      <table className='table ucp-table table-hover'>
                        <thead>
                          <tr>
                            <th style={{ width: 130 }}>Số Phòng</th>
                            <th style={{ width: 130 }}>Số lượng khách</th>
                            <th style={{ width: 200 }}>Ngày bắt đầu thuê</th>

                            <th style={{ width: 130 }}>Loại phòng</th>

                            <th style={{ width: 200 }}>Đơn giá</th>
                          </tr>
                        </thead>
                        <tbody>
                          {!isFetching ? (
                            dataRender
                          ) : (
                            <div className='spinner-border'></div>
                          )}
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
