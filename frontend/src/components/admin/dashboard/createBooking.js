import React, { useEffect, useState } from 'react';
import { roomTypeApis } from './../../../apis/roomType.api';
import { roomApis } from '../../../apis/room.api';
import { customerApis } from '../../../apis/customer.api';
import { customerTypeApis } from '../../../apis/customerType.api';
import { configApis } from '../../../apis/config.api';
import moment from 'moment';
export default function CreateBooking() {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [room_id, setRoomId] = useState('');
  const [customers, setCustomers] = useState([]);
  const [max_qti_of_customers, setConfigs] = useState([]);
  const [customerTypes, setCustomerTypes] = useState([]);
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
    customerApis.getCustomer().then((res) => {
      if (res) setCustomers(res);
    });
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
  }, []);

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
                    <select className='form-control'>
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
                      {customerRow.map((item) => {
                        return (
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
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Số CMND'
                            />
                          </td>
                          <td>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Vd: quận 2, Tp HCM'
                            />
                          </td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-primary'>
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
