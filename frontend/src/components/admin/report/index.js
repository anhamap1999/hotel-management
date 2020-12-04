import React from 'react';
import { Link } from 'react-router-dom';
import HomeScreen from '../../../page/homeScreen';
export default function ReportScreen(){
    

	return <HomeScreen>
               <div className="listroom ">
           <h1 className="text-center mar-10">Lập Báo Cáo</h1>
           <div className="form-width mar-10 ">
            <form>
                <div class="form-group row">
                        <label  class="col-sm-2 col-form-label">Tháng / Năm</label>
                        <div class="col-sm-5">
                        <input type="date" class="form-control"  placeholder="Vd : 1/1999" />
                       
                        </div>
                        <div class="col-sm-5">
                        <input type="date" class="form-control"  placeholder="Vd : 1/1999" />
                       
                        </div>
                    </div>
                
                </form>
           </div>
           
           <div className="listrom-table">
               
           <table class="table table-sm">
                <thead>
                    <tr>
                    <th scope="col">STT</th>    
                    <th scope="col">Loai Phòng</th>
                    <th scope="col">Doanh thu</th>
                    <th scope="col">Tuỳ chỉnh</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Thường</td>
                        <td>5200 000 Đ</td>
                        <td>Xoá</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Vip</td>
                        <td>4250 000 Đ</td>
                        <td>Xoá</td>
                    </tr>
                   
                    
                </tbody>
                </table>          
           </div>
           <div className="listroom-button">       
            <button type="button" class="btn btn-danger">Xuất </button>
            <button type="button" class="btn btn-dark"><Link to='/'>Thoát</Link></button>
           </div>
       </div>
    
    </HomeScreen>
}

