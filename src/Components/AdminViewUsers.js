import {useState, useEffect} from 'react'
import '../Css/AdminViewUsers.css';

const AdminViewUsers = () => {
    // use states
    const [users, setUsers] = useState([]);
    
    // fetching list of users
    async function getUsers()
    {
        // retrieve data from db
        await fetch('/getUsers')
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
                        <button>delete user</button>
                        <hr></hr>
                    </div>
                </div>
            ))
        )
    }

    async function deleteUser()
    {
        var successful = false;

        // retrieve data from db
        await fetch('/removeUser', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: document.getElementById("userName").value,
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
        });

        successful = true;

        // unsuccessful response
        if(successful == false)
        {
            alert("Error: user not found.");
        }


    }
    
    
    // main renderer
    return (
        <div className="single-card">
            {/* render the fetched users */}
            <div className="full-name">
                <form>
                    <h4>Delete user by search</h4>
                    <input type='text' id='userName' placeholder='Enter username'></input>
                    <submit className='submission' onClick={deleteUser}>Delete user from database</submit>
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

export default AdminViewUsers;