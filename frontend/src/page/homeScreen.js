import React from 'react';
import Header from '../components/admin/header';
import Sidebar from '../components/admin/sidebar';

export default function HomeScreen(props){
	return <div>
        <Header />
        <div className="row">
            <div className="col-md-2"><Sidebar /></div>
            <div className="col-md-10 mar-55"> {props.children}</div>
        </div>
    </div>
}

