// imports
import {useState, useEffect} from 'react'
import * as Icon from 'react-bootstrap-icons';
import BlackListDestinations from '../Components/BlacklistDestinations';
import AdminViewDestinations from '../Components/AdminViewDestinations';
import AdminViewUsers from '../Components/AdminViewUsers';

const ApplyForPosition = () => {

    // local storage (refreshing the page wont make you lose login state data)
    const loginNameData = localStorage.getItem('user-login-name');
    const loginLastNameData = localStorage.getItem('user-login-last-name');
    const loginEmailData = localStorage.getItem('user-login-email');
    const loginPasswordData = localStorage.getItem('user-login-password');

    // functions

    return (
        <p>test</p>
    )
}

export default ApplyForPosition;