import React from 'react';
import '../Css/BlackListDestinations.css';

const BlackListDestinations = () => {


    return (
        <div className="single-card">
            {/* sql: SELECT * FROM user_accounts WHERE applied = 'true' and display their form */}
            <div className="full-name">
                <h3>Simon Stagg</h3>
            </div>
            <div className="other-shit">
                <h4>Why would you like to become an admin?</h4>
                <p>I wanan dominate this website and kick everyone off lmao</p>

                <h4>Proof of ID (image)</h4>
                <img className="proof-id" src="https://i.imgflip.com/507x4q.jpg" alt="placeholder image for proof of id"></img>

                <h4>How did you hear about FlightPub?</h4>
                <p>saw it on the tele m98</p>

                <button>accept</button>
                <button>reject</button>

                <hr></hr>
            </div>

            <div className="full-name">
                <h3>Mike Hunt</h3>
            </div>
            <div className="other-shit">
                <h4>Why would you like to become a FlightPub agent?</h4>
                <p>i think it is really cool i wanna do that stuff cos i like it</p>

                <h4>What is your background experience like as an flight agent?</h4>
                <p>i was like man where the plane at this got me feelin some way fr fr</p>

                <h4>What is your background experience like as an flight agent?</h4>
                <p>i was like man where the plane at this got me feelin some way fr fr</p>

                <h4>How did you hear about FlightPub?</h4>
                <p>saw an ad on it on gumtree</p>

                <button>accept</button>
                <button>reject</button>

                <hr></hr>
            </div>

        </div>
    )
}

export default BlackListDestinations;