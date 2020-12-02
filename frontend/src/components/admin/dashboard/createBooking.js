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
        class='modal fade bd-example-modal-xl'
        id='exampleModalCenter'
        tabindex='-1'
        role='dialog'
        aria-labelledby='myLargeModalLabel'
        aria-hidden='true'
      >
        <div
          class='modal-dialog modal-xl modal-dialog-centered'
          role='document'
        >
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title' id='exampleModalCenterTitle'>
                Tạo Phiếu Thuê Phòng
              </h5>
              <button
                type='button'
                class='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div class='modal-body'>
              <form class='' style={{ width: '100%' }}>
                <div class='form-group row'>
                  <label for='roomId' class='col-md-3 col-form-label'>
                    Số phòng
                  </label>
                  <div className='col-md-9'>
                    <input
                      type='text'
                      class='form-control'
                      id='roomId'
                      placeholder='Vd:101'
                    />
                  </div>
                </div>

                <div class='form-group row'>
                  <label for='startDate' class='col-md-3 col-form-label'>
                    Ngày bắt đầu thuê
                  </label>
                  <div className='col-md-9'>
                    <input type='date' class='form-control' id='startDate' />
                  </div>
                </div>
                <div className='customerList'>
                  <table class='table table-sm'>
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
                            class='form-control'
                            placeholder='Nhập tên khách hàng'
                          />
                        </td>
                        <td>
                          <select class='custom-select options-size'>
                            <option selected>Choose</option>
                            <option value='1'>One</option>
                            <option value='2'>Two</option>
                            <option value='3'>Three</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type='text'
                            class='form-control'
                            placeholder='Số CMND'
                          />
                        </td>
                        <td>
                          <input
                            type='text'
                            class='form-control'
                            placeholder='Vd: quận 2, Tp HCM'
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope='row' className='STT'></th>
                        <td>
                          <input
                            type='text'
                            class='form-control'
                            placeholder='Nhập tên khách hàng'
                          />
                        </td>
                        <td>
                          <select class='custom-select options-size'>
                            <option selected>Choose</option>
                            <option value='1'>One</option>
                            <option value='2'>Two</option>
                            <option value='3'>Three</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type='text'
                            class='form-control'
                            placeholder='Số CMND'
                          />
                        </td>
                        <td>
                          <input
                            type='text'
                            class='form-control'
                            placeholder='Vd: quận 2, Tp HCM'
                          />
                        </td>
                      </tr>{' '}
                      <tr>
                        <th scope='row' className='STT'></th>
                        <td>
                          <input
                            type='text'
                            class='form-control'
                            placeholder='Nhập tên khách hàng'
                          />
                        </td>
                        <td>
                          <select class='custom-select options-size'>
                            <option selected>Choose</option>
                            <option value='1'>One</option>
                            <option value='2'>Two</option>
                            <option value='3'>Three</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type='text'
                            class='form-control'
                            placeholder='Số CMND'
                          />
                        </td>
                        <td>
                          <input
                            type='text'
                            class='form-control'
                            placeholder='Vd: quận 2, Tp HCM'
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-secondary'
                data-dismiss='modal'
              >
                Close
              </button>
              <button type='button' class='btn btn-primary'>
                Tạo Phiếu Thuê
              </button>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}
