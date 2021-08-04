import React from 'react';
import '../Css/AdminViewUsers.css';

const AdminViewUsers = () => {


    return (
        <div className="single-card">
            {/* sql: SELECT * FROM user_accounts WHERE applied = 'true' and display their form */}
            <div className="other-shit">
                <h4>moosa7021@gmail.com</h4>
                <p>id: 6</p>
                <p>first name: moosa</p>
                <p>last name: hassan</p>
                <p>phone: 235840976</p>
                <p>address: 444 hoodville, yungboi alley, west side</p>
                <p>type: basic</p>
                <button>delete user</button>
                <hr></hr>
            </div>

            <div className="other-shit">
                <h4>miakhalifa@gmail.com</h4>
                <p>id: 432</p>
                <p>first name: mia</p>
                <p>last name: khalifa</p>
                <p>phone: 326789</p>
                <p>address: 69 california place</p>
                <p>type: basic</p>
                <button>delete user</button>
                <hr></hr>
            </div>

            <div className="other-shit">
                <h4>namajef@gmail.com</h4>
                <p>id: 2345</p>
                <p>first name: jeff</p>
                <p>last name: JumpSt</p>
                <p>phone: 34208567</p>
                <p>address: 21 jump street, west side, california</p>
                <p>type: flight agent</p>
                <button>delete user</button>
                <hr></hr>
            </div>

        </div>
    )
}

export default AdminViewUsers;