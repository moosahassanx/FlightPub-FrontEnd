import "../Css/Groups.css";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { ListGroup, Button, Form, ListGroupItem } from "react-bootstrap";
import { useEffect, useState } from "react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

// MAP OPTIONS
// const center = {
// 	lat: 22,
// 	lng: 11,
// };
const containerStyle = {
	width: "100%",
	height: "100%",
};

const API_Key = "AIzaSyDE4QqTEwYOVTFexogb-Aj7KWkex3ize4A";

const Groups = () => {
	// Checking if the local storage has any users
	// If not sets to an empty array - this stop trying to map a non-entity
	const users = JSON.parse(localStorage.getItem("user-group")) || [];
	const localStorarageMarkers =
		JSON.parse(localStorage.getItem("user-markers")) || [];
	const loggedEmail =
		JSON.parse(localStorage.getItem("user-login-email")) || null;
	// Various states
	const [selected, setSelected] = useState();
	const [userInput, setUserInput] = useState("");
	const [userGroup, setUserGroup] = useState(users);
	const [markers, setMarkers] = useState(localStorarageMarkers);
	const [locations, setLocations] = useState([]);
	const [image, setImage] = useState();
	const [selectedLocation, setSelectedLocation] = useState();
	const [email, setEmail] = useState(loggedEmail);
	const [center, setCenter] = useState({
		lat: 22,
		lng: 11,
	});
	async function getLocations(userName) {
		var url = `/getUserHistory?userName=${userName}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				let arr = data.concat(locations);
				setLocations(arr);
			});
	}
	useEffect(() => {
		if (userGroup.length > 0) {
			userGroup.forEach((user) => {
				getLocations(user.username);
			});
		}
	}, []);
	useEffect(() => {
		if (locations.length > 0) {
			locations.forEach((location) => {
				geocodeByAddress(
					`${location.flight.destinationCode.airport}, ${location.flight.destinationCode.countryCode3.countryName}`
				)
					.then((results) => getLatLng(results[0]))
					.then((res) => {
						location.geoLoc = res;
						setCenter(res);
					});
			});
		}
		setLocations(locations);
	}, [locations]);
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

			await fetch("/checkExists?username=" + userInput)
				.then((res) => res.json())
				.then((json) => setMarkers(json));
			getLocations(userInput);
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
		let arr = locations.filter((location) => {
			if (location.user.userName !== selected) {
				return location;
			}
		});
		setLocations(arr);
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
	async function getPlacePhotoRef(place) {
		let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${place}&inputtype=textquery&fields=photos&key=${API_Key}`;
		return await fetch(url).then((response) => response.json());
	}
	async function getPlacePhoto(placeRef) {
		let url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxwidth=400&photo_reference=${placeRef}&key=${API_Key}`;
		const imageURLQuery = await fetch(url)
			.then((r) => r.blob())
			.catch(console.error);
		setImage(URL.createObjectURL(imageURLQuery));
	}
	const renderLocation = (location) => {
		getPlacePhotoRef(location.airport)
			.then((data) => {
				getPlacePhoto(data);
			})
			.catch((error) => console.log(error));
		setSelectedLocation(location);
	};
	async function handleWishlist() {
		let url =
			`/newWishlistItem?user_name=` +
			email[0] +
			`&countryCode3=` +
			selectedLocation.destinationCode;
		await fetch(url).then((response) => console.log(response));
	}
	return (
		// Container holdering all page content
		// 1 row and 2 cols
		// Left col holding the group of users functionality
		// Right col holding the map component
		// Currently correct lat and long for users are being stored
		// Unable to map through and place user markers on map - Current makrer is a dummy marker
		<div id='main-container-groups' className='container-fluid text-center'>
			<h1>Groups</h1>
			<h3>
				To discover the locations visted by your friends, enter their user name
				below
			</h3>
			<p>
				Please note that your friend must agree to share their visted locations
				in their account settings
			</p>
			<div id='content-row' className='row'>
				<div id='list-col' className='col-md-4'>
					<h2> Added users</h2>

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
						<br />
						<div className='map-col border'>
							{selectedLocation && (
								<>
									{selectedLocation.airport},{" "}
									{selectedLocation.countryCode3.countryName}
									<br />
									{image && <>{image}</>}
									This destination is popular for: {selectedLocation.tags}
									{email !== null && (
										<>
											<Button
												variant='primary'
												size='lg'
												onClick={handleWishlist}
												block
											>
												Add to wishlist
											</Button>
										</>
									)}
								</>
							)}
						</div>
					</Form>
				</div>
				<div id='map-col' className='col-md-8'>
					<GoogleMap
						mapContainerStyle={containerStyle}
						zoom={1}
						center={center}
						key={API_Key}
					>
						{locations.map((location, i) => {
							return (
								<>
									{location.geoLoc && (
										<Marker
											key={API_Key}
											position={location.geoLoc}
											label={`${location.user.userName}`}
											onClick={(event) =>
												renderLocation(location.flight.destinationCode)
											}
										/>
									)}
								</>
							);
						})}
						{/* <Marker
							key='AIzaSyDE4QqTEwYOVTFexogb-Aj7KWkex3ize4A'
							position={{ lat: 34, lng: 123 }}
						/> */}
					</GoogleMap>
				</div>
			</div>
		</div>
	);
};

export default Groups;
