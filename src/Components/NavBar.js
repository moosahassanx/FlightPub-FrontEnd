// imports
import {useState, useEffect} from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../Images/FlightPub-Logo.png";
import '../Css/app.css'
import {useDispatch} from 'react-redux';
import {login, username} from '../Actions';
import RegisterForm from './RegisterForm';


const NavBar = () => {
    // Calls the user API on Home page mount
    // Return a JSON string of all users in the DB
    // Only updates on Home component mount
    useEffect(() => {
        // local storage (refreshing the page wont make you lose login state data)
        const loginStateData = localStorage.getItem('user-login-state');
        const loginNameData = localStorage.getItem('user-login-name');
        const loginLastNameData = localStorage.getItem('user-login-last-name');
        const loginEmailData = localStorage.getItem('user-login-email');
        const loginPasswordData = localStorage.getItem('user-login-password');

        if(loginStateData)      // if react picks up on previous data then use this data rather than generating entirely new page
        {
            setLoggedIn(JSON.parse(loginStateData));
            setLoggerName(JSON.parse(loginNameData));
            setLoggerLastName(JSON.parse(loginLastNameData));
            setLoggerEmail(JSON.parse(loginEmailData));
            setLoggerPassword(JSON.parse(loginPasswordData));
        }
    }, [])

    // redux
    const dispatch = useDispatch();

    // const[state, function to update the state]
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggerName, setLoggerName] = useState("null");
    const [loggerLastName, setLoggerLastName] = useState("null");
    const [loggerEmail, setLoggerEmail] = useState("null");
    const [LoggerPassword, setLoggerPassword] = useState("null");
    const [openRegistrationForm, setOpenRegistrationForm] = useState(false);

    // login state use effects
    useEffect(() => {
        localStorage.setItem('user-login-state', JSON.stringify(loggedIn));
        localStorage.setItem('user-login-name', JSON.stringify(loggerName));
        localStorage.setItem('user-login-last-name', JSON.stringify(loggerLastName));
        localStorage.setItem('user-login-email', JSON.stringify(loggerEmail));
        localStorage.setItem('user-login-password', JSON.stringify(LoggerPassword));
    })

    // the actual business logic for a user logging in
    function registrationForm()
    {
        setOpenRegistrationForm(true);
    }

    // Async API call to fetch the users in the db
    async function loginChecker() {
        // unused but the proper convention would be to use /login - coding complications resorted to simpler solutions
        const loginCredentials = [{
            userName: document.getElementById("username").value,
            password: document.getElementById("password").value
        }]

        var loginSuccessful = false;

        // retrieving list of users from backend
        await fetch('http://localhost:8080/users')
        .then(response => response.json())
        .then(json => json.forEach(element => {
            // compare input credentials with element of backend pulling
            if(element.userName == document.getElementById("username").value && element.passwordHash == document.getElementById("password").value)
            {
                // set status
                loginSuccessful= true;

                // local storage setting
                setLoggerName(element.firstName)
                setLoggerLastName(element.lastName)
                setLoggerEmail(element.userName)
                setLoggerPassword(element.passwordHash)
            }

        }))

        // decision based on successful credentials
        if(loginSuccessful == true)
        {
            setLoggedIn(true);

            // redux setting
            dispatch(login());
            dispatch(username());
        }
        else
        {
            alert('Incorrect username or password.');
        }

    }

    // users wants to log out (set all attributes back to default values)
    function logOut()
    {
        setLoggedIn(false);
        setLoggerName(null);
        setLoggerLastName(null);
        setLoggerEmail(null);
        setLoggerPassword(null);
        alert("Successfully logged out of Flightpub.");
    }


    // generating the html code depending on user login state
    return (
        <Navbar bg="dark" variant="dark">
            {/* FlightPub Logo */}
            <Navbar.Brand as={Link} to="/">
                <img
                src={logo}
                width="50"
                height="50"
                alt="FlightPub logo"
                />
            </Navbar.Brand>

            {/* links to other pages */}
            <Nav className="mr-auto">
                <Nav.Link href="\">Home</Nav.Link>
                <Nav.Link href="\features">Features</Nav.Link>
                <Nav.Link href="\Groups">Groups</Nav.Link>

                {/* only appear when the user has logged in */}
                {
                    loggedIn == true ? (
                        <Nav.Link href="\accountManagement">Account Management</Nav.Link>
                    ) : null
                }
                
                <Nav.Link href="\discovery">Discovery</Nav.Link>
            </Nav>
            
            {
                loggedIn === false ? (
                    // user has not logged in
                    <div className='login-redirect-wrapper'>
                    <form>
                        {/* input data from user */}
                        <div className='login-wrapper-left'>
                            <input className='form-input' type="text" id="username" name="username" placeholder='Username'/><br/>
                            <input className='form-input' type="password" id="password" name="password" placeholder='Password'/>
                        </div>
                        
                        {/* login and register buttons */}
                        <div className='login-wrapper-right'>
                            <submit className='form-button' type="button" onClick={loginChecker}>Log In</submit>
                            <submit className='form-button' type="button" onClick={registrationForm}>Register</submit>
                        </div>
                        <div> {/* pop up registration form when user clicks on register button */}
                            {openRegistrationForm == true ? (
                                <RegisterForm/>
                            ) : (
                                null
                            )}</div>
                    </form>
                </div>
                ) : (
                    // user has logged in
                    <div className='login-redirect-wrapper'>
                        {/* display login message and log out button */}
                        <div className='login-wrapper-left'>
                            <p className='nav-text'> Welcome {loggerName}.</p>
                            <submit className='form-button' type='button' onClick={logOut}>Logout</submit>
                        </div>
                    </div>
                    

                )
            }
            
        </Navbar>

    )
}

export default NavBar;