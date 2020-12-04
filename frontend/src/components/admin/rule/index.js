import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeScreen from '../../../page/homeScreen';
import { configApis } from './../../../apis/config.api';
export default function RuleScreen() {
  const [configs, setConfigs] = useState([]);
  const fetchConfigs = async () => {
    const config = await configApis.getConfigs();
    console.log(config);
    setConfigs(config);
  };
  useEffect(() => {
    fetchConfigs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <HomeScreen>
      <div className='rule container'>
        <h1 className='text-center'>Thay đổi quy định</h1>
        <div className='rule-body'>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <p className='col-sm-2 font-weight-bold '>Giá phòng</p>
              <div className='form-row col-10'>
                <div className='form-group col-md-4'>
                  <label htmlFor='roomType'>Loại phòng</label>
                  <select id='roomType' className='form-control'>
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className='form-group col-md-3 oldPrice'>
                  <label htmlFor='oldPrice'>Giá cũ</label>
                  <input
                    type='number'
                    className='form-control'
                    id='oldPrice'
                    value='200000'
                    disabled
                  />
                </div>
                <div className='form-group col-md-4'>
                  <label htmlFor='newPrice'>Giá mới</label>
                  <input
                    type='text'
                    className='form-control'
                    id='newPrice'
                    placeholder='Giá mới'
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <p className='col-sm-2 font-weight-bold '>
                Số lượng khách tối đa
              </p>
              <div className='form-row col-10'>
                <div className='form-group col-md-4'>
                  <label htmlFor='roomType'>Loại phòng</label>
                  <select id='roomType' className='form-control'>
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className='form-group col-md-3'>
                  <label htmlFor='oldQuantityValue'>Giá trị cũ</label>
                  <input
                    type='text'
                    className='form-control'
                    id='oldQuantityValue'
                    value='2'
                    disabled
                  />
                </div>
                <div className='form-group col-md-4'>
                  <label htmlFor='newQuantityValue'>Giá trị mới</label>
                  <input
                    type='text'
                    className='form-control'
                    id='newQuantityValue'
                    placeholder='Số khách tối đa mới'
                  />
                </div>
              </div>
            </div>

            <div className='row'>
              <p className='col-sm-2 font-weight-bold '>Tỷ lệ phụ thu</p>
              <div className='form-row col-10'>
                <div className='form-group col-md-4'>
                  <label htmlFor='valueType'>Loại phụ thu</label>
                  <select id='valueType' className='form-control'>
                    <option selected>Chọn</option>
                    <option>Phụ thu khách tối đa</option>
                    <option>Phụ thu khách nước ngoài</option>
                  </select>
                </div>
                <div className='form-group col-md-3'>
                  <label htmlFor='oldRatioValue'>Giá trị cũ</label>
                  <input
                    type='text'
                    className='form-control'
                    id='oldRatioValue'
                    value='2'
                    disabled
                  />
                </div>
                <div className='form-group col-md-4'>
                  <label htmlFor='newRatioValue'>Giá trị mới</label>
                  <input
                    type='text'
                    className='form-control'
                    id='newRatioValue'
                    placeholder='Tỉ lệ mới'
                  />
                </div>
              </div>
            </div>
            <div className='listroom-button text-center'>
              <button type='submit' className='btn btn-primary'>
                Chấp nhận
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
    </HomeScreen>
  );
}
