import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeScreen from '../../../page/homeScreen';
import { reportApis } from '../../../apis/report.api';
import moment from 'moment';

export default function ReportScreen() {
  const [time, setTime] = useState(moment().format('YYYY-MM'));
  const [report, setReport] = useState([]);
  const [total, setTotal] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    reportApis.getReport({ date: time }).then((res) => {
      if (res) {
        setReport(res);
        let totalRevenue = 0;
        res.forEach((item) => (totalRevenue += item.revenue));
        setTotal(totalRevenue);
      }
      setIsFetching(false);
    });
  }, [time]);

  const dataRender = report
    ? report.map((item, index) => (
        <tr>
          <th scope='row'>{index + 1}</th>
          <td>{item.name}</td>
          <td>{item.price}đ</td>
          <td>{item.revenue}đ</td>
          <td>{total > 0 ? ((item.revenue / total) * 100).toFixed(2) : 0}%</td>
        </tr>
      ))
    : null;

  const onPrint = () => {
    const printContents = document.getElementById('report').innerHTML;
    // const originalContents = document.body.innerHTML;

    // document.body.innerHTML = printContents;

    // window.print();

    // document.body.innerHTML = originalContents;
    const printWindow = window.open('', '', 'height=1000, width=1000');
    printWindow.document.write('<html><head><title></title>');
    printWindow.document.write(
      "<link href='/css/styles.css' rel='stylesheet'>"
    );
    printWindow.document.write(
      "<link href='/css/admin-style.css' rel='stylesheet'>"
    );
    printWindow.document.write(
      "<link href='/vendor/bootstrap/css/bootstrap.min.css' rel='stylesheet'>"
    );
    printWindow.document.write(
      "<link href='/vendor/fontawesome-free/css/all.min.css' rel='stylesheet'></link>"
    );
    printWindow.document.write('</head>');
    printWindow.document.write('<body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 1000);
  };

  return (
    <HomeScreen>
      <div>
        <div className='listroom' id='report'>
          <h1 className='text-center mar-10'>Lập Báo Cáo</h1>
          <div className='form-width mar-10 '>
            <form>
              <div className='form-group row'>
                <label className='col-sm-4 col-form-label'>Tháng / Năm</label>
                <div className='col-sm-6'>
                  <input
                    type='month'
                    className='form-control'
                    placeholder='Vd : 1/1999'
                    onChange={(e) => setTime(e.target.value)}
                    value={time}
                  />
                </div>
              </div>
            </form>
          </div>

          <div className='listroom-table'>
            <table className='table table-sm'>
              <thead>
                <tr>
                  <th scope='col'>STT</th>
                  <th scope='col'>Loai Phòng</th>
                  <th scope='col'>Đơn giá</th>
                  <th scope='col'>Doanh thu</th>
                  <th scope='col'>Tỉ lệ</th>
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
          </div>
        </div>
        <div className='listroom-button'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => onPrint()}
          >
            Xuất
          </button>
          <button type='button' className='btn btn-danger'>
            <Link to='/'>Thoát</Link>
          </button>
        </div>
      </div>
    </HomeScreen>
  );
}
