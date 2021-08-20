import "../Css/Groups.css";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { ListGroup, Button, Form, ListGroupItem } from "react-bootstrap";
import { useEffect, useState } from "react";

// MAP OPTIONS
const center = {
	lat: 22,
	lng: 11,
};
const containerStyle = {
	width: "100%",
	height: "100%",
};

const Groups = () => {
	// Checking if the local storage has any users
	// If not sets to an empty array - this stop trying to map a non-entity
	const users = JSON.parse(localStorage.getItem("user-group")) || [];
	const localStorarageMarkers =
		JSON.parse(localStorage.getItem("user-markers")) || [];

	// Various states
	const [selected, setSelected] = useState();
	const [userInput, setUserInput] = useState("");
	const [userGroup, setUserGroup] = useState(users);
	const [markers, setMarkers] = useState(localStorarageMarkers);

	// Updates localstorage when ever a user is added or removed
	useEffect(() => {
		localStorage.setItem("user-group", JSON.stringify(userGroup));
	}, [userGroup]);

	useEffect(() => {
		localStorage.setItem("user-markers", JSON.stringify(markers));
	}, [userGroup]);

	// Handle adding users to group
	async function handleClick() {
		let newUserGroup = [...userGroup];

		// Splitting string, this is the index of the users lat and long markers
		var test = userInput.substr(0, userInput.indexOf("@"));

		if (
			!newUserGroup.some((e) => e.username === userInput) &&
			userInput !== ""
		) {
			// async fetch to see if the user exists in the database

			await fetch("http://localhost:8080/checkExists?username=" + userInput)
				.then((res) => res.json())
				.then((json) => setMarkers(json));

			newUserGroup.push({
				username: userInput,
			});
			setUserGroup(newUserGroup);
			setUserInput("");
		}
	}

	// Handles removing a selected user
	const handleRemove = () => {
		let newUserGroup = [...userGroup];

		let find = newUserGroup.find((x) => x.username === selected);
		let index = newUserGroup.indexOf(find);

		newUserGroup.splice(index, 1);

		setMarkers([]);
		setUserGroup(newUserGroup);
	};

	// Handles user selected an item and updates the selected state
	const handleClick1 = (e) => {
		setSelected(e);
	};

	return (
		// Container holdering all page content
		// 1 row and 2 cols
		// Left col holding the group of users functionality
		// Right col holding the map component
		// Currently correct lat and long for users are being stored
		// Unable to map through and place user markers on map - Current makrer is a dummy marker
		<div id='main-container-groups' className='container-fluid text-center'>
			<h1>Main container</h1>
			<div id='content-row' className='row'>
				<div id='list-col' className='col-md-4'>
					<h2> Group List Container</h2>

					<div id='list-group' className='row justify-content-center'>
						<ListGroup variant='flush'>
							{userGroup?.map((users) => (
								<ListGroupItem
									action
									onClick={() => handleClick1(users.username)}
								>
									{users.username}
								</ListGroupItem>
							))}
						</ListGroup>
					</div>
					<Form>
						<div id='email-row-form' className='row'>
							<Form.Control
								type='email'
								placeholder='Enter your friends email'
								onChange={(e) => setUserInput(e.target.value)}
								value={userInput}
							></Form.Control>
						</div>
						<div id='button-row-form' className='row'>
							<div className='col-lg-6'>
								<Button variant='primary' size='lg' onClick={handleClick} block>
									Add
								</Button>
							</div>
							<div className='col-lg-6'>
								<Button variant='danger' size='lg' onClick={handleRemove} block>
									Remove
								</Button>
							</div>
						</div>
					</Form>
				</div>

				<div id='map-col' className='col-md-8'>
					<GoogleMap
						mapContainerStyle={containerStyle}
						zoom={2}
						center={center}
						key='AIzaSyDE4QqTEwYOVTFexogb-Aj7KWkex3ize4A'
					>
						<Marker
							key='AIzaSyDE4QqTEwYOVTFexogb-Aj7KWkex3ize4A'
							position={{ lat: 34, lng: 123 }}
						/>
					</GoogleMap>
				</div>
			</div>
		</div>
	);
};

export default Groups;
