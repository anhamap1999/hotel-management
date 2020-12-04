import React from 'react';

export default function CreateRoom() {
  return (
    <span>
      <button
        type='button'
        className='btn btn-primary'
        data-toggle='modal'
        data-target='#exampleModalCenter'
      >
        Tạo Phòng
      </button>

      <div
        className='modal fade'
        id='exampleModalCenter'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalCenterTitle'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalCenterTitle'>
                Tạo Phòng Mới
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
              <div className='form-group'>
                <label htmlFor='nameroom'>Tên Phòng</label>
                <input
                  type='text'
                  className='form-control'
                  id='nameroom'
                  placeholder='Enter room'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='nameroom'>Tên Phòng</label>
                <input
                  type='text'
                  className='form-control'
                  id='nameroom'
                  placeholder='Enter room'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='nameroom'>Tên Phòng</label>
                <input
                  type='text'
                  className='form-control'
                  id='nameroom'
                  placeholder='Enter room'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='nameroom'>Tên Phòng</label>
                <input
                  type='text'
                  className='form-control'
                  id='nameroom'
                  placeholder='Enter room'
                />
              </div>
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
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}
