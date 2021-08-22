// imports
import { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../Images/FlightPub-Logo.png";
import "../Css/app.css";
import { useDispatch } from "react-redux";
import { login, username } from "../Actions";
import RegisterForm from "./RegisterForm";

const NavBar = () => {
	// Calls the user API on Home page mount
	// Return a JSON string of all users in the DB
	// Only updates on Home component mount
	useEffect(() => {
		// local storage (refreshing the page wont make you lose login state data)
		const loginStateData = localStorage.getItem("user-login-state");
		const loginNameData = localStorage.getItem("user-login-name");
		const loginLastNameData = localStorage.getItem("user-login-last-name");
		const loginEmailData = localStorage.getItem("user-login-email");
		const loginPasswordData = localStorage.getItem("user-login-password");
		const loginTypeData = localStorage.getItem("user-login-type");

		if (loginStateData) {
			// if react picks up on previous data then use this data rather than generating entirely new page
			setLoggedIn(JSON.parse(loginStateData));
			setLoggerName(JSON.parse(loginNameData));
			setLoggerLastName(JSON.parse(loginLastNameData));
			setLoggerEmail(JSON.parse(loginEmailData));
			setLoggerPassword(JSON.parse(loginPasswordData));
			setLoggerType(JSON.parse(loginTypeData));
		}
	}, []);

	// redux
	const dispatch = useDispatch();

	// const[state, function to update the state]
	const [loggedIn, setLoggedIn] = useState(false);
	const [loggerName, setLoggerName] = useState("null");
	const [loggerLastName, setLoggerLastName] = useState("null");
	const [loggerEmail, setLoggerEmail] = useState("null");
	const [LoggerPassword, setLoggerPassword] = useState("null");
	const [loggerType, setLoggerType] = useState("null");
	const [openRegistrationForm, setOpenRegistrationForm] = useState(false);

	// login state use effects
	useEffect(() => {
		localStorage.setItem("user-login-state", JSON.stringify(loggedIn));
		localStorage.setItem("user-login-name", JSON.stringify(loggerName));
		localStorage.setItem(
			"user-login-last-name",
			JSON.stringify(loggerLastName)
		);
		localStorage.setItem("user-login-email", JSON.stringify(loggerEmail));
		localStorage.setItem("user-login-password", JSON.stringify(LoggerPassword));
		localStorage.setItem("user-login-type", JSON.stringify(loggerType));
	});

	// the actual business logic for a user logging in
	function registrationForm() {
		setOpenRegistrationForm(true);
	}

	// Async API call to fetch the users in the db
	async function loginChecker() {
		// TODO: have users login with secure encryption..

		// TODO: this might be used later - if not, remove this in the final version
		const loginCredentials = [
			{
				userName: document.getElementById("username").value,
				password: document.getElementById("password").value,
			},
		];

		var loginSuccessful = false;

		// GET request using fetch with error handling
		await fetch("/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userName: document.getElementById("username").value,
				password: document.getElementById("password").value,
			}),
		})
			.then(async (response) => {
				const data = await response.json();

				// check for error response
				if (!response.ok) {
					// get error message from body or default to response statusText
					const error = (data && data.message) || response.statusText;
					return Promise.reject(error);
				}

				console.log("LOGIN SUCCESSFUL!!");
				console.log(data.map((object) => object));
				console.log("WELCOME " + data.map((object) => object.userName));

				// set status
				loginSuccessful = true;

				// local storage setting
				var returnerFirstName = data.map((object) => object.firstName);
				var returnerLastName = data.map((object) => object.lastName);
				var returnerUserName = data.map((object) => object.userName);
				var returnerPasswordHash = data.map((object) => object.passwordHash);
				var returnerUserType = data.map((object) => object.userType);

				setLoggerName(returnerFirstName);
				setLoggerLastName(returnerLastName);
				setLoggerEmail(returnerUserName);
				setLoggerPassword(returnerPasswordHash);
				setLoggerType(returnerUserType);
			})

			// react catch
			.catch((error) => {
				console.error("LOGIN ERROR: ", error.toString());
			});

		// decision based on successful credentials
		if (loginSuccessful == true) {
			setLoggedIn(true);

			// redux setting
			dispatch(login());
			dispatch(username());
		}

		// the fault is of the user - display error message
		else {
			alert("Incorrect username or password.");
		}
	}

	// users wants to log out (set all attributes back to default values)
	function logOut() {
		setLoggedIn(false);
		setLoggerName(null);
		setLoggerLastName(null);
		setLoggerEmail(null);
		setLoggerPassword(null);
		setLoggerType(null);
		alert("Successfully logged out of Flightpub.");
	}

	// generating the html code depending on user login state
	return (
		<Navbar bg='dark' variant='dark'>
			{/* FlightPub Logo */}
			<Navbar.Brand as={Link} to='/'>
				<img src={logo} width='50' height='50' alt='FlightPub logo' />
			</Navbar.Brand>

			{/* links to other pages */}
			<Nav className='mr-auto'>
				<Nav.Link href='\'>Home</Nav.Link>
				{/* <Nav.Link href="\features">Features</Nav.Link> */}
				<Nav.Link href='\Groups'>Groups</Nav.Link>
				<Nav.Link href='\discovery'>Discovery</Nav.Link>

				{/* only appear when the user has logged in */}
				{loggedIn == true ? (
					<Nav.Link href='\accountManagement'>Account Management</Nav.Link>
				) : null}
				{loggedIn == true ? (
					<Nav.Link href='\WishlistPage'>Wishlist</Nav.Link>
				) : null}

				{/* only appear if the user is admin */}
				{loggerType == "admin" ? (
					<Nav.Link href='\adminControl'>Admin Control</Nav.Link>
				) : null}
			</Nav>

			{loggedIn === false ? (
				// user has not logged in
				<div className='login-redirect-wrapper'>
					<form>
						{/* input data from user */}
						<div className='login-wrapper-left'>
							<input
								className='form-input'
								type='text'
								id='username'
								name='username'
								placeholder='Username'
							/>
							<br />
							<input
								className='form-input'
								type='password'
								id='password'
								name='password'
								placeholder='Password'
							/>
						</div>

						{/* login and register buttons */}
						<div className='login-wrapper-right'>
							<submit
								className='form-button'
								type='button'
								onClick={loginChecker}
							>
								Log In
							</submit>
							<submit
								className='form-button'
								type='button'
								onClick={registrationForm}
							>
								Register
							</submit>
						</div>
						<div>
							{" "}
							{/* pop up registration form when user clicks on register button */}
							{openRegistrationForm == true ? <RegisterForm /> : null}
						</div>
					</form>
				</div>
			) : (
				// user has logged in
				<div className='login-redirect-wrapper'>
					{/* display login message and log out button */}
					<div className='login-wrapper-left'>
						<p className='nav-text'> Welcome {loggerName}.</p>
						<submit className='form-button' type='button' onClick={logOut}>
							Logout
						</submit>
					</div>
				</div>
			)}
		</Navbar>
	);
};

export default NavBar;
