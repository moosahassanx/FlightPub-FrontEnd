// imports
import '../Css/ApplyForPosition.css';


const ApplyForPosition = () => {

    // local storage (refreshing the page wont make you lose login state data)
    const loginNameData = localStorage.getItem('user-login-name');
    const loginLastNameData = localStorage.getItem('user-login-last-name');
    const loginEmailData = localStorage.getItem('user-login-email');
    const loginPasswordData = localStorage.getItem('user-login-password');
    
    function sendToSpring()
    {
        // send all the details from the user to the backend, save it into sql...
        // make controllers/repositories to send back to front when admins are...
        // approving for these position requests
        console.log("to send: ");
    }

    // main renderer
    return (
        <div className="parent-wrapper">
            <h2 className="heading-text">Apply for Administrator / Flight Agent Account</h2>

            <form>
                <label>Why would you like to apply for this position?</label><br></br>
                <input></input><br></br>
                <br></br>

                <label>Do you have any references?</label><br></br>
                <input></input><br></br>

                <label>What kind of background experience do you have with Airlines and Agencies?</label><br></br>
                <input></input><br></br>

                <label>Which position type were you applying for?</label><br></br>
                <input type="radio" name="position_type" value="admin" id="admin"></input>
                <label for="admin">Administrator</label><br></br>

                <input type="radio" name="position_type" value="agent" id="agent"></input>
                <label for="agent">Flight Agent</label><br></br>

                <button onClick={sendToSpring}>Request Permissions</button>
            </form>
        </div>
    )
}

export default ApplyForPosition;