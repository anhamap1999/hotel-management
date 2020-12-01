import React from 'react';
import { Link } from 'react-router-dom';
import HomeScreen from '../../../page/homeScreen';
export default function SearchScreen(){
    

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
                    <label for="exampleFormControlSelect1" class="col-sm-2 col-form-label">Loại Phòng</label>
                    <div class="col-sm-10">  
                        <select class="form-control custom-form" id="exampleFormControlSelect1">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="exampleFormControlSelect1" class="col-sm-2 col-form-label">Tình Trạng Phòng</label>
                    <div class="col-sm-10">  
                        <select class="form-control custom-form" id="exampleFormControlSelect1">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                        </select>
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

