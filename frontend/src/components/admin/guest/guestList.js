import React from 'react';
import { Link } from 'react-router-dom';
import HomeScreen from '../../../page/homeScreen';

export default function GuestList (){
    
	return <HomeScreen>
             <div className="listroom ">
           <h1 className="text-center">Phòng Đang Thuê</h1>
    
           <div className="listrom-table">
               
           <table class="table table-sm">
                <thead>
                    <tr>
                    <th scope="col">STT</th>    
                    <th scope="col">Tên Khách Hàng</th>
                    <th scope="col">Số Phòng</th>
                    <th scope="col">Loại Khách</th>
                    <th scope="col">CMND</th>     
                  
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Bao bao</td>
                        <td>A.101</td>
                        <td>Thường</td>
                        <td>2511253728</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Manh</td>
                        <td>A.102</td>
                        <td>Vip</td>
                        <td>2515353724</td>
                    </tr> 
                </tbody>
                </table>          
           </div>
           <div className="listroom-button">       
            <button type="button" class="btn btn-danger"><Link to="/">Thoát</Link></button>
            <button type="button" class="btn btn-dark"><Link to="/seek">Tra cứ</Link></button>
           </div>
       </div>
    </HomeScreen>
}
