import React, { useEffect, useState } from "react";
import {
	Card,
	ButtonGroup,
	Button,
	ToggleButton,
	Tooltip,
	OverlayTrigger,
} from "react-bootstrap";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";

//this component is to be extended with booking, and also a filter and sort options are also to be implemented
//this component recieves the flight data (JSON object array) as props
const FlightCard = (props) => {
	//setting the props to internal component variables for easier use
	const flight = props.oneWayData;
	const returnFlight = props.returnData;
	const tripType = props.trip;
	const numberOfTravellers = props.numberOfTravellrs;
	const tClass = props.tType;

	const [selectedFlight, setSelectedFlight] = useState();
	const [selectedRetuenFlight, setSelectedRetuenFlight] = useState();
	const popover = (props) => (
		<Tooltip id='button-tooltip' {...props}>
			You’re seeing this ad based on the flight’s relevance to your search
			query.
		</Tooltip>
	);
	useEffect(() => {
		setSelectedFlight();
		setSelectedRetuenFlight();
		sessionStorage.clear();
	}, [props]);

	useEffect(() => {
		sessionStorage.setItem("flight", JSON.stringify(selectedFlight));
		sessionStorage.setItem("passNum", numberOfTravellers);
		sessionStorage.setItem("ticketClass", tClass);
		if (selectedRetuenFlight)
			sessionStorage.setItem(
				"returnFlight",
				JSON.stringify(selectedRetuenFlight)
			);
	}, [selectedFlight, selectedRetuenFlight]);

	const handleSelectedFlight = (data, e) => {
		if (data === selectedFlight) {
			setSelectedFlight();
		} else {
			setSelectedFlight(data);
		}
		e.preventDefault();
	};
	const handleSReturnSlectedFlight = (data, e) => {
		if (data === selectedRetuenFlight) {
			setSelectedRetuenFlight();
		} else {
			setSelectedRetuenFlight(data);
		}
		e.preventDefault();
	};
	//converts the duration of the flight from minutes to hours and minutes
	function timeConvert(n) {
		var num = n;
		var hours = num / 60;
		var rhours = Math.floor(hours);
		var minutes = (hours - rhours) * 60;
		var rminutes = Math.round(minutes);
		return rhours + "h " + rminutes;
	}
	//converts the ISOString date recieved from the backend to a local formatted date appropriate for displaying
	function formatDate(d) {
		var date = new Date(d).toLocaleDateString();
		return date;
	}

	//recieves the ISOString date and returns the time portion only
	function getTime(t) {
		var time = new Date(t).toLocaleTimeString();
		return time;
	}

	function createBookButton(isReturn, flight) {
		return isReturn ? (
			<ToggleButton
				type='checkbox'
				variant='outline-dark'
				onClick={(e) => handleSReturnSlectedFlight(flight, e)}
				checked={selectedRetuenFlight ? flight === selectedRetuenFlight : false}
			>
				{" "}
				Select Return Flight
			</ToggleButton>
		) : (
			<ToggleButton
				type='checkbox'
				variant='outline-dark'
				onClick={(e) => handleSelectedFlight(flight, e)}
				checked={selectedFlight ? flight === selectedFlight : false}
			>
				{" "}
				Select Flight
			</ToggleButton>
		);
	}

	// function isLoading(){
	//         if(selectedFlight != NULL && selectedRetuenFlight != NULL){
	//             return(true)
	//     }
	//         else
	//             return(false)
	//     }

	//this will map the flightData object array into cards and display the needed information for each flight found
	const renderFlight = (data, isReturn) => {
		var flightData = data;
		return [
			<>
				<ButtonGroup size='lg' className='mb-4 d-flex flex-column'>
					{flightData.map((item, index) => {
						return (
							<Card key={index}>
								<Card.Header as='h5'>
									{item.airlineCode.airlineName}&emsp;Flight {item.flightNumber}{" "}
									<br />
									{/* {console.log(item)} */}
									{item.airlineCode.sponsored && (
										<OverlayTrigger
											placement='top'
											delay={{ show: 250, hide: 400 }}
											overlay={popover}
										>
											<div
												className='float-right font-weight-light'
												style={{
													cursor: "pointer",
													":hover": { background: "orange" },
												}}
											>
												Sponsored <BsFillInfoCircleFill />
											</div>
										</OverlayTrigger>
									)}
								</Card.Header>
								<Card.Body>
									<Card.Title>
										<FaPlaneDeparture /> {item.departureCode.destinationCode},{" "}
										{item.departureCode.countryCode3.countryName}
										&emsp;&emsp;&emsp;
										<FaPlaneArrival /> {
											item.destinationCode.destinationCode
										}, {item.destinationCode.countryCode3.countryName}{" "}
									</Card.Title>
									<Card.Text>
										Departure Date: {formatDate(item.departureTime)}
										&emsp;&emsp;&emsp;Arrival Date:{" "}
										{formatDate(item.arrivalTime)}
										<br />
										Departure Time: {getTime(item.departureTime)}
										&emsp;&emsp;&emsp;Arrival Time {getTime(
											item.arrivalTime
										)}{" "}
										<br />
										<b>
											{item.stopOverCode &&
												"Stop over location: " +
													item.stopOverCode.airport +
													", " +
													item.stopOverCode.countryCode3.countryName}
										</b>
										<br />
										{item.stopOverCode &&
											"Arrival date stop over: " +
												formatDate(item.arrivalTimeStopOver)}
										&emsp;&emsp;&emsp;
										{item.stopOverCode &&
											"Departure date stop over: " +
												formatDate(item.departureTimeStopOver)}
										<br />
										{item.stopOverCode &&
											"Arrival time stop over: " +
												getTime(item.arrivalTimeStopOver)}
										&emsp;&emsp;&emsp;
										{item.stopOverCode &&
											"Departure time stop over: " +
												getTime(item.departureTimeStopOver)}
										<br />
										Duration:{" "}
										{timeConvert(item.duration + item.durationSecondLeg)}
										<br />
										Plane type: {item.planeType.details} <br />
										Price from ${item.price}
									</Card.Text>
									{createBookButton(isReturn, item)}
								</Card.Body>
							</Card>
						);
					})}
				</ButtonGroup>
			</>,
		];
	};
	//if flightData && returnFlight == null then display no search results
	//if flightData != null && returnFlight ==null then display one-way search
	//else if both have data then display both tickets
	//if tripType == return but one or both data variables are null then disply message
	//include a way to get to the booking form from each flight card

	//checks if there are any flights found, whether the flight is one way or return, if both flights found when the trip type is return-
	//and render the results based on that to prevent errors
	const renderContent = () => {
		if (flight.length === 0 && tripType === "One-Way") {
			return [<h3>No Results have been found</h3>];
		}
		if (returnFlight.length === 0 && flight.length === 0) {
			return [<h3>No Results have been found</h3>];
		}
		if (tripType === "One-Way") {
			return [
				<>
					<h2>Flights to {flight[0].destinationCode.airport}</h2>
					{renderFlight(flight)}
				</>,
			];
		}
		if (tripType === "Return") {
			if (flight.length === 0) {
				return [
					<>
						<h2>
							No flights found to {returnFlight[0].destinationCode.airport} at
							the selected date
						</h2>
						<h2>Return FLights to {returnFlight[0].departureCode.airport}</h2>
						{renderFlight(returnFlight, false)}
					</>,
				];
			}
			if (returnFlight.length === 0) {
				return [
					<>
						<h2>Flights found to {flight[0].destinationCode.airport}</h2>
						{renderFlight(flight, false)}
						<h2>
							No return flights found to {flight[0].departureCode.airport} at
							the selected date
						</h2>
					</>,
				];
			} else {
				return [
					<>
						<h2>Flights to {flight[0].destinationCode.airport}</h2>
						{renderFlight(flight, false)}
						<h2>Return flights to {returnFlight[0].destinationCode.airport}</h2>
						{renderFlight(returnFlight, true)}
					</>,
				];
			}
		}
	};
	//displays text and then calls the function renderContent to decide what to render to the user based on the search results
	return (
		<div className='container-fluid text-center'>
			<h1>Search Results</h1>
			{renderContent()}
			<br />
			<Button
				variant='primary'
				onClick={(event) => (window.location.href = "/TicketSelectionPage")}
				disabled={!selectedFlight && !selectedRetuenFlight}
			>
				Continue to Booking
			</Button>
		</div>
	);
};

export default FlightCard;
