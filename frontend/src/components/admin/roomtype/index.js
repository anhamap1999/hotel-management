import React, { useEffect, useState } from 'react';
import HomeScreen from '../../../page/homeScreen';
import moment from 'moment';

import './styles.css';
import CreateRoomType from './CreateRoomType';
import { roomTypeApis } from '../../../apis/roomType.api';
import sweetAlert from 'sweetalert';
export default function ListRoomType() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [reload, setReload] = useState(false);
  let isReload = false;

  useEffect(() => {
    roomTypeApis.getRoomTypes().then((res) => setRoomTypes(res));
  }, []);

  useEffect(() => {
    roomTypeApis.getRoomTypes().then((res) => setRoomTypes(res));
  }, [reload]);

  useEffect(() => {
    roomTypeApis.getRoomTypes().then((res) => setRoomTypes(res));
  }, [isReload]);

  const onEditType = (index) => {
    setId(roomTypes[index]._id);
    setName(roomTypes[index].name);
    setPrice(roomTypes[index].price);
  };

  const onInput = (key, value) => {
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
    roomTypeApis.createOrUpdateRoomType(id, data).then((res) => {
      if (res) {
        setReload(!reload);
      }
    });
  };

  const onConfirm = (id) => {
    roomTypeApis.deleteRoomType(id).then((res) => {
      if (res) {
        setReload(!reload);
      }
    });
  }

  const onDelete = (id) => {    
    sweetAlert({
      title: "Bạn chắc chắn muốn xóa loại phòng?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        onConfirm(id);
      }
    });
  }

  const reloadData = () => {
    roomTypeApis.getRoomTypes().then((res) => setRoomTypes(res));
  }

  const dataRender = roomTypes
    ? roomTypes.map((type, index) => {
        return (
          <tr>
            <th scope='row'>{index + 1}</th>
            <td>{type.name}</td>
            <td>{type ? type.price : ''}</td>
            <td>{moment(type.created_at).format('hh:mm DD/MM/yyyy')}</td>
            {/* <td className='action-btns'>
              <i className='fas fa-edit' onClick={() => onEditType(index)} style={{ cursor: 'pointer' }}/>
            </td> */}
            <span
              // className='action-btns'
              data-toggle='modal'
              data-target='#editModal'
              style={{ margin: '5px' }}
            >
              <i
                className='fas fa-edit'
                style={{ cursor: 'pointer' }}
                onClick={() => onEditType(index)}
              />
            </span>
            <span style={{ margin: '5px' }}>
              <i
                className='fas fa-trash'
                style={{ cursor: 'pointer' }}
                onClick={() => onDelete(type._id)}
              />
            </span>
            {/* <EditRoomType selectedType={type} /> */}
          </tr>
        );
      })
    : roomTypes;
  return (
    <HomeScreen>
      <div className='listroom '>
        <h1 className='text-center'>Danh sách loại phòng</h1>
        <div className='listroom-table'>
          <table className='table table-sm'>
            <thead>
              <tr>
                <th scope='col'>STT</th>
                <th scope='col'>Tên Loại Phòng</th>
                <th scope='col'>Đơn Giá</th>
                <th scope='col'>Ngày tạo</th>
                <th scope='col'>Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>{dataRender}</tbody>
          </table>
        </div>
        <CreateRoomType reloadData={reloadData}/>
        <div
          className='modal fade'
          id='editModal'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='editModalTitle'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-dialog-centered' role='document'>
            <form className='modal-content' onSubmit={handleSubmit}>
              <div className='modal-header'>
                <h5 className='modal-title' id='editModalTitle'>
                  Sửa Loại Phòng
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
                  <label for={id ? id + 'name' : 'name'}>Tên Loại Phòng</label>
                  <div>
                    <input
                      type='text'
                      className='form-control'
                      id={id ? id + 'name' : 'name'}
                      placeholder='Nhập tên loại phòng'
                      value={name}
                      onChange={(event) => onInput('name', event.target.value)}
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label for={id ? id + 'price' : 'price'}>Đơn giá</label>
                  <div>
                    <input
                      type='text'
                      className='form-control'
                      id={id ? id + 'price' : 'price'}
                      placeholder='Nhập đơn giá'
                      value={price}
                      onChange={(event) => onInput('price', event.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <input
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                  value='Thoát'
                />
                <input
                  type='submit'
                  className='btn btn-primary'
                  value='Cập nhật'
                />
              </div>
            </form>
          </div>
        </div>
        {/* <div className='listroom-button'>
          <button type='button' className='btn btn-dark'>
            Reset
          </button>
          <CreateRoom />
          <Link to='/'>
            <button type='button' className='btn btn-success'>
              Thoát
            </button>
          </Link>
        </div> */}
      </div>
    </HomeScreen>
  );
}
