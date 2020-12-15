import React, { useEffect, useState } from 'react';

export default function EditCustomerType(props) {
  const { selectedType } = props;
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (selectedType && selectedType._id !== id) {
      setId(selectedType._id);
      setName(selectedType.name);
    }
  }, [selectedType]);

  return (
    <span>
      <td
        className='action-btns'
        data-toggle='modal'
        data-target='#exampleModalCenter'
      >
        <i className='fas fa-edit' style={{ cursor: 'pointer' }} />
      </td>

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
                Sửa Loại khách hàng
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
                <label for={selectedType ? selectedType._id + 'name' : 'name'}>
                  Tên Loại khách
                </label>
                <div>
                  <input
                    type='text'
                    class='form-control'
                    id={selectedType ? selectedType._id + 'name' : 'name'}
                    placeholder='Nhập tên loại phòng'
                    value={name}
                  />
                </div>
              </div>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-secondary'
                data-dismiss='modal'
              >
                Thoát
              </button>
              <button type='button' class='btn btn-primary'>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}
