import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeScreen from '../../../page/homeScreen';
import { roomApis } from '../../../apis/room.api';
import { bookingApis } from '../../../apis/booking.api';
import { roomTypeApis } from '../../../apis/roomType.api';
import { customerApis } from '../../../apis/customer.api';
import { customerTypeApis } from '../../../apis/customerType.api';
import moment from 'moment';

const customerTypeDefined = {
  native: 'Nội địa',
  foreign: 'Quốc tế',
};

export default function RoomedScreen() {
  const [bookings, setBookings] = useState([]);
  const [types, setTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [reload, setReload] = useState(false);

  const fetchData = () => {
    setIsFetching(true);
    roomApis.getRooms().then((rooms) => {
      if (rooms) {
        setRooms(rooms);
        roomTypeApis.getRoomTypes().then((types) => {
          if (types) {
            setTypes(types);
            bookingApis.getBookings().then((res) => {
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
          }
          setIsFetching(false);
        });
      }
      setIsFetching(false);
    });
  };

  useEffect(() => {
    fetchData();
    setIsFetching(true);
    customerTypeApis.getCustomerTypes().then((types) => {
      if (types) {
        customerApis.getCustomers().then((res) => {
          if (res) {
            setCustomers(
              res.map((item) => {
                const index = types.findIndex(
                  (i) => i._id === item.customer_type_id
                );
                item.type = types[index] ? types[index] : '';
                return item;
              })
            );
            setIsFetching(false);
          }
        });
      }
      setIsFetching(false);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [reload]);

  const onView = (item) => {
    setSelectedBooking(item);
  };

  const onCheckIn = (id) => {
    setIsFetching(true);
    bookingApis.checkIn(id).then((res) => {
      if (res) {
        setReload(!reload);
      }
      setIsFetching(false);
    });
  };

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
          <td>
            <div
              className={`label label-${
                item.status === 'reserved'
                  ? 'reserved'
                  : item.total === 0
                  ? 'not-paid'
                  : 'paid'
              }`}
            >
              {item.status === 'reserved'
                ? 'Đã đặt trước'
                : item.total === 0
                ? 'Đang cho thuê'
                : 'Đã thanh toán'}
            </div>
          </td>
          <td>{item.total}</td>
          <td>
            <span
              // className='action-btns'
              data-toggle='modal'
              data-target='#viewModal'
              style={{ margin: '5px' }}
            >
              <i
                className='fas fa-eye'
                style={{ cursor: 'pointer' }}
                onClick={() => onView(item)}
              />
            </span>
            {item.status === 'reserved' ? (
              <i
                className='fas fa-check-square'
                style={{ cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => onCheckIn(item._id)}
                title='Check in'
              />
            ) : null}
          </td>
        </tr>
      ))
    : null;

  const customersRender = selectedBooking
    ? selectedBooking.customers.map((item, index) => {
        const customerIndex = customers.findIndex((i) => i._id === item.id);
        const customer = customers[customerIndex];
        return customer ? (
          <tr key={index}>
            <td>{customer.name}</td>
            <td>{customer.id_number}</td>
            <td>{customer.address}</td>
            <td>{customer.type && customer.type.name}</td>
          </tr>
        ) : null;
      })
    : null;

  return (
    <HomeScreen>
      <div className='listroom '>
        <h1 className='text-center'>Phiếu thuê phòng</h1>

        <div className='listroom-table'>
          <table className='table table-sm'>
            <thead>
              <tr>
                <th style={{ width: 130 }}>Số Phòng</th>
                <th style={{ width: 150 }}>Số lượng khách</th>
                <th style={{ width: 200 }}>Ngày bắt đầu thuê</th>
                <th style={{ width: 130 }}>Loại phòng</th>
                <th style={{ width: 200 }}>Đơn giá</th>
                <th style={{ width: 200 }}>Trạng thái</th>
                <th style={{ width: 200 }}>Thành tiền</th>
                <th style={{ width: 200 }}></th>
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
        <div className='listroom-button'>
          <button type='button' className='btn btn-dark'>
            <Link to='/seek'>Tra cứu</Link>
          </button>
          <button type='button' className='btn btn-danger'>
            <Link to='/'>Thoát</Link>
          </button>
        </div>
      </div>

      <div
        className='modal fade'
        id='viewModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='viewModalTitle'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <form className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='viewModalTitle'>
                Chi tiết phiếu thuê phòng
              </h5>
            </div>
            <div className='modal-body'>
              {/* <form> */}
              <div className='listroom-table'>
                <div>
                  <label>Số Phòng: </label>
                  <span className='mx-2 font-weight-bold'>
                    {selectedBooking && selectedBooking.room
                      ? selectedBooking.room.name
                      : ''}
                  </span>
                </div>
                <div>
                  <label>Số lượng khách: </label>
                  <span className='mx-2 font-weight-bold'>
                    {selectedBooking ? selectedBooking.customers.length : ''}
                  </span>
                </div>
                <div>
                  <label>Ngày bắt đầu thuê: </label>
                  <span className='mx-2 font-weight-bold'>
                    {selectedBooking ? (selectedBooking.check_in_at
                      ? moment(selectedBooking.check_in_at).format(
                          'hh:mm DD/MM/yyyy'
                        )
                      : selectedBooking.status === 'reserved'
                      ? 'Chưa check in'
                      : moment(selectedBooking.created_at).format(
                          'hh:mm DD/MM/yyyy'
                        )) : ''}
                  </span>
                </div>
                <div>
                  <label>Loại phòng: </label>
                  <span className='mx-2 font-weight-bold'>
                    {selectedBooking && selectedBooking.room_type
                      ? selectedBooking.room_type.name
                      : ''}
                  </span>
                </div>
                <div>
                  <label>Đơn giá: </label>
                  <span className='mx-2 font-weight-bold'>
                    {selectedBooking && selectedBooking.room_type
                      ? selectedBooking.room_type.price
                      : 0}
                  </span>
                </div>
                <div>
                  <label>Trạng thái: </label>
                  <span className='mx-2 font-weight-bold'>
                    {selectedBooking && selectedBooking.total === 0
                      ? 'Đang cho thuê'
                      : 'Đã thanh toán'}
                  </span>
                </div>
                <div>
                  <label>Thành tiền: </label>
                  <span className='mx-2 font-weight-bold'>
                    {selectedBooking ? selectedBooking.total : 0}
                  </span>
                </div>

                <table className='table table-sm'>
                  <thead>
                    <tr>
                      <th style={{ width: 130 }}>Tên khách</th>
                      <th style={{ width: 150 }}>CMND</th>
                      <th style={{ width: 200 }}>Địa chỉ</th>
                      <th style={{ width: 130 }}>Loại khách</th>
                    </tr>
                  </thead>
                  <tbody>{customersRender}</tbody>
                </table>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                Đóng
              </button>
            </div>
          </form>
        </div>
      </div>
    </HomeScreen>
  );
}
