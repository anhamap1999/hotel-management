import React, { useEffect, useState } from 'react';
import HomeScreen from '../../../page/homeScreen';

import { billApis } from '../../../apis/bill.api';
import { customerApis } from '../../../apis/customer.api';
import { roomApis } from '../../../apis/room.api';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function Listroom() {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [customers, setCustomers] = useState(null);

  const fetchBill = () => {
    setIsFetching(true);
    billApis.getBills().then((res) => {
      if (res) {
        setData(res);
      }
      setIsFetching(false);
    });
  };
  const fetchRoom = () => {
    setIsFetching(true);
    roomApis.getRooms().then((res) => {
      if (res) {
        setRooms(res);
      }
      setIsFetching(false);
    });
  };
  const fetchCustomer = () => {
    setIsFetching(true);
    customerApis.getCustomers().then((res) => {
      if (res) {
        setCustomers(res);
      }
      setIsFetching(false);
    });
  };
  useEffect(() => {
    fetchBill();
    fetchRoom();
    fetchCustomer();
  }, []);
  useEffect(() => {
    fetchBill();
  }, [start, end]);

  const dataRender = data
    ? data.map((bill, index) => {
        const roomNames = bill.bookings.map((item) => {
            const index = rooms && rooms.findIndex(i => i._id === item.room_id);
            return rooms[index] ? rooms[index].name : '';
        });
        const customerIndex = customers && customers.findIndex(i => i._id === bill.customer_id);
        let total = 0;
        bill.bookings.forEach((i) => (total += i.total));
        return (
          <tr key={bill._id}>
            <th scope='row'>{index + 1}</th>
            <td>{customers[customerIndex] ? customers[customerIndex].name : ''}</td>
            <td>{moment(bill.created_at).format('hh:mm DD/MM/YYYY')}</td>
            <td>{roomNames.toLocaleString()}</td>
            <td>{total}</td>
          </tr>
        );
      })
    : data;
  return (
    <HomeScreen>
      <div className='listroom '>
        <h1 className='text-center'>Danh sách phòng</h1>
        <div className='listroom-table'>
          <table className='table table-sm'>
            <thead>
              <tr>
                <th scope='col'>STT</th>
                <th scope='col'>Tên khách hàng</th>
                <th scope='col'>Ngày thanh toán</th>
                <th scope='col'>Các phòng đã thanh toán</th>
                <th scope='col'>Thành tiền</th>
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
          <Link to='/'>
            <button type='button' className='btn btn-danger'>
              Thoát
            </button>
          </Link>
        </div>
      </div>
    </HomeScreen>
  );
}
