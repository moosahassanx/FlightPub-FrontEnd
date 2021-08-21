// imports
import {useState, useEffect} from 'react'
import '../Css/AdminControl.css'
import * as Icon from 'react-bootstrap-icons';
import BlackListDestinations from '../Components/BlacklistDestinations';
import AdminViewDestinations from '../Components/AdminViewDestinations';
import AdminViewUsers from '../Components/AdminViewUsers';
import AdminViewSponsoredAirlines from '../Components/AdminViewSponsoredAirlines';
import AdminViewRequests from '../Components/AdminViewRequests';

const AdminControl = () => {

    // local storage (refreshing the page wont make you lose login state data)
    const loginNameData = localStorage.getItem('user-login-name');
    const loginLastNameData = localStorage.getItem('user-login-last-name');
    const loginEmailData = localStorage.getItem('user-login-email');
    const loginPasswordData = localStorage.getItem('user-login-password');

    // use states
    const [openMyDetails, setMyDetails] = useState(false);
    const [openChangePassword, setChangePassword] = useState(false);
    const [openViewBookings, setViewBookings] = useState(true);
    const [openViewSponsoredAirlines, setopenViewSponsoredAirlines] = useState(false);
    const [userDetails, setUserDetails] = useState([]);

    // button functions for controlling boolean states
    function controlMyDetails()
    {
        getUserDetails();

        // set openMyDetails to true
        if(openMyDetails == false)
        {
            setMyDetails(true)
        }

        // everything else to false
        if(openChangePassword == true)
        {
            setChangePassword(false)
        }
        if(openViewBookings == true)
        {
            setViewBookings(false)
        }
        if(openViewSponsoredAirlines == true)
        {
            setopenViewSponsoredAirlines(false)
        }
    }
    function controlChangePassword()
    {
        if(openMyDetails == true)
        {
            setMyDetails(false)
        }
        if(openChangePassword == false)
        {
            setChangePassword(true)
        }
        if(openViewBookings == true)
        {
            setViewBookings(false)
        }

        if(openViewSponsoredAirlines == true)
        {
            setopenViewSponsoredAirlines(false)
        }
    }
    function controlViewBookings()
    {
        if(openMyDetails == true)
        {
            setMyDetails(false)
        }
        if(openChangePassword == true)
        {
            setChangePassword(false)
        }
        if(openViewBookings == false)
        {
            setViewBookings(true)
        }
        if(openViewSponsoredAirlines == true)
        {
            setopenViewSponsoredAirlines(false)
        }   
    }
    function controlViewSponsoredAirlines()
    {
        if(openMyDetails == true)
        {
            setMyDetails(false)
        }
        if(openChangePassword == true)
        {
            setChangePassword(false)
        }
        if(openViewBookings == true)
        {
            setViewBookings(false)
        }
        if(openViewSponsoredAirlines == false)
        {
            setopenViewSponsoredAirlines(true)
        }   
    }
    
    // Async API call to fetch the users in the db
    async function getUserDetails() {
        let miniDetails = [];

        var tempLoginUser1 = loginEmailData.substring(2)
        var tempLoginPass1 = loginPasswordData.substring(2)

        var tempLoginUser1 = tempLoginUser1.slice(0, -2)
        var tempLoginPass1 = tempLoginPass1.slice(0, -2)

        console.log("loginEmailData: " + tempLoginUser1);
        console.log("loginPasswordData: " + tempLoginPass1);

        // ==== NEW CODE
        // GET request using fetch with error handling
        await fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: tempLoginUser1,
                password: tempLoginPass1
            })
        })
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            console.log("LOGIN SUCCESSFUL!!")
            console.log(data.map((object => object)))
            console.log("WELCOME " + data.map((object => object.userName)))

            // local storage setting
            var returnerId = data.map(object => object.id)
            var returnerUserName = data.map(object => object.userName)
            var returnerFirstName = data.map(object => object.firstName)
            var returnerLastName = data.map(object => object.lastName)
            var returnerSalt = data.map(object => object.salt)
            var returnerPasswordHash = data.map(object => object.passwordHash)
            var returnerPhoneNumber = data.map(object => object.phoneNumber)
            var returnerAddress = data.map(object => object.address)
            var returnerLastLocation = data.map(object => object.lastLocation)
            var returnerBookingList = data.map(object => object.lastLocation)

            miniDetails.push(returnerUserName);
            miniDetails.push(returnerFirstName);
            miniDetails.push(returnerLastName);
            miniDetails.push(returnerPhoneNumber);

        })

        // react catch
        .catch(error => {
            console.error('LOGIN ERROR: ', error.toString());
        });

        setUserDetails(miniDetails);

        return miniDetails;
    }

    return (
        <div className="container-fluid text-center">
            <h1>Admin Control</h1>

            <div id="accountmng-row" className="row">

                {/* Displaying buttons to control right div page loading */}
                <div id="accountmng-col"className="col-md-3">
                    <div className='left-panel-header'>
                    <h3>Side Panel</h3>
                    </div>

                    {/* All buttons to control right div */}
                    <div className="btn-group-vertical">
                        <button className='controller-button' onClick={controlViewBookings} id='viewBookings' value='viewBookings'><Icon.JournalBookmarkFill/> <span className='icon-spacer'>View Permission Requests</span></button>
                        <button className='controller-button' onClick={controlMyDetails} id='myDetails' value='myDetails'><Icon.PersonCircle /> <span className='icon-spacer'>Blacklist Destinations</span></button>
                        <button className='controller-button' onClick={controlChangePassword} id='changePassword' value='changePassword'><Icon.KeyFill/> <span className='icon-spacer'>Delete Users</span></button>
                        <button className='controller-button' onClick={controlViewSponsoredAirlines} id='airlineSponsors' value='airlineSponsors'><Icon.KeyFill/> <span className='icon-spacer'>Manage Sponsored Airlines</span></button>

                    </div>
                </div>

                {/* display depending on user selection */}
                <div id="accountmng-content-col" className="col-md-9">
                    {
                        // user clicked on My Details button
                        openMyDetails === true ? (
                            <div>
                                <div className='right-panel-header'>
                                    <h3>Blacklist a Destination</h3>
                                </div>

                                {/* setting LHS for details */}
                                <div className='account-detail-parent'>
                                    <div className='account-detail-middle'>
                                        <BlackListDestinations />
                                    </div>
                                </div>
                            </div>                            
                        ) : null
                    }
                    {
                        // user clicked on Change Password button
                        openChangePassword === true ? (
                            <div>
                                <div className='right-panel-header'>
                                    <h3>Delete a Certain User</h3>
                                </div>

                                <div className='account-detail-parent'>
                                    {/* input text fields */}
                                    <div className='account-detail-middle'>
                                    <AdminViewUsers />
                                    </div>
                                </div>
                            </div>  
                        ) : null
                    }   
                    {
                        // user clicked on View Bookings button
                        openViewBookings === true ? (
                            <div>
                                <div className='right-panel-header'>
                                  <h3>View Permission Requests</h3>
                                </div>

                                {/* setting LHS for details */}
                                <div className='account-detail-parent'>
                                    <div className='account-detail-middle'>
                                        <AdminViewRequests />
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                    {
                        // user clicked on Manage Sponsored Airlines button
                        openViewSponsoredAirlines === true ? (
                            <div>
                                <div className='right-panel-header'>
                                  <h3>Manage Sponsored Airlines</h3>
                                </div>

                                {/* setting LHS for details */}
                                <div className='account-detail-parent'>
                                    <div className='account-detail-middle'>
                                        <AdminViewSponsoredAirlines />
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>

    )
}

export default AdminControl;