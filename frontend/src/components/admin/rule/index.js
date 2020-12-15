import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeScreen from '../../../page/homeScreen';
import { configApis } from './../../../apis/config.api';
import { customerTypeApis } from '../../../apis/customerType.api';

const customerTypeDefined = {
  native: 'Nội địa',
  foreign: 'Quốc tế',
};

export default function RuleScreen() {
  const [configs, setConfigs] = useState([]);
  const [maxQti, setMaxQti] = useState(0);
  const [maxQtiRate, setMaxQtiRate] = useState(0);
  const [customerTypeConfig, setCustomerTypeConfig] = useState([]);
  const [reload, setReload] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const fetchConfigs = async () => {
    setIsFetching(true);
    const config = await configApis.getConfigs();
    setIsFetching(false);
    console.log(config);
    setConfigs(config);
    setMaxQti(
      config.find((item) => item.name === 'max_qti_of_customers').value
    );
    setMaxQtiRate(
      config.find((item) => item.name === 'max_qti_of_customers_rate').value
    );
    setIsFetching(true);
    customerTypeApis.getCustomerTypes().then((res) => {
      if (res) {
        setCustomerTypeConfig(
          config
            .find((item) => item.name === 'customer_type_config')
            .value.map((i) => {
              i.name = res.find((t) => t._id === i.id).name;
              return i;
            })
        );
      }
      setIsFetching(false);
    });
  };
  useEffect(() => {
    fetchConfigs();
  }, []);

  useEffect(() => {
    fetchConfigs();
  }, [reload]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const configPromises = configs.map((item) => {
      if (item.name === 'max_qti_of_customers') {
        return configApis.updateConfig(item._id, { value: maxQti });
      } else if (item.name === 'max_qti_of_customers_rate') {
        return configApis.updateConfig(item._id, { value: maxQtiRate });
      } else {
        const value = customerTypeConfig.map((item) => {
          const { id, qti, rate } = item;
          return { id, qti, rate };
        });
        return configApis.updateConfig(item._id, {
          value,
        });
      }
    });
    setIsFetching(true);
    await Promise.all(configPromises);
    setReload(!reload);
    setIsFetching(false);
  };

  const onInput = (key, value, index) => {
    if (value && !parseFloat(value)) {
      return;
    }
    if (key === 'customerTypeQti') {
      if (value && value >= maxQti) {
        return;
      }
    }
    switch (key) {
      case 'maxQti':
        setMaxQti(value ? parseInt(value) : 0);
        break;
      case 'maxQtiRate':
        setMaxQtiRate(value ? parseFloat(value) : 0);
        break;
      case 'customerTypeQti': {
        customerTypeConfig[index].qti = value ? parseInt(value) : 0;
        setCustomerTypeConfig([...customerTypeConfig]);
        break;
      }
      case 'customerTypeRate': {
        customerTypeConfig[index].rate = value ? parseFloat(value) : 0;
        setCustomerTypeConfig([...customerTypeConfig]);
        break;
      }
      default:
        break;
    }
  };

  const customerTypeConfigRender = customerTypeConfig
    ? customerTypeConfig.map((item, index) => (
        <div className='form-row col-10'>
          <div className='form-row col-10'>
            <div className='form-group col-md-4'>
              <label htmlFor={'customerType' + index}>Loại khách</label>
              <input
                type='text'
                className='form-control'
                id={'customerType' + index}
                value={customerTypeDefined[item.name]}
                disabled
              />
            </div>
            {/* <div className='form-group col-md-3'>
              <label htmlFor={'oldQtiValue' + index}>Số lượng cũ</label>
              <input
                type='text'
                className='form-control'
                id={'oldQtiValue' + index}
                value={item.qti}
                disabled
              />
            </div> */}
            <div className='form-group col-md-4'>
              <label htmlFor={'newQti' + index}>Số lượng khách tối thiểu</label>
              <input
                type='text'
                className='form-control'
                id={'newQti' + index}
                placeholder='Số lượng'
                value={item.qti}
                onChange={(e) =>
                  onInput('customerTypeQti', e.target.value, index)
                }
              />
            </div>
            {/* </div>
          <div className='form-row col-10'> */}
            {/* <div className='form-group col-md-4'></div> */}
            {/* <div className='form-group col-md-3'>
              <label htmlFor={'oldQuantityValue' + index}>Giá trị cũ</label>
              <input
                type='text'
                className='form-control'
                id={'oldQuantityValue' + index}
                value={item.rate}
                disabled
              />
            </div> */}
            <div className='form-group col-md-4'>
              <label htmlFor={'newValue' + index}>Giá trị</label>
              <input
                type='text'
                className='form-control'
                id={'newValue' + index}
                placeholder='Tỉ lệ'
                value={item.rate}
                onChange={(e) =>
                  onInput('customerTypeRate', e.target.value, index)
                }
              />
            </div>
          </div>
        </div>
      ))
    : null;
  return (
    <HomeScreen>
      <div className='rule container'>
        <h1 className='text-center'>Thay đổi quy định</h1>
        <div className='rule-body'>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <p className='col-sm-2 font-weight-bold '>
                Số lượng khách tối đa
              </p>
              <div className='form-row col-10'>
                {/* <div className='form-group col-md-4'>
                  <label htmlFor='roomType'>Loại phòng</label>
                  <select id='roomType' className='form-control'>
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div> */}
                {/* <div className='form-group col-md-3'>
                  <label htmlFor='oldQuantityValue'>Giá trị cũ</label>
                  <input
                    type='text'
                    className='form-control'
                    id='oldQuantityValue'
                    value={maxQti}
                    disabled
                  />
                </div> */}
                {!isFetching ? (
                  <div className='form-group col-md-4'>
                    <label htmlFor='newQuantityValue'>Giá trị</label>
                    <input
                      type='text'
                      className='form-control'
                      id='newQuantityValue'
                      placeholder='Số khách tối đa'
                      value={maxQti}
                      onChange={(e) => onInput('maxQti', e.target.value)}
                    />
                  </div>
                ) : (
                  <div className='spinner-border'></div>
                )}
              </div>
            </div>

            <div className='row'>
              <p className='col-sm-2 font-weight-bold '>Phụ thu khách tối đa</p>
              <div className='form-row col-10'>
                {/* <div className='form-group col-md-4'>
                  <label htmlFor='roomType'>Loại phòng</label>
                  <select id='roomType' className='form-control'>
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div> */}
                {/* <div className='form-group col-md-3'>
                  <label htmlFor='oldQuantityRateValue'>Giá trị cũ</label>
                  <input
                    type='text'
                    className='form-control'
                    id='oldQuantityRateValue'
                    value={maxQtiRate}
                    disabled
                  />
                </div> */}
                {!isFetching ? (
                  <div className='form-group col-md-4'>
                    <label htmlFor='newQuantityRateValue'>Giá trị</label>
                    <input
                      type='text'
                      className='form-control'
                      id='newQuantityRateValue'
                      placeholder='Phụ thu khách tối đa'
                      value={maxQtiRate}
                      onChange={(e) => onInput('maxQtiRate', e.target.value)}
                    />
                  </div>
                ) : (
                  <div className='spinner-border'></div>
                )}
              </div>
            </div>

            <div className='row'>
              <p className='col-sm-2 font-weight-bold '>Tỷ lệ phụ thu</p>
              {!isFetching ? (
                customerTypeConfigRender
              ) : (
                <div className='spinner-border'></div>
              )}
            </div>
            <div className='listroom-button text-center'>
              <button type='submit' className='btn btn-primary'>
                Lưu
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
