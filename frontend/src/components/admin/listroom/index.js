import React, { useEffect, useState } from 'react';
import HomeScreen from '../../../page/homeScreen';

import './styles.css';
import CreateRoom from './createRoom';
import { Link } from 'react-router-dom';
import { roomApis } from '../../../apis/room.api';
import { roomTypeApis } from '../../../apis/roomType.api';
import sweetAlert from 'sweetalert';

export default function Listroom() {
  const [data, setData] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [roomTypeId, setRoomTypeId] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState(null);

  const [reload, setReload] = useState(false);

  const statusDefined = {
    available: 'Còn trống',
    busy: 'Đang cho thuê',
    unavailable: 'Đang sửa chữa',
    reserved: 'Đã đặt trước',
  };
  useEffect(() => {
    roomApis.getRooms().then((res) => {
      if (res) setData(res);
    });
    roomTypeApis.getRoomTypes().then((res) => {
      if (res) {
        setRoomTypes(res);
        setRoomTypeId(res[0]._id);
      }
    });
  }, []);

  useEffect(() => {
    roomApis.getRooms().then((res) => {
      if (res) setData(res);
    });
  }, [reload]);

  const onEditRoom = (index) => {
    setId(data[index]._id);
    setName(data[index].name);
    setRoomTypeId(data[index].room_type_id);
    setNote(data[index].note);
  };

  const onDeleteRoom = (id) => {
    sweetAlert({
      title: 'Bạn chắc chắn muốn xóa phòng?',
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

  const onConfirm = (id) => {
    roomApis.deleteRoom(id).then((res) => {
      if (res) {
        setReload(!reload);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      note,
      room_type_id: roomTypeId
    };
    roomApis.createOrUpdateRoom(id, data).then((res) => {
      if (res) {
        setReload(!reload);
      }
    });
  };

  const dataRender = data
    ? data.map((room, index) => {
        const type = roomTypes.find((item) => item._id === room.room_type_id);
        return (
          <tr key={room._id}>
            <th scope='row'>{index + 1}</th>
            <td>{room.name}</td>
            <td>{type ? type.name : ''}</td>
            <td>{type ? type.price : ''}</td>
            <td>{statusDefined[room.status]}</td>
            <td>{room.note}</td>
            <td>
              <span
                // className='action-btns'
                data-toggle='modal'
                data-target='#editModal'
                style={{ margin: '5px' }}
              >
                <i
                  className='fas fa-edit'
                  style={{ cursor: 'pointer' }}
                  onClick={() => onEditRoom(index)}
                />
              </span>
              <span style={{ margin: '5px' }}>
                <i
                  className='fas fa-trash'
                  style={{ cursor: 'pointer' }}
                  onClick={() => onDeleteRoom(room._id)}
                />
              </span>
            </td>
          </tr>
        );
      })
    : data;
  return (
    <HomeScreen>
      <div className='listroom '>
        <h1 className='text-center'>Danh sách phòng</h1>
        <div className='listroom-table'>
          <table className='table table-sm'>
            <thead>
              <tr>
                <th scope='col'>STT</th>
                <th scope='col'>Số Phòng</th>
                <th scope='col'>Loai Phòng</th>
                <th scope='col'>Đơn Giá</th>
                <th scope='col'>Trạng thái</th>
                <th scope='col'>Ghi Chú</th>
                <th scope='col'>Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>{dataRender}</tbody>
          </table>
        </div>
        <div className='listroom-button'>
          <CreateRoom reload={() => setReload(!reload)}/>

          <span>
            <div
              className='modal fade'
              id='editModal'
              tabIndex='-1'
              role='dialog'
              aria-labelledby='editModal'
              aria-hidden='true'
            >
              <div
                className='modal-dialog modal-dialog-centered'
                role='document'
              >
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h5 className='modal-title' id='exampleModalCenterTitle'>
                      Sửa Phòng
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
                  <form onSubmit={handleSubmit}>
                    <div className='modal-body'>
                      <div className='form-group'>
                        <label htmlFor='nameroom'>Tên Phòng</label>
                        <input
                          type='text'
                          className='form-control'
                          id='nameroom'
                          placeholder='Nhập tên phòng'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='roomtype'>Loại phòng</label>

                        <select
                          className='form-control'
                          id='roomtype'
                          value={roomTypeId}
                          onChange={(e) => {
                            const { value } = e.target;
                            setRoomTypeId(value);
                          }}
                        >
                          {roomTypes &&
                            roomTypes.map((type) => (
                              <option
                                style={{ textTransform: 'uppercase' }}
                                key={type._id}
                                value={type._id}
                              >
                                {type.name.toUpperCase()}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className='form-group'>
                        <label htmlFor='noteroom'>Ghi chú</label>
                        <input
                          type='text'
                          className='form-control'
                          id='noteroom'
                          value={note}
                          placeholder='Nhập ghi chú'
                          onChange={(e) => setNote(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='modal-footer'>
                      {error && (
                        <div
                          className='err'
                          style={{
                            textAlign: 'center',
                            color: 'red',
                            fontWeight: 500,
                            display: 'block',
                          }}
                        >
                          {error}
                        </div>
                      )}
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
            </div>
          </span>
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
