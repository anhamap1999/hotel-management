import React, { useState, useEffect } from 'react';
import { customerTypeApis } from './../../../apis/customerType.api';
import { customerApis } from './../../../apis/customer.api';

export default function CreateCustomer(props) {
  const [customerTypes, setCustomerTypes] = useState([]);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [customertypeid, setCustomertypeid] = useState('');
  const [address, setAddress] = useState('');
  const [id_number, setNumber] = useState('');
  useEffect(() => {
    customerTypeApis.getCustomerTypes().then((res) => {
      setCustomerTypes(res);
      setCustomertypeid(res[0]._id);
    });
  }, []);

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    const customer = {
      name,
      address,
      id_number,
      customer_type_id: customertypeid,
    };

    customerApis
      .createOrUpdateCustomer(null, customer)
      .then((data) => {
        if (props.reload) {
          props.reload();
        }
        console.log(data);
        setError('');
        setAddress('');
        setName('');
        setCustomertypeid('');
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
        Thêm khách hàng
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
                Thêm khách hàng mới
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
            <form onSubmit={handleCreateCustomer}>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='namecustomer'>Tên khách hàng</label>
                  <input
                    type='text'
                    className='form-control'
                    id='namecustomer'
                    placeholder='Nhập tên khách hàng'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='customertype'>Loại khách</label>

                  <select
                    className='form-control'
                    id='customertype'
                    value={customertypeid}
                    onChange={(e) => {
                      const { value } = e.target;
                      setCustomertypeid(value);
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
                  Lưu khách hành
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
