import React from 'react';
import HomeScreen from '../../../page/homeScreen';
export default function RuleScreen(){
    

	return <HomeScreen>
             <div className="listroom ">
           <h1 className="text-center">Tra Cứu phòng</h1>
           <div className="form-width">
            <form>
                <div class="form-group row">
                        <label  class="col-sm-2 col-form-label">Số Phòng</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control"  placeholder="Số Phòng" />
                        </div>
                    </div>
                <div class="form-group row">
                    <label  class="col-sm-2 col-form-label">Loại Phòng</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control"  placeholder="Loại Phòng" />
                    </div>
                </div>
                <div class="form-group row">
                        <label  class="col-sm-2 col-form-label">Tình Trạng Phòng</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control"  placeholder="Tình Trạng Phòng" />
                        </div>
                    </div>
                <div class="form-group row">
                    <label  class="col-sm-2 col-form-label">Đơn Giá</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control"  placeholder="Đơn Giá" />
                    </div>
                </div>
                </form>
           </div>
           <div className="listroom-button">       
            <button type="button" class="btn btn-danger">Tra cứu</button>
            <button type="button" class="btn btn-dark">Reset</button>
           </div>
           <div className="listrom-table">
               
           <table class="table table-sm">
                <thead>
                    <tr>
                    <th scope="col">STT</th>    
                    <th scope="col">Số Phòng</th>
                    <th scope="col">Loai Phòng</th>
                    <th scope="col">Đơn Giá</th>
                    <th scope="col">Tình Trạng</th>
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
           
       </div>
    </HomeScreen>
}
