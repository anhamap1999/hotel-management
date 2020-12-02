import React, { useState } from 'react';
import HomeScreen from '../../../page/homeScreen';
import { Link } from 'react-router-dom';


export default function PaymentScreen(){

    // const [date, setdate] = useState(''); 
     var today = new Date();
     const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();  
    

	return <HomeScreen>
        <div className="bill"> 
            <h1 className="text-center">Lập hóa đơn</h1>
            <div className="bill-body">
                    <form style={{ width:"100%"}}>
                        <div class="form-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div class="form-group">
                                        <label for="name">Tên khách hàng</label>
                                        <select class="form-control" id="CustomerName">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="opel">Opel</option>
    <option value="audi">Audi</option>
  </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div class="form-group">
                                        <label for="date" >Ngày</label>
                                        <input type="text" class="form-control" id="date" placeholder={date} disabled />
                                    </div>
                                </div>
                            </div>     
                            
                            <div className="row">
                                <div className="col-md-6">
                                    <div class="form-group">
                                        <label for="name">Địa chỉ</label>
                                        <input type="text" class="form-control" id="CustomerName" placeholder="Vd: Tp HCM" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div class="form-group">
                                        <label for="Total" >Thành tiền</label>
                                        <input type="text" class="form-control" id="Total"   value="2 000 000$" disabled />
                                    </div>
                                </div>
                            </div>   
                            <div className="bill-table">
                                <table class="table table-sm">
                                    <thead className="text-center">
                                        <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Số Phòng</th>
                                        <th scope="col">Số ngày thuê</th>
                                        <th scope="col" >Đơn Giá</th>
                                        <th scope="col">Ghi Chú</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row" className="STT"></th>
                                            <td>
                                                <select class="custom-select">
                                                    <option selected>Open this select menu</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </td>
                                            <td><input type="text" disabled value="1" /></td>
                                            <td ><input type="text" disabled value="200 000$" /></td>
                                            <td><input type="text" placeholder="Ghi chú" /></td>
                                        </tr>
                                        <tr>
                                            <th scope="row" className="STT"></th>
                                            <td>
                                                <select class="custom-select">
                                                    <option selected>Open this select menu</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </td>
                                            <td><input type="text" disabled value="1" /></td>
                                            <td ><input type="text" disabled value="200 000$" /></td>
                                            <td><input type="text" placeholder="Ghi chú" /></td>
                                        </tr> <tr>
                                            <th scope="row" className="STT"></th>
                                            <td>
                                                <select class="custom-select">
                                                    <option selected>Open this select menu</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </td>
                                            <td><input type="text" disabled value="1" /></td>
                                            <td ><input type="text" disabled value="200 000$" /></td>
                                            <td><input type="text" placeholder="Ghi chú" /></td>
                                        </tr> 
                                        
                                    </tbody>
                                </table>          
                            </div>
                            <div className="listroom-button text-center">
                                <button type="button" class="btn btn-primary">Thanh toán</button>
                                <button type="button" class="btn btn-success">Reset</button>
                                <Link to='/' ><button type="button" class="btn btn-danger">Thoát</button></Link>
                            </div>
                        </div>
                    </form>    
                </div>
            </div>
    </HomeScreen>
}
