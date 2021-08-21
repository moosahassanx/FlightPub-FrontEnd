// imports
import '../Css/ApplyForPosition.css';
import {useState, useEffect} from 'react'


const ApplyForPosition = () => {

    // local storage (refreshing the page wont make you lose login state data)
    const loginNameData = localStorage.getItem('user-login-name');
    const loginLastNameData = localStorage.getItem('user-login-last-name');
    const loginEmailData = localStorage.getItem('user-login-email');
    const loginPasswordData = localStorage.getItem('user-login-password');
    
    // const[state, function to update the state]
    const [requestFor, setRequestFor] = useState("null");

    // changing variables cos im lazy
    function setAsAdmin()
    {
        setRequestFor("admin");
    }
    function setAsAgent()
    {
        setRequestFor("agent");
    }
    
    async function sendToSpring()
    {
        // send all the details from the user to the backend, save it into sql...
        // make controllers/repositories to send back to front when admins are...
        // approving for these position requests
        if(requestFor == "null")
        {
            alert("Select request position type you were applying for.");
        }

        // removing excess [""]
        let userName = loginEmailData;
        userName = userName.substring(2, userName.length - 2)

        console.log("userName: " + userName);
        console.log("why: " + document.getElementById("why").value);
        console.log("referencing: " + document.getElementById("referencing").value);
        console.log("experience: " + document.getElementById("experience").value);
        console.log("agent OR admin: " + requestFor);

        // input data into db
        await fetch('/addToRequestList', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userName,
                why: document.getElementById("why").value,
                referencing: document.getElementById("referencing").value,
                experience: document.getElementById("experience").value,
                requesting_for: requestFor
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
            alert("Error: could not insert list into request.");
        });

        alert("Request successfully sent. Please wait for an administrator to approve your request.");
        
    }

    // main renderer
    return (
        <div className="parent-wrapper">
            <h2 className="heading-text">Apply for Administrator / Flight Agent Account</h2>

            <form>
                <label>Why would you like to apply for this position?</label><br></br>
                <input id='why'></input><br></br>
                <br></br>

                <label>Do you have any references?</label><br></br>
                <input id='referencing'></input><br></br>

                <label>What kind of background experience do you have with Airlines and Agencies?</label><br></br>
                <input id='experience'></input><br></br>

                <div id='dialog'>
                    <label>Which position type were you applying for?</label><br></br>
                    <input type="radio" name="position_type" value="admin" id="admin" onClick={setAsAdmin}></input>
                    <label for="admin">Administrator</label><br></br>

                    <input type="radio" name="position_type" value="agent" id="agent" onClick={setAsAgent}></input>
                    <label for="agent">Flight Agent</label><br></br>
                </div>

                <submit onClick={sendToSpring}>Request Permissions</submit>
            </form>
        </div>
    )
}

export default ApplyForPosition;