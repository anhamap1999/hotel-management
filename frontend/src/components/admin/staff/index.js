import React, { useEffect, useState } from 'react';
import HomeScreen from '../../../page/homeScreen';

import { Link } from 'react-router-dom';
import { userApis } from '../../../apis/user.api';
import sweetAlert from 'sweetalert';
import moment from 'moment';
import './style.css';

export default function Listroom() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const [reload, setReload] = useState(false);

  const statusDefined = {
    active: 'Hoạt động',
    disabled: 'Nghỉ việc',
  };

  const fetchStaff = () => {
    setIsFetching(true);
    userApis.getStaff().then((res) => {
      if (res) {
        setData(res);
      }
      setIsFetching(false);
    });
  };
  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    fetchStaff();
  }, [reload]);

  const onEditStaff = (status, id) => {
    sweetAlert({
      title: 'Bạn chắc chắn muốn cập nhật trạng thái của nhân viên?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        onConfirm(id, status === 'active' ? 'disabled' : 'active');
      }
    });
  };

  const onDeleteStaff = (id) => {
    sweetAlert({
      title: 'Bạn chắc chắn muốn xóa nhân viên?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        onConfirm(id);
      }
    });
  };

  const onConfirm = (id, status) => {
    setIsFetching(true);
    if (status) {
      userApis.updateStatusStaff(id, status).then((res) => {
        if (res) {
          setReload(!reload);
        }
        setIsFetching(false);
      });
    } else {
      userApis.deleteStaff(id).then((res) => {
        if (res) {
          setReload(!reload);
        }
        setIsFetching(false);
      });
    }
  };

  const dataRender = data
    ? data.map((staff, index) => {
        return (
          <tr key={staff._id}>
            <th scope='row'>{index + 1}</th>
            <td>{staff.full_name}</td>
            <td>{staff.gender}</td>
            <td>{moment(staff.birthday).format('DD/MM/YYYY')}</td>
            <td>
              <div className={`label label-${staff.status}`}>
                {statusDefined[staff.status]}
              </div>
            </td>
            <td>
              <span
                // className='action-btns'
                data-toggle='modal'
                data-target='#editModal'
                // style={{ margin: '5px' }}
              >
                <span
                  className='custom-control custom-switch m-0'
                  title={staff.status === 'active' ? 'Vô hiệu' : 'Kích hoat'}
                >
                  <input
                    className='custom-control-input custom-control-input-success'
                    id='customSwitch4'
                    type='checkbox'
                    checked={staff.status === 'active'}
                    onChange={() => onEditStaff(staff.status, staff._id)}
                  />
                  <label
                    className='custom-control-label font-italic'
                    htmlFor='customSwitch4'
                  />
                </span>
                {/* </div> */}
                {/* </div> */}
              </span>
              <span style={{ margin: '5px' }}>
                <i
                  className='fas fa-trash'
                  style={{ cursor: 'pointer' }}
                  onClick={() => onDeleteStaff(staff._id)}
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
        <h1 className='text-center'>Danh sách nhân viên</h1>
        <div className='listroom-table'>
          <table className='table table-sm'>
            <thead>
              <tr>
                <th scope='col'>STT</th>
                <th scope='col'>Họ Tên</th>
                <th scope='col'>Giới tính</th>
                <th scope='col'>Ngày sinh</th>
                <th scope='col'>Trạng thái</th>
                <th scope='col'></th>
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
