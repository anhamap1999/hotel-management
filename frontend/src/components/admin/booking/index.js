import React from 'react';
import { Link } from 'react-router-dom';
import HomeScreen from '../../../page/homeScreen';
export default function RoomedScreen(){
    
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
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr> <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr> <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr> <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr> <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr> <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr> <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr> <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr> <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
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

