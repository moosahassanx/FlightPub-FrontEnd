import {useState, useEffect} from 'react'
import '../Css/AdminViewUsers.css';

const AdminViewUsers = () => {
    // use states
    const [users, setUsers] = useState([]);
    
    // fetching list of users
    async function getUsers()
    {
        // retrieve data from db
        await fetch('http://localhost:8080/getUsers')
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
    
    // main renderer
    return (
        <div className="single-card">
            {/* render the fetched users */}
            <div className="full-name">
                <button onClick={getUsers}>Refresh Users Listing</button>
            </div>

            {renderUsers()}
        </div>
    )
}

export default AdminViewUsers;