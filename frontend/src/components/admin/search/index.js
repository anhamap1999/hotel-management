import React, { useEffect, useState } from 'react';
import { roomApis } from '../../../apis/room.api';
import { roomTypeApis } from '../../../apis/roomType.api';
import HomeScreen from '../../../page/homeScreen';
export default function SearchScreen() {
  const [data, setData] = useState(null);
  const [dataRender, setDataRender] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  useEffect(() => {
    roomApis.getRooms().then((res) => {
      setData(res);
      setDataRender(res);
    });
    roomTypeApis.getRoomTypes().then((res) => setRoomTypes(res));
  }, []);
  return (
    <HomeScreen>
      <div className='listroom '>
        <h1 className='text-center'>Tra Cứu phòng</h1>
        <div className='form-width'>
          <form>
            <div className='form-group row'>
              <label className='col-sm-2 col-form-label'>Số Phòng</label>
              <div className='col-sm-10'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Số Phòng'
                  onChange={(e) => {
                    const { value } = e.target;
                    const filteredData = data.filter((room) =>
                      room.name.includes(value)
                    );
                    setDataRender(filteredData);
                  }}
                />
              </div>
            </div>
            <div className='form-group row'>
              <label
                htmlFor='exampleFormControlSelect1'
                className='col-sm-2 col-form-label'
              >
                Loại Phòng
              </label>
              <div className='col-sm-10'>
                <select
                  className='form-control custom-form'
                  id='exampleFormControlSelect1'
                  onChange={(e) => {
                    const { value } = e.target;
                    const filteredData = data.filter(
                      (room) => room.room_type_id === value
                    );
                    setDataRender(filteredData);
                  }}
                >
                  {roomTypes.map((type) => (
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
            </div>
            <div className='form-group row'>
              <label
                htmlFor='exampleFormControlSelect1'
                className='col-sm-2 col-form-label'
              >
                Tình Trạng Phòng
              </label>
              <div className='col-sm-10'>
                <select
                  className='form-control custom-form'
                  id='exampleFormControlSelect1'
                  onChange={(e) => {
                    const { value } = e.target;
                    const filteredData = data.filter(
                      (room) => room.status === value
                    );
                    setDataRender(filteredData);
                  }}
                >
                  {data &&
                    data
                      .map((room) => room.status)
                      .filter((x, i, a) => a.indexOf(x) === i)
                      .map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className='listroom-button'>
          <button type='button' className='btn btn-danger'>
            Tra cứu
          </button>
        </div>
        <div className='listrom-table'>
          <table className='table table-sm'>
            <thead>
              <tr>
                <th scope='col'>STT</th>
                <th scope='col'>Số Phòng</th>
                <th scope='col'>Loai Phòng</th>
                <th scope='col'>Đơn Giá</th>
                <th scope='col'>Tình Trạng</th>
              </tr>
            </thead>
            <tbody>
              {dataRender &&
                dataRender.map((room, index) => {
                  const getRoomType = roomTypes.find(
                    (type) => type._id === room.room_type_id
                  );
                  return (
                    <tr key={room._id}>
                      <th scope='row'>{index + 1}</th>
                      <td>{room.name}</td>
                      <td style={{ textTransform: 'uppercase' }}>
                        {getRoomType && getRoomType.name}
                      </td>
                      <td>{getRoomType && getRoomType.price}</td>
                      <td>{room.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </HomeScreen>
  );
}
