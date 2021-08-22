// imports
import { useState, useEffect } from "react";
import "../Css/AccountManagement.css";
import * as Icon from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import Bookings from "../Components/Bookings";

const AccountManagement = () => {
	// local storage (refreshing the page wont make you lose login state data)
	const loginNameData = localStorage.getItem("user-login-name");
	const loginLastNameData = localStorage.getItem("user-login-last-name");
	const loginEmailData = localStorage.getItem("user-login-email");
	const loginPasswordData = localStorage.getItem("user-login-password");

	// use states
	const [openMyDetails, setMyDetails] = useState(false);
	const [openChangePassword, setChangePassword] = useState(false);
	const [openViewBookings, setViewBookings] = useState(true);
	const [userDetails, setUserDetails] = useState([]);

	// button functions for controlling boolean states
	function controlMyDetails() {
		getUserDetails();

		if (openMyDetails == false) {
			setMyDetails(true);
		}
		if (openChangePassword == true) {
			setChangePassword(false);
		}
		if (openViewBookings == true) {
			setViewBookings(false);
		}
	}
	function controlChangePassword() {
		if (openMyDetails == true) {
			setMyDetails(false);
		}
		if (openChangePassword == false) {
			setChangePassword(true);
		}
		if (openViewBookings == true) {
			setViewBookings(false);
		}
	}
	function controlViewBookings() {
		if (openMyDetails == true) {
			setMyDetails(false);
		}
		if (openChangePassword == true) {
			setChangePassword(false);
		}
		if (openViewBookings == false) {
			setViewBookings(true);
		}
	}

	// Async API call to fetch the users in the db
	async function getUserDetails() {
		let miniDetails = [];

		var tempLoginUser1 = loginEmailData.substring(2);
		var tempLoginPass1 = loginPasswordData.substring(2);

		var tempLoginUser1 = tempLoginUser1.slice(0, -2);
		var tempLoginPass1 = tempLoginPass1.slice(0, -2);

		console.log("loginEmailData: " + tempLoginUser1);
		console.log("loginPasswordData: " + tempLoginPass1);

		// ==== NEW CODE
		// GET request using fetch with error handling
		await fetch("/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userName: tempLoginUser1,
				password: tempLoginPass1,
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

				// local storage setting
				var returnerId = data.map((object) => object.id);
				var returnerUserName = data.map((object) => object.userName);
				var returnerFirstName = data.map((object) => object.firstName);
				var returnerLastName = data.map((object) => object.lastName);
				var returnerSalt = data.map((object) => object.salt);
				var returnerPasswordHash = data.map((object) => object.passwordHash);
				var returnerPhoneNumber = data.map((object) => object.phoneNumber);
				var returnerAddress = data.map((object) => object.address);
				var returnerLastLocation = data.map((object) => object.lastLocation);
				var returnerBookingList = data.map((object) => object.lastLocation);

				miniDetails.push(returnerUserName);
				miniDetails.push(returnerFirstName);
				miniDetails.push(returnerLastName);
				miniDetails.push(returnerPhoneNumber);
			})

			// react catch
			.catch((error) => {
				console.error("LOGIN ERROR: ", error.toString());
			});

		setUserDetails(miniDetails);

		return miniDetails;
	}

	// changing password
	function changingPassword() {
		// old password and the password that the user inputted dont match
		var inputPassword =
			'"' + document.getElementById("old-password").value + '"';
		if (inputPassword != loginPasswordData) {
			alert("Incorrect old password.");
		}

		// new password and the password that the user inputted dont match
		else if (
			document.getElementById("new-password").value !=
			document.getElementById("confirm-password").value
		) {
			alert("New password and confirm password don't match.");
		}

		// old password and new password are the same
		else if (
			document.getElementById("old-password").value ==
			document.getElementById("new-password").value
		) {
			alert("Old password and new password cannot be the same.");
		}

		// no errors, display success message
		else {
			injectPassword();
			alert("Password successfully changed.");
		}
	}

	// injecting new password into db
	async function injectPassword() {
		// creating json file to be fed into parameter
		const loginCredentials = [
			{
				userName: document.getElementById("username").value,
				password: document.getElementById("new-password").value,
			},
		];

		// retrieving list of users from backend
		await fetch("/changePassword", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: loginCredentials,
		}).then((response) => {
			if (response.ok) {
				alert("BACKEND ERROR");
			} else {
				this.setState({ successMessage: "Password successfully changed." });
			}
		});
	}

	// used for redirecting to apply for position page
	const history = useHistory();
	function handleClick() {
		history.push("/applyForPosition");
	}

	return (
		<div className='container-fluid text-center'>
			<h1>Account Management Section</h1>

			<div id='accountmng-row' className='row'>
				{/* Displaying buttons to control right div page loading */}
				<div id='accountmng-col' className='col-md-3'>
					<div className='left-panel-header'>
						<h3>Side Panel</h3>
					</div>

					{/* All buttons to control right div */}
					<div className='btn-group-vertical'>
						<button
							className='controller-button'
							onClick={controlViewBookings}
							id='viewBookings'
							value='viewBookings'
						>
							<Icon.JournalBookmarkFill />{" "}
							<span className='icon-spacer'>View Bookings</span>
						</button>
						<button
							className='controller-button'
							onClick={controlMyDetails}
							id='myDetails'
							value='myDetails'
						>
							<Icon.PersonCircle />{" "}
							<span className='icon-spacer'>My Details</span>
						</button>
						<button
							className='controller-button'
							onClick={controlChangePassword}
							id='changePassword'
							value='changePassword'
						>
							<Icon.KeyFill />{" "}
							<span className='icon-spacer'>Change Password</span>
						</button>
						<button className='controller-button' onClick={handleClick}>
							<Icon.KeyFill />{" "}
							<span className='icon-spacer'>
								Request Admin/Flight Agent Permissions
							</span>
						</button>
					</div>
				</div>

				{/* display depending on user selection */}
				<div id='accountmng-content-col' className='col-md-9'>
					{
						// user clicked on My Details button
						openMyDetails === true ? (
							<div>
								<div className='right-panel-header'>
									<h3>Account Details</h3>
								</div>

								{/* setting LHS for details */}
								<div className='account-detail-parent'>
									<div className='account-detail-left'>
										<p>ID: </p>
										<p>E-mail: </p>
										<p>First name: </p>
										<p>Last name: </p>
										<p>Phone: </p>
										<p>Address: </p>
										<p>Password: </p>
									</div>

									{/* iterate through everything in userDetails array and render on new line */}
									<div className='account-detail-right'>
										{userDetails.map((reptile) => (
											<p>{reptile}</p>
										))}
									</div>
								</div>
							</div>
						) : null
					}
					{
						// user clicked on Change Password button
						openChangePassword === true ? (
							<div>
								<div className='right-panel-header'>
									<h3>Change Password</h3>
								</div>

								<form>
									<div className='account-detail-parent'>
										{/* labels */}
										<div className='account-detail-left'>
											<label className='labeller'>Old password: </label>{" "}
											<br></br>
											<label className='labeller'>New password: </label>{" "}
											<br></br>
											<label className='labeller'>Confirm new password: </label>
										</div>

										{/* input text fields */}
										<div className='account-detail-right'>
											<input
												className='inputter'
												id='old-password'
												type='password'
											></input>{" "}
											<br></br>
											<input
												className='inputter'
												id='new-password'
												type='password'
											></input>{" "}
											<br></br>
											<input
												className='inputter'
												id='confirm-password'
												type='password'
											></input>
										</div>
									</div>

									{/* divs were off in height by 1 pixel otherwise css places button on {float: right;} */}
									<br></br>
									<br></br>
									<br></br>
									<br></br>
									<br></br>
									<br></br>
									<br></br>
									<br></br>
									<br></br>
									<div className='button-placement'>
										<input
											className='btn-changePassword'
											onClick={changingPassword}
											type='submit'
											value='Change password'
										></input>
									</div>
								</form>
							</div>
						) : null
					}
					{
						// user clicked on View Bookings button
						openViewBookings === true ? (
							<div>
								<div className='right-panel-header'>
									<h3>My Bookings</h3>
								</div>

								<div className='account-detail-parent'>
									{/* setting LHS for details */}
									<div className='account-detail-middle'>
										<Bookings />
									</div>
								</div>
							</div>
						) : null
					}
				</div>
			</div>
		</div>
	);
};

export default AccountManagement;
