import React, { useEffect, useState } from 'react';
import { roomApis } from '../../../apis/room.api';
import { roomTypeApis } from '../../../apis/roomType.api';
import HomeScreen from '../../../page/homeScreen';
import { Link } from 'react-router-dom';
export default function SearchScreen() {
  const [data, setData] = useState(null);
  const [dataRender, setDataRender] = useState(null);
  const [status, setStatus] = useState(null);
  const [type, setType] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [name, setName] = useState('');
  const statusDefined = {
    available: 'Còn trống',
    busy: 'Đang cho thuê',
    unavailable: 'Đang sửa chữa',
    reserved: 'Đã đặt trước',
  };
  useEffect(() => {
    roomApis.getRooms().then((res) => {
      setData(res);
      setDataRender(res);
    });
    roomTypeApis.getRoomTypes().then((res) => setRoomTypes(res));
  }, []);

  const reset = () => {
    if (data) {
      setDataRender(data);
    }
    setStatus(null);
    setType(null);
    setName(null);
    const typeDropdown = document.getElementById('type');
    typeDropdown.selectedIndex = '';
    const statusDropdown = document.getElementById('status');
    statusDropdown.selectedIndex = '';
    const nameInput = document.getElementById('name');
    nameInput.value = '';
  };
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
                  id='name'
                  placeholder='Số Phòng'
                  onChange={(e) => {
                    const { value } = e.target;
                    const filteredData = data.filter(
                      (room) =>
                        room.name.toLowerCase().includes(value.toLowerCase()) &&
                        ((status && room.status === status) || !status) &&
                        ((type && room.room_type_id === type) || !type)
                    );
                    setName(value ? value : null);
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
                  id='type'
                  onChange={(e) => {
                    const { value } = e.target;
                    const filteredData = value
                      ? data.filter(
                          (room) =>
                            room.room_type_id === value &&
                            ((status && room.status === status) || !status) &&
                            ((name &&
                              room.name
                                .toLowerCase()
                                .includes(name.toLowerCase())) ||
                              !name)
                        )
                      : data.filter(
                          (room) =>
                            ((status && room.status === status) || !status) &&
                            ((name &&
                              room.name
                                .toLowerCase()
                                .includes(name.toLowerCase())) ||
                              !name)
                        );
                    setType(value ? value : null);
                    setDataRender(filteredData);
                  }}
                >
                  {[
                    <option selected key={''} value={''}>
                      Lựa chọn ...
                    </option>,
                  ].concat(
                    roomTypes.map((type) => (
                      <option
                        style={{ textTransform: 'uppercase' }}
                        key={type._id}
                        value={type._id}
                      >
                        {type.name.toUpperCase()}
                      </option>
                    ))
                  )}
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
                  id='status'
                  onChange={(e) => {
                    const { value } = e.target;
                    const filteredData = value
                      ? data.filter(
                          (room) =>
                            room.status === value &&
                            ((type && room.room_type_id === type) || !type) &&
                            ((name &&
                              room.name
                                .toLowerCase()
                                .includes(name.toLowerCase())) ||
                              !name)
                        )
                      : data.filter(
                          (room) =>
                            ((type && room.room_type_id === type) || !type) &&
                            ((name &&
                              room.name
                                .toLowerCase()
                                .includes(name.toLowerCase())) ||
                              !name)
                        );
                    setStatus(value ? value : null);
                    setDataRender(filteredData);
                  }}
                >
                  {data &&
                    [
                      <option selected key={''} value={''}>
                        Lựa chọn ...
                      </option>,
                    ].concat(
                      data
                        .map((room) => room.status)
                        .filter((x, i, a) => a.indexOf(x) === i)
                        .map((status) => (
                          <option key={status} value={status}>
                            {statusDefined[status]}
                          </option>
                        ))
                    )}
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className='listroom-button'>
          <button type='button' className='btn btn-warning' onClick={reset}>
            Đặt lại
          </button>
          <Link to='/'>
            <button type='button' className='btn btn-danger'>
              Thoát
            </button>
          </Link>
        </div>
        <div className='listroom-table'>
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
                      <td>
                        <div className={`label label-${room.status}`}>
                          {statusDefined[room.status]}
                        </div>
                      </td>
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
