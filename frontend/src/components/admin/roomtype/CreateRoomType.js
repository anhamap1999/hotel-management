import React, { useEffect, useState } from 'react';
import { roomTypeApis } from '../../../apis/roomType.api';
export default function CreateRoomType(props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const onInput = (key, value) => {
    // useEffect(() => {
    //   roomTypeApis.getRoomTypes().then((res) => setRoomTypes(res));
    // }, [isReload])

    if (key.includes('price')) {
      if (value && !parseInt(value)) {
        return;
      }
      setPrice(value ? parseInt(value) : value);
    } else {
      setName(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      price,
    };
    console.log('SUBMIT');
    setIsFetching(true);
    roomTypeApis.createOrUpdateRoomType(null, data).then((res) => {
      if (res) {
        // setIsReload(!isReload);
        if (props.reloadData) {
          props.reloadData();
        }
        // props.isReload = !props.isReload;
      }
      setIsFetching(false);
    });
  };

  return (
    <span>
      <button
        type='button'
        class='btn btn-primary'
        data-toggle='modal'
        data-target='#exampleModalCenter'
      >
        Tạo Loại Phòng
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
          <form class='modal-content' onSubmit={handleSubmit}>
            <div class='modal-header'>
              <h5 class='modal-title' id='exampleModalCenterTitle'>
                Tạo Loại Phòng Mới
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
            {isFetching ? <div className='spinner-border'></div> : null}
            <div class='modal-body'>
              <div class='form-group'>
                <label for='name'>Tên Loại Phòng</label>
                <div>
                  <input
                    type='text'
                    class='form-control'
                    id='name'
                    placeholder='Nhập tên loại phòng'
                    value={name}
                    onChange={(event) => onInput('name', event.target.value)}
                  />
                </div>
              </div>
              <div class='form-group'>
                <label for='price'>Đơn giá</label>
                <div>
                  <input
                    type='text'
                    class='form-control'
                    id='price'
                    placeholder='Nhập đơn giá'
                    value={price}
                    onChange={(event) => onInput('price', event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div class='modal-footer'>
              <button type='submit' className='btn btn-primary'>
                Tạo
              </button>
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
    </span>
  );
}
