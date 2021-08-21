import {useState, useEffect} from 'react'
import '../Css/AdminViewRequests.css';

const AdminViewRequests = () => {
    // use states
    const [users, setUsers] = useState([]);
    
    // fetching list of users
    async function getUsers()
    {
        // retrieve data from db
        await fetch('/getUserRequests')
        .then(response => response.json())
        .then(json => setUsers(json))
    }

    // render the users
    function renderUsers()
    {
        // loading destinations on startup if possible
        if(users == null)
        {
            getUsers()
        }

        console.log(users);

        // render the list
        return (
            users.map((element) => (
                <div>
                    <div className="full-name">
                        <h3>{element.userName}</h3>
                    </div>

                    <div className="other-shit">
                        <h5>id: {element.id}</h5>
                        <h5>firstName: {element.firstName}</h5>
                        <h5>lastName: {element.lastName}</h5>
                        <h5>phoneNumber: {element.phoneNumber}</h5>
                        <h5>address: {element.address}</h5>
                        <h5>userType: {element.userType}</h5>
                        <h5>why: {element.why}</h5>
                        <h5>referencing: {element.referencing}</h5>
                        <h5>experience: {element.experience}</h5>
                        <h5>requestingFor: {element.requestingFor}</h5>
                        <button>delete user</button>
                        <hr></hr>
                    </div>
                </div>
            ))
        )
    }

    async function approveRequest()
    {
        console.log("userName: " + document.getElementById("userName1").value);

        // retrieve data from db
        await fetch('/promoteUser', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: document.getElementById("userName1").value,
            })
        })

        // successful backend reach
        .then(response => {
            const data = response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
        })

        // react catch
        .catch(error => {
            console.error('CATCH ERROR: ', error.toString());
            alert("Error: airline code not found.");
        });


    }

    
    // main renderer
    return (
        <div className="single-card">
            <div className="full-name">
                <form>
                    <h4>Approve User Request by Search</h4>
                    <input type='text' id='userName1' placeholder='Enter username'></input>
                    <submit className='submission' onClick={approveRequest}>Approve Request</submit>
                </form>
                <hr></hr>
            </div>

            <div className="full-name">
                <button onClick={getUsers}>Refresh Users Listing</button>
            </div>

            {renderUsers()}
        </div>
    )
}

export default AdminViewRequests;