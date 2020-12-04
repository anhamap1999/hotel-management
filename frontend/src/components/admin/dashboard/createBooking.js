import React, { useEffect, useState } from 'react';
import { roomTypeApis } from './../../../apis/roomType.api';
export default function CreateBooking() {
  const [roomTypes, setRoomTypes] = useState([]);

  const fetchRoomTypes = async () => {
    const roomType = await roomTypeApis.getRoomTypes();
    console.log(roomType);
  };
  useEffect(() => {
    fetchRoomTypes();
  }, []);
  console.log('hello');
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
                    <input
                      type='text'
                      className='form-control'
                      id='roomId'
                      placeholder='Vd:101'
                    />
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
                      type='date'
                      className='form-control'
                      id='startDate'
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
                      <tr>
                        <th scope='row' className='STT'></th>
                        <td>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Nhập tên khách hàng'
                          />
                        </td>
                        <td>
                          <select className='custom-select options-size'>
                            <option selected>Lựa chọn ...</option>
                            <option value='1'>Thường</option>
                            <option value='2'>Vip</option>
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
                      <tr>
                        <th scope='row' className='STT'></th>
                        <td>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Nhập tên khách hàng'
                          />
                        </td>
                        <td>
                          <select className='custom-select options-size'>
                            <option selected>Lựa chọn ...</option>
                            <option value='1'>Thường</option>
                            <option value='2'>Vip</option>
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
                      </tr>{' '}
                      <tr>
                        <th scope='row' className='STT'></th>
                        <td>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Nhập tên khách hàng'
                          />
                        </td>
                        <td>
                          <select className='custom-select options-size'>
                            <option selected>Lựa chọn ...</option>
                            <option value='1'>Thường</option>
                            <option value='2'>Vip</option>
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
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                Close
              </button>
              <button type='button' className='btn btn-primary'>
                Tạo Phiếu Thuê
              </button>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}
