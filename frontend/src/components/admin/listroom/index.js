import React, { useEffect, useState } from 'react';
import HomeScreen from '../../../page/homeScreen';

import './styles.css';
import CreateRoom from './createRoom';
import { Link } from 'react-router-dom';
import { roomApis } from '../../../apis/room.api';
import { roomTypeApis } from '../../../apis/roomType.api';
export default function Listroom() {
  const [data, setData] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  useEffect(() => {
    roomApis.getRooms().then((res) => setData(res));
    roomTypeApis.getRoomTypes().then((res) => setRoomTypes(res));
  }, []);

  const dataRender = data
    ? data.map((room, index) => {
        const type = roomTypes.find((item) => item._id === room.room_type_id);
        return (
          <tr>
            <th scope='row'>{index + 1}</th>
            <td>{room.name}</td>
            <td>{type ? type.name : ''}</td>
            <td>{type ? type.price : ''}</td>
            <td>{room.note}</td>
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
                <th scope='col'>Ghi Chú</th>
              </tr>
            </thead>
            <tbody>{dataRender}</tbody>
          </table>
        </div>
        <div className='listroom-button'>
          <CreateRoom />
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
