import React from 'react';
import NoMatch from './components/nomatch';
import {  Route, BrowserRouter } from 'react-router-dom';
import "react-notifications/lib/notifications.css";
import Login from './components/login';
import Home from './components/admin/dashboard';
import './app.css'
import Listroom from './components/admin/listroom';
import RuleScreen from './components/admin/rule'
import ReportScreen from './components/admin/report'
import SearchScreen from './components/admin/search';
import PaymentScreen from './components/admin/payment';
import BookingScreen from './components/admin/booking';
export default function App(){
	return <div className="App">
	<BrowserRouter>
		
		<Route exact path='/' component={Home} />
		<Route  path='/login' component={Login} />
		<Route  path='/listroom' component={Listroom} />
		<Route  path='/payment' component={PaymentScreen} />
		<Route  path='/booking' component={BookingScreen} />
		<Route  path='/rule' component={RuleScreen} />
		<Route  path='/report' component={ReportScreen} />
		<Route  path='/seek' component={SearchScreen} />
	</BrowserRouter>
	</div>
}

