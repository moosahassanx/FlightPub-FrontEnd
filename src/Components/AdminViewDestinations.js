import React from 'react';
import '../Css/AdminViewDestinations.css';

const AdminViewDestinations = () => {


    return (
        <div className="single-card">
            {/* sql: SELECT * FROM user_accounts WHERE applied = 'true' and display their form */}
            <div className="other-shit">
                <h4>Adelaide</h4>
                <p>covid cases: 69</p>
                <p>blacklisted: true</p>
                <button>mark blacklist</button>
                <button>unmark blacklist</button>
                <hr></hr>
            </div>

            <div className="other-shit">
                <h4>Cairns</h4>
                <p>covid cases: 12</p>
                <p>blacklisted: true</p>
                <button>mark blacklist</button>
                <button>unmark blacklist</button>
                <hr></hr>
            </div>

            <div className="other-shit">
                <h4>Wuhan</h4>
                <p>covid cases: 99999999999</p>
                <p>blacklisted: false</p>
                <button>mark blacklist</button>
                <button>unmark blacklist</button>
                <hr></hr>
            </div>

        </div>
    )
}

export default AdminViewDestinations;