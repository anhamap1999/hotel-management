import React, { useState, useEffect } from 'react';
import { roomTypeApis } from './../../../apis/roomType.api';
import { roomApis } from './../../../apis/room.api';

export default function CreateRoom(props) {
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [roomtypeid, setRoomtypeid] = useState('');
  const [note, setNote] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    setIsFetching(true);
    roomTypeApis.getRoomTypes().then((res) => {
      if (res) {
        setRoomTypes(res);
        setRoomtypeid(res[0]._id);
      }
      setIsFetching(false);
    });
  }, []);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const room = { name, note, room_type_id: roomtypeid };
    setIsFetching(true);
    roomApis
      .createOrUpdateRoom(null, room)
      .then((data) => {
        if (props.reload) {
          props.reload();
        }
        if (data) {
          console.log(data);
          setError('');
          setNote('');
          setName('');
          setRoomtypeid('');
        }
        setIsFetching(false);
      })
      .catch((err) => {
        setError('Đã xảy ra lỗi trong khi thực thi!');
      });
  };
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
            {isFetching ? <div className='spinner-border'></div> : null}
            <form onSubmit={handleCreateRoom}>
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
                    value={roomtypeid}
                    onChange={(e) => {
                      const { value } = e.target;
                      setRoomtypeid(value);
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
                  Lưu phòng
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
  );
}
