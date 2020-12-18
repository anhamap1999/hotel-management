import React, { useEffect, useState } from 'react';
import HomeScreen from '../../../page/homeScreen';
import moment from 'moment';

import CreateCustomerType from './CreateCustomerType';
import { customerTypeApis } from '../../../apis/customerType.api';
import sweetAlert from 'sweetalert';
import { Link } from 'react-router-dom';
export default function Listcustomertype() {
  const [customerTypes, setCustomerTypes] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const user = JSON.parse(localStorage.getItem('app-user'));

  const [reload, setReload] = useState(false);
  let isReload = false;

  useEffect(() => {
    customerTypeApis.getCustomerTypes().then((res) => setCustomerTypes(res));
  }, []);

  useEffect(() => {
    customerTypeApis.getCustomerTypes().then((res) => setCustomerTypes(res));
  }, [reload]);

  useEffect(() => {
    customerTypeApis.getCustomerTypes().then((res) => setCustomerTypes(res));
  }, [isReload]);

  const onEditType = (index) => {
    setId(customerTypes[index]._id);
    setName(customerTypes[index].name);
  };

  const onInput = (key, value) => {
    if (key.includes('price')) {
      if (value && !parseInt(value)) {
        return;
      }
      // setPrice(value ? parseInt(value) : value);
    } else {
      setName(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
    };
    customerTypeApis.createOrUpdateCustomerType(id, data).then((res) => {
      if (res) {
        setReload(!reload);
      }
    });
  };

  const onConfirm = (id) => {
    customerTypeApis.deleteCustomerType(id).then((res) => {
      if (res) {
        setReload(!reload);
      }
    });
  };

  const onDelete = (id) => {
    sweetAlert({
      title: 'Bạn chắc chắn muốn xóa loại khách hàng?',
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
    customerTypeApis.getCustomerTypes().then((res) => setCustomerTypes(res));
  };

  const dataRender = customerTypes
    ? customerTypes.map((type, index) => {
        return (
          <tr>
            <th scope='row'>{index + 1}</th>
            <td>{type.name}</td>
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
    : customerTypes;
  return (
    <HomeScreen>
      <div className='listroom '>
        <h1 className='text-center'>Danh sách loại khách hàng</h1>
        <div className='listroom-table'>
          <table className='table table-sm'>
            <thead>
              <tr>
                <th scope='col'>STT</th>
                <th scope='col'>Tên Loại </th>
                <th scope='col'>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>{dataRender}</tbody>
          </table>
        </div>
        {user.isAdmin ? (<CreateCustomerType reloadData={reloadData} />) : null}
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
                  Sửa Loại khách
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
                  <label for={id ? id + 'name' : 'name'}>Tên Loại khách</label>
                  <div>
                    <input
                      type='text'
                      className='form-control'
                      id={id ? id + 'name' : 'name'}
                      placeholder='Nhập tên loại khách'
                      value={name}
                      onChange={(event) => onInput('name', event.target.value)}
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
        <div className='listroom-button'>
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
