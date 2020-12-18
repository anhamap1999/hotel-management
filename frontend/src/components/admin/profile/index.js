import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeScreen from '../../../page/homeScreen';
import { userApis } from './../../../apis/user.api';
import moment from 'moment';
// import { customerTypeApis } from '../../../apis/customerType.api';

export default function RuleScreen() {
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [birthday, setBirthday] = useState('');

  const fetchUser = () => {
    setIsFetching(true);
    userApis.getInfo().then((res) => {
      if (res) {
        setUser(res);
        setName(res.full_name);
        setGender(res.gender);
        setBirthday(moment(res.birthday).format('YYYY-MM-DD'));
      }
      setIsFetching(false);
    });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchUser();
  }, [reload]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      full_name: name,
      gender,
      birthday,
    };
    setIsFetching(true);
    userApis.updateInfo(data).then((res) => {
      if (res) {
        setReload(!reload);
      }
      setIsFetching(false);
    });
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password.length) {
      setError('Mật khẩu không được để trống');
    } else if (!newPassword.length) {
      setError('Mật khẩu mới không được để trống');
    } else if (newPassword !== confirmNewPassword) {
      setError('Mật khẩu mới không trùng khớp');
    } else {
      setError(null);
      const data = {
        password,
        new_password: newPassword,
        confirm_new_password: confirmNewPassword,
      };
      setIsFetching(true);
      userApis.updatePassword(data).then((res) => {
        if (res) {
          setReload(!reload);
        }
        setIsFetching(false);
      });
    }
  };

  return (
    <HomeScreen>
      <div className='rule container'>
        <h1 className='text-center'>Thông tin cá nhân</h1>
        <div className='rule-body'>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <p className='col-sm-2 font-weight-bold '>Tên đăng nhập</p>
              <div className='form-row col-10'>
                {!isFetching ? (
                  <div className='form-group col-md-4'>
                    <input
                      type='text'
                      className='form-control'
                      //   id='newQuantityValue'
                      //   placeholder='Số khách tối đa'
                      value={user && user.username}
                      disabled
                    />
                  </div>
                ) : (
                  <div className='spinner-border'></div>
                )}
              </div>
            </div>

            <div className='row'>
              <p className='col-sm-2 font-weight-bold '>Họ tên</p>
              <div className='form-row col-10'>
                {!isFetching ? (
                  <div className='form-group col-md-4'>
                    <input
                      type='text'
                      className='form-control'
                      id='full_name'
                      placeholder='Họ tên'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className='spinner-border'></div>
                )}
              </div>
            </div>

            <div className='row'>
              <p className='col-sm-2 font-weight-bold '>Giới tính</p>
              <div className='form-row col-10' style={{ margin: 'auto' }}>
                {!isFetching ? (
                  <div className='form-group col-md-4'>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value='male'>Nam</option>
                      <option value='female'>Nữ</option>
                      <option value='other'>Khác</option>
                    </select>
                  </div>
                ) : (
                  <div className='spinner-border'></div>
                )}
              </div>
            </div>

            <div className='row'>
              <p className='col-sm-2 font-weight-bold '>Ngày sinh</p>
              <div className='form-row col-10' style={{ margin: 'auto' }}>
                {!isFetching ? (
                  <div className='form-group col-md-4'>
                    <input
                      type='date'
                      className='form-control'
                      id='birthday'
                      placeholder='Ngày sinh'
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className='spinner-border'></div>
                )}
              </div>
            </div>

            <div className='row'>
              <p className='col-sm-2 font-weight-bold '>Vai trò</p>
              <div className='form-row col-10'>
                {!isFetching ? (
                  <div className='form-group col-md-4'>
                    <input
                      type='text'
                      className='form-control'
                      value={
                        user &&
                        (user.role && user.role === 'staff'
                          ? 'Nhân viên'
                          : 'Quản trị viên')
                      }
                      disabled
                    />
                  </div>
                ) : (
                  <div className='spinner-border'></div>
                )}
              </div>
            </div>

            <div className='listroom-button text-center'>
              <button type='submit' className='btn btn-primary'>
                Lưu
              </button>

              <button
                type='button'
                className='btn btn-warning'
                data-toggle='modal'
                data-target='#editModal'
              >
                Đổi mật khẩu
              </button>

              <Link to='/'>
                <button type='button' className='btn btn-danger'>
                  Thoát
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className='listroom-button'>
        <span>
          <div
            className='modal fade'
            id='editModal'
            tabIndex='-1'
            role='dialog'
            aria-labelledby='editModal'
            aria-hidden='true'
          >
            <div className='modal-dialog modal-dialog-centered' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalCenterTitle'>
                    Đổi mật khẩu
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
                <form onSubmit={handleChangePasswordSubmit}>
                  <div className='modal-body'>
                    <div className='form-group'>
                      <label htmlFor='password'>Mật khẩu cũ</label>
                      <input
                        type='password'
                        className='form-control'
                        id='password'
                        placeholder='Nhập mật khẩu cũ'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='new_password'>Mật khẩu mới</label>
                      <input
                        type='password'
                        className='form-control'
                        id='new_password'
                        placeholder='Nhập mật khẩu mới'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='confirm_new_password'>
                        Xác nhận mật khẩu mới
                      </label>
                      <input
                        type='password'
                        className='form-control'
                        id='confirm_new_password'
                        placeholder='Nhập lại mật khẩu mới'
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
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
      </div>
    </HomeScreen>
  );
}
