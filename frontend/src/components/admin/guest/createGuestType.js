import React from 'react';

export default function CreateGuestType() {
  return (
    <span>
      <button
        type='button'
        class='btn btn-primary'
        data-toggle='modal'
        data-target='#exampleModalCenter'
      >
        Thêm khách hàng
      </button>

      <div
        class='modal fade'
        id='exampleModalCenter'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalCenterTitle'
        aria-hidden='true'
      >
        <div class='modal-dialog modal-dialog-centered' role='document'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title' id='exampleModalCenterTitle'>
                Khách hàng mới
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
              <div class='form-group'>
                <label for='nameroom'>Tên Khách hàng</label>
                <input
                  type='text'
                  class='form-control'
                  id='nameroom'
                  placeholder='Enter room'
                />
              </div>
              <div class='form-group'>
                <label for='nameroom'>Chứng minh nhân dân</label>
                <input
                  type='text'
                  class='form-control'
                  id='nameroom'
                  placeholder='Enter room'
                />
              </div>
              <div class='form-group'>
                <label for='nameroom' style={{marginRight:'35px'}}>Địa chỉ</label>
                <input

                    type='text'
                    class='form-control'
                    id='nameroom'
                    placeholder='Enter room'
                />
              </div>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-secondary'
                data-dismiss='modal'
              >
                Đóng
              </button>
              <button type='button' class='btn btn-primary'>
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}
