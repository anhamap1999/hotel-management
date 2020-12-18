import React, { useEffect, useState } from 'react';
import { roomTypeApis } from './../../../apis/roomType.api';
import { roomApis } from '../../../apis/room.api';
import { customerApis } from '../../../apis/customer.api';
import { bookingApis } from '../../../apis/booking.api';
import { customerTypeApis } from '../../../apis/customerType.api';
import { configApis } from '../../../apis/config.api';
import moment from 'moment';
export default function CreateBooking({ setReload }) {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [room_id, setRoomId] = useState('');
  const [customers, setCustomers] = useState([]);
  const [max_qti_of_customers, setConfigs] = useState([]);
  const [customerTypes, setCustomerTypes] = useState([]);
  const [userSelected, setUserSelected] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [error, setError] = useState([]);
  const [type, setType] = useState('booking');
  const date = moment().format('hh:mm DD/MM/YYYY');
  const customerRow = [];
  for (let i = 0; i < max_qti_of_customers; i++) {
    customerRow.push(i);
  }

  const fetchRoomTypes = async () => {
    const roomType = await roomTypeApis.getRoomTypes();
    console.log(roomType);
  };
  useEffect(() => {
    roomTypeApis.getRoomTypes().then((res) => {
      if (res) setRoomTypes(res);
    });
    roomApis.getRooms({ status: 'available' }).then((res) => {
      if (res) {
        setRooms(res);
        setRoomId(res[0]._id);
      }
    });
    // customerApis.getCustomer().then((res) => {
    //   if (res) setCustomers(res);
    // });
    configApis.getConfigs().then((res) => {
      if (res) {
        const index = res.findIndex(
          (item) => item.name === 'max_qti_of_customers'
        );
        if (res[index]) {
          setConfigs(res[index].value);
        }
      }
    });
    customerTypeApis.getCustomerTypes().then((res) => {
      if (res) setCustomerTypes(res);
    });
    customerApis.getCustomers({ status: 'available' }).then((res) => res && setCustomers(res));
  }, []);

  useEffect(() => {
    if (customers && userSelected.length > 0) {
      for (let i = 0; i < userSelected.length; i++) {
        const user = customers.find((cus) => cus._id === userSelected[i]);
        if (user) {
          setDataUser((pre) => {
            const data = pre.slice();
            data[i] = user;
            return data;
          });
        }
      }
    }
  }, [userSelected]);
  const convertData = (fieldName, index) => {
    return dataUser
      ? dataUser[index]
        ? dataUser[index][fieldName]
        : null
      : null;
  };
  const handleBooking = async () => {
    if (!dataUser.length) return;
    try {
      const customers = [];
      const customerPromises = [];
      dataUser.forEach((item, index) => {
        if (!item._id) {
          const { name, id_number, address, customer_type_id } = item;
          if (name && id_number && address && customer_type_id) {
            customerPromises.push(customerApis.createOrUpdateCustomer(null, {
              name,
              id_number,
              address,
              customer_type_id,
            }))
            // const customer = await customerApis.createOrUpdateCustomer(null, {
            //   name,
            //   id_number,
            //   address,
            //   customer_type_id,
            // });
            // if (customer) {
            //   customers.push({
            //     id: customer._id,
            //     type_id: customer.customer_type_id,
            //   });
            // }
          } else if (!name || !id_number || !address || !customer_type_id) {
            error[index] = 'Hãy nhập đầy đủ thông tin';
            setError([...error]);
          } else {
            error[index] = null;
            setError([...error]);
          }
        } else {
          if (!item) {
            error[index] =
              'Hãy chọn khách hàng hoặc nhập thông tin khách hàng mới';
            setError([...error]);
          }
          customers.push({
            id: item._id,
            type_id: item.customer_type_id,
          });
        }
      });
      const result = await Promise.all(customerPromises);
      customers.push(...(result.map(i => ({ id: i._id, type_id: i.customer_type_id }))));
      if (!error || error.every((i) => !i)) {
        const data = await bookingApis.createBooking({
          room_id: room_id,
          customers,
          is_reserved: type === 'reserved' ? true : false
        });
        setReload((pre) => !pre);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onInput = (index, key, value) => {
    if (dataUser[index]) {
      if (key === 'id_number' && !parseInt(value)) {
        return;
      }
      dataUser[index][key] = value;
      setDataUser([...dataUser]);
    } else {
      dataUser[index] = {};
      if (key === 'id_number' && !parseInt(value)) {
        return;
      }
      dataUser[index][key] = value;
      setDataUser([...dataUser]);
    }
  };
  const displayCustomers = () => {
    let render = <br />;
    for (let i = 0; i < max_qti_of_customers; i++) {
      render += (
        <tr>
          <th scope='row' className='STT'></th>
          <td>
            <select className='custom-select options-size'>
              <option selected>Lựa chọn ...</option>
              {customers.map((customer) => (
                <option
                  style={{ textTransform: 'uppercase' }}
                  key={customer._id}
                  value={customer._id}
                >
                  {customer.name.toUpperCase()}
                </option>
              ))}
            </select>
            <div>Hoặc thêm mới: </div>
            <input
              type='text'
              className='form-control'
              placeholder='Nhập tên khách hàng'
            />
          </td>
          <td>
            <select className='custom-select options-size'>
              <option selected>Lựa chọn ...</option>
              {customerTypes.map((type) => (
                <option
                  style={{ textTransform: 'uppercase' }}
                  key={type._id}
                  value={type._id}
                >
                  {type.name.toUpperCase()}
                </option>
              ))}
            </select>
          </td>
          <td>
            <input type='text' className='form-control' placeholder='Số CMND' />
          </td>
          <td>
            <input
              type='text'
              className='form-control'
              placeholder='Vd: quận 2, Tp HCM'
            />
          </td>
        </tr>
      );
    }
    console.log(render);
    return render;
  };

  return (
    <span>
      <button
        type='button'
        className='ani-button'
        data-toggle='modal'
        data-target='.bd-example-modal-xl'
        style={{
          padding: '0px 15px',
          outline: 'none',
          width: '100%',
          height: '100%',
          background: 'none',
          border: 'none',
        }}
      >
        <div
          className='dashboard-report-card info'
          style={{ height: '80%', border: '2px solid gray' }}
        >
          <div className='card-content'>
            <span className='card-title text-left'>Thuê phòng</span>
          </div>
          <div className='card-media'>
            <i className='fas fa-plus' />
          </div>
        </div>
      </button>

      <div
        className='modal fade bd-example-modal-xl'
        id='exampleModalCenter'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='myLargeModalLabel'
        aria-hidden='true'
      >
        <div
          className='modal-dialog modal-xl modal-dialog-centered'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalCenterTitle'>
                Tạo Phiếu Thuê Phòng
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form className='' style={{ width: '100%' }}>
                <div className='form-group row'>
                  <label htmlFor='roomId' className='col-md-3 col-form-label'>
                    Số phòng
                  </label>
                  <div className='col-md-9'>
                    <select
                      className='form-control'
                      onChange={(e) => setRoomId(e.target.value)}
                    >
                      {rooms.map((room) => (
                        <option
                          style={{ textTransform: 'uppercase' }}
                          key={room._id}
                          value={room._id}
                        >
                          {room.name.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='form-group row'>
                  <label
                    htmlFor='startDate'
                    className='col-md-3 col-form-label'
                  >
                    Ngày bắt đầu thuê
                  </label>
                  <div className='col-md-9'>
                    <input
                      type='text'
                      className='form-control'
                      id='date'
                      placeholder={date}
                      disabled
                    />
                  </div>
                </div>
                <div className='form-group row'>
                  <label
                    htmlFor='startDate'
                    className='col-md-3 col-form-label'
                  >
                    Thuê phòng hay Đặt trước
                  </label>
                  <div className='col-md-9'>
                  <select
                      className='form-control'
                      onChange={(e) => setType(e.target.value)}
                      value={type}
                    >
                      {['booking', 'reserved'].map((item) => (
                        <option
                          style={{ textTransform: 'uppercase' }}
                          key={item}
                          value={item}
                        >
                          {item === 'booking' ? 'Thuê phòng' : 'Đặt trước'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className='customerList'>
                  <table className='table table-sm'>
                    <thead className='text-center'>
                      <tr>
                        <th scope='col'>STT</th>
                        <th scope='col'>Tên khách hàng</th>
                        <th scope='col' style={{ width: '150px' }}>
                          Loại khách
                        </th>
                        <th scope='col' style={{ width: '250px' }}>
                          CMND
                        </th>
                        <th scope='col'>Địa chỉ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {displayCustomers()} */}
                      {customerRow.map((_, index) => {
                        return (
                          <tr>
                            <th scope='row' className='STT'></th>
                            <td>
                              <select
                                className='custom-select options-size'
                                onChange={(e) => {
                                  const { value } = e.target;
                                  setUserSelected((pre) => {
                                    const user = pre.slice();
                                    user[index] = value;
                                    return user;
                                  });
                                }}
                              >
                                <option selected>Lựa chọn ...</option>
                                {customers.map((customer) => (
                                  <option
                                    style={{ textTransform: 'uppercase' }}
                                    key={customer._id}
                                    value={customer._id}
                                  >
                                    {customer.name.toUpperCase()}
                                  </option>
                                ))}
                              </select>
                              <div>Hoặc thêm mới: </div>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Nhập tên khách hàng'
                                onChange={(e) =>
                                  onInput(index, 'name', e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <select
                                className='custom-select options-size'
                                value={convertData('customer_type_id', index)}
                                onChange={(e) =>
                                  onInput(
                                    index,
                                    'customer_type_id',
                                    e.target.value
                                  )
                                }
                              >
                                <option selected>Lựa chọn ...</option>
                                {customerTypes.map((type) => (
                                  <option
                                    style={{ textTransform: 'uppercase' }}
                                    key={type._id}
                                    value={type._id}
                                  >
                                    {type.name.toUpperCase()}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Số CMND'
                                value={convertData('id_number', index)}
                                onChange={(e) =>
                                  onInput(index, 'id_number', e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type='text'
                                className='form-control'
                                placeholder='Vd: quận 2, Tp HCM'
                                value={convertData('address', index)}
                                onChange={(e) =>
                                  onInput(index, 'address', e.target.value)
                                }
                              />
                            </td>
                            {error && error[index] && (
                              <div
                                className='err'
                                style={{
                                  textAlign: 'center',
                                  color: 'red',
                                  fontWeight: 500,
                                  display: 'block',
                                }}
                              >
                                {error[index]}
                              </div>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleBooking}
              >
                Tạo Phiếu Thuê
              </button>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}
