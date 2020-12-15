import React, { useEffect, useState } from 'react';
import HomeScreen from '../../../page/homeScreen';

import CreateCustomer from './createCustomer';
import { Link } from 'react-router-dom';
import { customerApis } from '../../../apis/customer.api';
import { customerTypeApis } from '../../../apis/customerType.api';
import sweetAlert from 'sweetalert';

export default function Listcustomer() {
  const [data, setData] = useState(null);
  const [customerTypes, setCustomerTypes] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [customerTypeId, setCustomerTypeId] = useState('');
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const [address, setAddress] = useState('');
  const [id_number, setNumber] = useState('');

  useEffect(() => {
    customerApis.getCustomers().then((res) => {
      if (res) setData(res);
    });
    customerTypeApis.getCustomerTypes().then((res) => {
      if (res) {
        setCustomerTypes(res);
        setCustomerTypeId(res[0]._id);
      }
    });
  }, []);

  useEffect(() => {
    customerApis.getCustomers().then((res) => {
      if (res) setData(res);
    });
  }, [reload]);

  const onEditCustomer = (index) => {
    setId(data[index]._id);
    setName(data[index].name);
    setCustomerTypeId(data[index].customer_type_id);
  };

  const onDeleteCustomer = (id) => {
    sweetAlert({
      title: 'Bạn chắc chắn muốn xóa ?',
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
    customerApis.deleteCustomer(id).then((res) => {
      if (res) {
        setReload(!reload);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      address,
      customer_type_id: customerTypeId,
    };
    customerApis.createOrUpdateCustomer(id, data).then((res) => {
      if (res) {
        setReload(!reload);
      }
    });
  };

  const dataRender = data
    ? data.map((customer, index) => {
        const type = customerTypes.find(
          (item) => item._id === customer.customer_type_id
        );
        return (
          <tr key={customer._id}>
            <th scope='row'>{index + 1}</th>
            <td>{customer.name}</td>
            <td>{customer.address}</td>
            <td>{customer.id_number}</td>
            <td>
              <span
                //className='action-btns'
                data-toggle='modal'
                data-target='#editModal'
                style={{ margin: '5px' }}
              >
                <i
                  className='fas fa-edit'
                  style={{ cursor: 'pointer' }}
                  onClick={() => onEditCustomer(index)}
                />
              </span>
              <span style={{ margin: '5px' }}>
                <i
                  className='fas fa-trash'
                  style={{ cursor: 'pointer' }}
                  onClick={() => onDeleteCustomer(customer._id)}
                />
              </span>
            </td>
          </tr>
        );
      })
    : null;
  return (
    <HomeScreen>
      <div className='listroom '>
        <h1 className='text-center'>Danh sách khách hàng</h1>
        <div className='listroom-table'>
          <table className='table table-sm'>
            <thead>
              <tr>
                <th scope='col'>STT</th>
                <th scope='col'>Tên khách hàng</th>
                <th scope='col'>Địa chỉ</th>
                <th scope='col'>Số ĐT</th>
                <th scope='col'>Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>{dataRender}</tbody>
          </table>
        </div>
        <div className='listroom-button'>
          <CreateCustomer reload={() => setReload(!reload)} />

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
                      Sưa thông tin khách hàng
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
                        <label htmlFor='namecustomer'>Tên khách hàng</label>
                        <input
                          type='text'
                          className='form-control'
                          id='namecustomer'
                          placeholder='Nhập tên khách'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='customertype'>Loại khách</label>

                        <select
                          className='form-control'
                          id='customertype'
                          value={customerTypeId}
                          onChange={(e) => {
                            const { value } = e.target;
                            setCustomerTypeId(value);
                          }}
                        >
                          {customerTypes &&
                            customerTypes.map((type) => (
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
                        <label htmlFor='diachi'>Địa chỉ</label>
                        <input
                          type='text'
                          className='form-control'
                          id='diachi'
                          placeholder='Nhập địa chỉ'
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='sodt'>Số ĐT</label>
                        <input
                          type='text'
                          className='form-control'
                          id='sodt'
                          placeholder='Nhấp số điện thoại'
                          value={id_number}
                          onChange={(e) => setNumber(e.target.value)}
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
