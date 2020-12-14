import React from 'react';
import { Link } from 'react-router-dom';
import CreateGuestType from './createGuestType.js';
import HomeScreen from '../../../page/homeScreen';

export default function GuestList (){
    
	return <HomeScreen>
             <div className="listroom ">
           <h1 className="text-center">Danh sách khách hàng</h1>
    
           <div className="listrom-table">
               
           <table class="table table-sm">
                <thead>
                    <tr>
                    <th scope="col">STT</th>    
                    <th scope="col">Tên Khách Hàng</th>
                    <th scope="col">CMND</th> 
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Loại Khách</th>
                  
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Bảo bảo</td>
                        <td>2511253728</td>
                        <td>Quận 1</td>
                        <td>Thường</td>
                        
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Mạnh</td>
                        <td>2515353724</td>
                        <td>Quận 2</td>
                        <td>VIP</td>
                        
                    </tr> 
                </tbody>
                </table>          
           </div>
           <div className="listroom-button">       
           <CreateGuestType/>
            <button type="button" class="btn btn-danger"><Link to="/">Thoát</Link></button>
           </div>
       </div>
    </HomeScreen>
}
