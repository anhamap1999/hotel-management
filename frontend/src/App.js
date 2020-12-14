import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import Login from './components/login';
import Home from './components/admin/dashboard';
import './app.css';
import Listroom from './components/admin/listroom';
import ListRoomType from './components/admin/roomtype';
import RuleScreen from './components/admin/rule';
import ReportScreen from './components/admin/report';
import SearchScreen from './components/admin/search';
import PaymentScreen from './components/admin/payment';
import GuestScreen from './components/admin/guest';
import RoomedScreen from './components/admin/booking';
import { useHistory } from 'react-router-dom';

export default function App() {
  const history = useHistory();
  const token = localStorage.getItem('token');
  if (!token) {
    history.push('/login');
  }
  return (
    <div className='App'>
      <BrowserRouter>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/listroom' component={Listroom} />
        <Route path='/room-type' component={ListRoomType} />
        <Route path='/roomed' component={RoomedScreen} />
        <Route path='/guest' component={GuestScreen} />
        <Route path='/payment' component={PaymentScreen} />
        <Route path='/rule' component={RuleScreen} />
        <Route path='/report' component={ReportScreen} />
        <Route path='/seek' component={SearchScreen} />
      </BrowserRouter>
    </div>
  );
}
