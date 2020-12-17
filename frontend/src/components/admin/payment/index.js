import React, { useState } from 'react';
import HomeScreen from '../../../page/homeScreen';
import { Link } from 'react-router-dom';
import { customerApis } from './../../../apis/customer.api';
import { roomTypeApis } from './../../../apis/roomType.api';
import { bookingApis } from './../../../apis/booking.api';
import { useEffect } from 'react';
import moment from 'moment';
import { billApis } from '../../../apis/bill.api';
export default function PaymentScreen() {
  const [customerList, setCustomerList] = useState([]);
  const [customerSelect, setCustomerSelect] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  // const [bookings, setBookings] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [roomQti, setRoomQti] = useState(1);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [dates, setDates] = useState([]);
  const [fees, setFees] = useState([]);
  const [prices, setPrices] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [total, setTotal] = useState(0);
  const [reload, setReload] = useState(false);

  var today = new Date();
  // const date =
  //   today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const date = moment().format('hh:mm DD/MM/YYYY');
  const fetchCustomers = async () => {
    setIsFetching(true);
    const data = await customerApis.getCustomers();
    setCustomerList(data);
    setIsFetching(false);
  };
  const fetchRoomType = async () => {
    setIsFetching(true);
    const data = await roomTypeApis.getRoomTypes();
    setRoomTypes(data);
    setIsFetching(false);
  };
  const fetchBooking = async () => {
    setIsFetching(true);
    const data = await bookingApis.getBookings({ total: 0 });
    setBookingList(data);
    // setBookings(data);
    setIsFetching(false);
  };

  const handleSelectUser = (id) => {
    if (customerList) {
      const customerFound = customerList.find((item) => {
        return item._id === id;
      });
      if (!customerFound) {
        setCustomerSelect(null);
      }
      setCustomerSelect(customerFound);
    }
  };

  useEffect(() => {
    fetchRoomType();
    fetchCustomers();
    fetchBooking();
    selectedBookings.push(null);
    setSelectedBookings([...selectedBookings]);
    dates.push(null);
    setDates([...dates]);
    fees.push(0);
    setFees([...fees]);
    prices.push(0);
    setPrices([...prices]);
  }, []);

  useEffect(() => {
    fetchBooking();
  }, [reload]);

  const onAddRow = () => {
    setRoomQti(roomQti + 1);
    selectedBookings.push(null);
    setSelectedBookings([...selectedBookings]);
    dates.push(0);
    setDates([...dates]);
    fees.push(0);
    setFees([...fees]);
    prices.push(0);
    setPrices([...prices]);
  };

  const onDeleteRow = (index) => {
    setRoomQti(roomQti - 1);
    setTotal(total - fees[index]);
    selectedBookings.splice(index, 1);
    dates.splice(index, 1);
    fees.splice(index, 1);
    prices.splice(index, 1);
    setSelectedBookings([...selectedBookings]);
    setDates([...dates]);
    setFees([...fees]);
    setPrices([...prices]);
  };

  const onInput = (index, value) => {
    // if (selectedBookings[index] && value !== selectedBookings[index]._id) {
    const foundIndex = bookingList.findIndex((i) => i._id === value);
    selectedBookings[index] = bookingList[foundIndex]
      ? bookingList[foundIndex]
      : null;
    setSelectedBookings([...selectedBookings]);

    if (bookingList[foundIndex]) {
      billApis.calculateFee(value).then((res) => {
        if (res) {
          dates[index] = res.dates;
          fees[index] = res.fee;
          setDates([...dates]);
          setFees([...fees]);
          setTotal(total + res.fee);
        }
      });
      const { room } = bookingList[foundIndex];
      const typeIndex = roomTypes.findIndex((i) => i._id === room.room_type_id);
      if (roomTypes[typeIndex]) {
        prices[index] = roomTypes[typeIndex].price;
        setPrices([...prices]);
      }
    }
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking_ids = selectedBookings.filter(i => i && i).map(i => i._id);
    const data = {
      customer_id: customerSelect._id,
      booking_ids: booking_ids,
    };
    setIsFetching(true);
    billApis.createBill(data).then((res) => {
      if (res) {
        setReload(!reload);
        const array = [];
        array.push(null);
        setSelectedBookings([...array]);
        setDates([...array]);
        setFees([...array]);
        setPrices([...array]);
        setCustomerSelect(null);
        setTotal(0);
        setRoomQti(1);
      }
      setIsFetching(false);
    });
  };

  const roomArray = [];
  for (let i = 0; i < roomQti; i++) roomArray.push(i);
  const rowRender = roomQti
    ? roomArray.map((item, index) => (
        <tr style={{ textAlign: 'center' }}>
          <th scope='row' className='STT'></th>
          <td>
            <select
              className='custom-select'
              onChange={(e) => onInput(index, e.target.value)}
              value={selectedBookings[index] && selectedBookings[index]._id}
            >
              <option selected value={null}>
                Chọn phòng
              </option>
              {bookingList
                // .filter(
                //   (i, childIndex) =>
                //     childIndex === index || !bookingIds.includes(i._id)
                // )
                .map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.room ? i.room.name : ''}
                  </option>
                ))}
            </select>
          </td>
          <td style={{ verticalAlign: 'middle' }}>
            {selectedBookings[index]
              ? moment(selectedBookings[index].created_at).format(
                  'hh:mm DD/MM/YYYY'
                )
              : ''}
          </td>
          <td style={{ verticalAlign: 'middle' }}>
            {selectedBookings[index] ? dates[index] : ''}
          </td>
          <td style={{ verticalAlign: 'middle' }}>
            {selectedBookings[index]
              ? selectedBookings[index].customers.length
              : ''}
          </td>
          <td style={{ verticalAlign: 'middle' }}>
            {selectedBookings[index] ? prices[index] : ''}
          </td>
          <td style={{ verticalAlign: 'middle' }}>
            {selectedBookings[index] ? fees[index] : ''}
          </td>
          <td style={{ verticalAlign: 'middle' }}>
            <i
              className='fas fa-trash'
              style={{ cursor: 'pointer' }}
              title='Xóa dòng'
              onClick={() => onDeleteRow(index)}
            />
          </td>
        </tr>
      ))
    : null;
  return (
    <HomeScreen>
      <div className='bill'>
        <h1 className='text-center'>Lập hóa đơn</h1>
        <div className='bill-body'>
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <div className='form-body'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label for='name'>Tên khách hàng</label>
                    <select
                      className='form-control'
                      id='CustomerName'
                      onChange={(e) => handleSelectUser(e.target.value)}
                    >
                      <option selected>Lựa chọn ...</option>
                      {customerList.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label for='date'>Ngày</label>
                    <input
                      type='text'
                      className='form-control'
                      id='date'
                      value={date}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label for='name'>Địa chỉ</label>
                    <input
                      type='text'
                      className='form-control'
                      id='CustomerName'
                      placeholder='Hãy chọn tên khách hàng'
                      value={(customerSelect && customerSelect.address) || ''}
                      disabled
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label for='Total'>Thành tiền</label>
                    <input
                      type='text'
                      className='form-control'
                      id='Total'
                      value={total}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className='bill-table'>
                <table className='table table-sm'>
                  <thead className='text-center'>
                    <tr>
                      <th scope='col'>STT</th>
                      <th scope='col'>Số phòng</th>
                      <th scope='col'>Ngày bắt đầu thuê</th>
                      <th scope='col'>Số ngày thuê</th>
                      <th scope='col'>Số lượng khách</th>
                      <th scope='col'>Đơn Giá</th>
                      <th scope='col'>Thành tiền</th>
                      <th scope='col'>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>{!isFetching ? rowRender : <div className='spinner-border'></div>}</tbody>
                </table>
                <i
                  className='fas fa-plus-square'
                  title='Thêm phòng'
                  onClick={onAddRow}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div className='listroom-button text-center'>
                <button type='submit' className='btn btn-primary'>
                  Thanh toán
                </button>

                <Link to='/'>
                  <button type='button' className='btn btn-danger'>
                    Thoát
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </HomeScreen>
  );
}
