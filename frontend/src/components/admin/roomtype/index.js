import React, { useEffect, useState } from 'react';
import HomeScreen from '../../../page/homeScreen';
import moment from 'moment';

import './styles.css';
import CreateRoomType from './CreateRoomType';
import { roomTypeApis } from '../../../apis/roomType.api';
import sweetAlert from 'sweetalert';
import { Link } from 'react-router-dom';
export default function ListRoomType() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [reload, setReload] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const user = JSON.parse(localStorage.getItem('app-user'));
  let isReload = false;

  useEffect(() => {
    setIsFetching(true);
    roomTypeApis.getRoomTypes().then((res) => {
      if (res) setRoomTypes(res);
      setIsFetching(false);
    });
  }, []);

  useEffect(() => {
    setIsFetching(true);
    roomTypeApis.getRoomTypes().then((res) => {
      if (res) setRoomTypes(res);
      setIsFetching(false);
    });
  }, [reload]);

  useEffect(() => {
    setIsFetching(true);
    roomTypeApis.getRoomTypes().then((res) => {
      if (res) setRoomTypes(res);
      setIsFetching(false);
    });
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
    setIsFetching(true);
    roomTypeApis.createOrUpdateRoomType(id, data).then((res) => {
      if (res) {
        setReload(!reload);
      }
      setIsFetching(false);
    });
  };

  const onConfirm = (id) => {
    setIsFetching(true);
    roomTypeApis.deleteRoomType(id).then((res) => {
      if (res) {
        setReload(!reload);
      }
      setIsFetching(false);
    });
  };

  const onDelete = (id) => {
    sweetAlert({
      title: 'Bạn chắc chắn muốn xóa loại phòng?',
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        onConfirm(id);
      }
    });
  };

  const reloadData = () => {
    setIsFetching(true);
    roomTypeApis.getRoomTypes().then((res) => {
      if (res) setRoomTypes(res);
      setIsFetching(false);
    });
  };

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
            {user.isAdmin ? (
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
            ) : null}
            {user.isAdmin ? (
            <span style={{ margin: '5px' }}>
              <i
                className='fas fa-trash'
                style={{ cursor: 'pointer' }}
                onClick={() => onDelete(type._id)}
              />
            </span>
            ) : null}
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
            <tbody>
              {!isFetching ? (
                dataRender
              ) : (
                <div className='spinner-border'></div>
              )}
            </tbody>
          </table>
        </div>
        <div className='listroom-button'>
        {user.isAdmin ? (<CreateRoomType reloadData={reloadData} />) : null}
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
              {isFetching ? <div className='spinner-border'></div> : null}
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
                <button type='submit' className='btn btn-primary'>
                  Cập nhật
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
        
          <Link to='/'>
            <button type='button' className='btn btn-danger'>
              Thoát
            </button>
          </Link>
        </div>
      </div>
    </HomeScreen>
  );
}
