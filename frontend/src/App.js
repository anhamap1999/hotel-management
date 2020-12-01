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
<<<<<<< HEAD
import RoomedScreen from './components/admin/booking';
=======
import BookingScreen from './components/admin/booking';
>>>>>>> 3e0caf5eed40cb99118bfa376703523a82a26be3
export default function App(){
	return <div className="App">
	<BrowserRouter>
		
		<Route exact path='/' component={Home} />
		<Route  path='/login' component={Login} />
		<Route  path='/listroom' component={Listroom} />
<<<<<<< HEAD
		<Route  path='/roomed' component={RoomedScreen} />
		<Route  path='/payment' component={PaymentScreen} />
=======
		<Route  path='/payment' component={PaymentScreen} />
		<Route  path='/booking' component={BookingScreen} />
>>>>>>> 3e0caf5eed40cb99118bfa376703523a82a26be3
		<Route  path='/rule' component={RuleScreen} />
		<Route  path='/report' component={ReportScreen} />
		<Route  path='/seek' component={SearchScreen} />
	</BrowserRouter>
	</div>
}

