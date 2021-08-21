import React, { useState, useEffect } from "react";
import { Steps } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import {
	Card,
	Spinner,
	Button,
	ToggleButton,
	ButtonToolbar,
} from "react-bootstrap";

const TicketSelectionPage = () => {
	//state variables to store the tickets available, flights and the user selections
	const [flight, setFlight] = useState();
	const [returnFlight, setReturnFlight] = useState();
	const [ticketClass, setTicketClass] = useState();
	const [numberOfTravellers, setNumberOfTravellers] = useState();
	const [flightTickets, setFlightTickets] = useState([]);
	const [returnTickets, setReturnTickets] = useState([]);
	const [selectedTicket, setSelectedTicket] = useState();
	const [selectedReTicket, setSelectedReTicket] = useState();
	const [loading, setLoading] = useState(true);
	//progress steps settings
	const instance = (
		<Steps current={0}>
			<Steps.Item
				title='Ticket Selection '
				onClick={(event) => (window.location.href = "/TicketSelectionPage")}
			/>
			<Steps.Item title='Passenger Details ' />
			<Steps.Item title='Payment' />
			<Steps.Item title='Booking Confirmation ' />
		</Steps>
	);

	//fetches the tickets available for the flight selected
	async function getTicketData(flightInfo) {
		let d = new Date(flightInfo.departureTime);
		let url = `/getticketprice?fnum=${
			flightInfo.flightNumber
		}&tCode=${
			flightInfo.ticketType.ticketCode
		}&tclass=${ticketClass}&depdate=${d.toISOString()}`;
		return await fetch(url).then((response) => response.json());
	}

	//checks for the available tickets for each flight
	async function getFlightAvailblity(flight) {
		let d = new Date(flight.departureTime);
		var url = `/getAvailability?depTime=${d.toJSON()}&flightNum=${
			flight.flightNumber
		}&depSeats=${numberOfTravellers}&class=${ticketClass}`;
		return await fetch(url).then((response) => response.json());
	}

	//fucntion recieves an int represesnting wether the tickets to be fetched are for the flight to the destination or the return flight
	async function getTickets(num) {
		if (num === 1) {
			getFlightAvailblity(flight).then((data) => {
				Promise.all(
					data.map((flight) => {
						getTicketData(flight).then((data) => {
							setFlightTickets((old) => [...old, data]);
						});
					})
				);
			});
		} else {
			getFlightAvailblity(returnFlight).then((data) => {
				Promise.all(
					data.map((flight) => {
						getTicketData(flight).then((data) => {
							setReturnTickets((old) => [...old, data]);
						});
					})
				);
			});
		}
	}

	//on component mount the get the selected flights from session storage
	useEffect(() => {
		setLoading(true);
		let data = sessionStorage.getItem("returnFlight");
		let data2 = sessionStorage.getItem("flight");
		if (data === null && data2 === null) {
			//if there are no flights selected then redirect the user to the home page
			window.location.href = "/";
		}
		if (data != null) {
			setReturnFlight(JSON.parse(sessionStorage.getItem("returnFlight")));
			setFlight(JSON.parse(sessionStorage.getItem("flight")));
			setTicketClass(sessionStorage.getItem("ticketClass"));
			setNumberOfTravellers(sessionStorage.getItem("passNum"));
		} else {
			setFlight(JSON.parse(sessionStorage.getItem("flight")));
			setTicketClass(sessionStorage.getItem("ticketClass"));
			setNumberOfTravellers(sessionStorage.getItem("passNum"));
		}
	}, []);

	//once the flights selected are successfully parsed from session storage, a call is made to the getTickets function
	useEffect(() => {
		if (returnFlight && flight) {
			getTickets(1);
			getTickets(2).then(setLoading(false));
		} else if (flight && !returnFlight) {
			getTickets(1).then(setLoading(false));
		}
	}, [returnFlight, flight]);

	//once a selection is made set the selection to the session storage
	useEffect(() => {
		sessionStorage.setItem("ticket", JSON.stringify(selectedTicket));
		if (selectedReTicket)
			sessionStorage.setItem("returnTicket", JSON.stringify(selectedReTicket));
	}, [selectedReTicket, selectedTicket]);
	//sets the selected ticket to the state so that it is set in the session storage
	const handleSelectedTicket = (data, e) => {
		if (data === selectedTicket) {
			setSelectedTicket();
		} else {
			setSelectedTicket(data);
		}
		e.preventDefault();
	};
	//sets the selected ticket to the state so that it is set in the session storage
	const handleReSelectedticket = (data, e) => {
		if (data === selectedReTicket) {
			setSelectedReTicket();
		} else {
			setSelectedReTicket(data);
		}
		e.preventDefault();
	};

	//a button is created for each ticket available which recieves the ticket info and a boolean representing if the ticket is for a return flight or not
	function createBookButton(isReturn, ticket) {
		return isReturn ? (
			<ToggleButton
				type='checkbox'
				variant='outline-dark'
				onClick={(e) => handleReSelectedticket(ticket, e)}
				checked={selectedReTicket ? ticket === selectedReTicket : false}
			>
				{" "}
				Select Return Ticket
			</ToggleButton>
		) : (
			<ToggleButton
				type='checkbox'
				variant='outline-dark'
				onClick={(e) => handleSelectedTicket(ticket, e)}
				checked={selectedTicket ? ticket === selectedTicket : false}
			>
				{" "}
				Select Ticket
			</ToggleButton>
		);
	}
	//rendering the found tickets
	const renderContent = () => {
		if (!loading && flightTickets) {
			return [
				<>
					<h2>
						Flight {flight.flightNumber} &emsp; <FaPlaneDeparture />{" "}
						{flight.departureCode.airport},{" "}
						{flight.departureCode.countryCode3.countryName} &emsp;
						<FaPlaneArrival /> {flight.destinationCode.airport},{" "}
						{flight.destinationCode.countryCode3.countryName} <br />{" "}
					</h2>
					<h3>Please select the desired ticket type for your flight</h3>
					<ButtonToolbar
						size='lg'
						className='mb-4 d-flex justify-content-center'
					>
						{flightTickets.map((item, index) => {
							return (
								<Card key={index}>
									<Card.Header as='h5'>{item.ticketType.name}</Card.Header>
									<Card.Body>
										<Card.Title>Total ${item.totalPrice}</Card.Title>
										<Card.Text>
											{item.ticketType.exchangeable
												? "Exchangeable"
												: "Non-Exchangeable"}{" "}
											<br />
											Frequent Flyer Points:{" "}
											{item.ticketType.frequentFlyerPoints ? "Yes" : "No"}{" "}
											<br />
											{item.ticketType.refundable
												? "Refundable"
												: "Non-Refundable"}{" "}
											<br />
											{item.ticketType.transferable
												? "Transferable"
												: "Non-Transferable"}{" "}
											<br />
											{item.priceLeg1
												? "Leg 1 Price $" + item.priceLeg1
												: ""}{" "}
											<br />
											{item.priceLeg2 ? "Leg 2 Price $" + item.priceLeg2 : ""}
										</Card.Text>
										{createBookButton(false, item)}
									</Card.Body>
								</Card>
							);
						})}
					</ButtonToolbar>
					{returnTickets && returnFlight && (
						<>
							<h2>
								{" "}
								Return Flight {returnFlight.flightNumber} &emsp;{" "}
								<FaPlaneDeparture /> {returnFlight.departureCode.airport},{" "}
								{returnFlight.departureCode.countryCode3.countryName} &emsp;
								<FaPlaneArrival /> {returnFlight.destinationCode.airport},{" "}
								{returnFlight.destinationCode.countryCode3.countryName}{" "}
							</h2>
							<ButtonToolbar
								size='lg'
								className='mb-4 d-flex justify-content-center'
							>
								{returnTickets.map((item, index) => {
									return (
										<Card key={index}>
											<Card.Header as='h5'>{item.ticketType.name}</Card.Header>
											<Card.Body>
												<Card.Title>Total ${item.totalPrice}</Card.Title>
												<Card.Text>
													{item.ticketType.exchangeable
														? "Exchangeable"
														: "Non-Exchangeable"}{" "}
													<br />
													Frequent Flyer Points:{" "}
													{item.ticketType.frequentFlyerPoints
														? "Yes"
														: "No"}{" "}
													<br />
													{item.ticketType.refundable
														? "Refundable"
														: "Non-Refundable"}{" "}
													<br />
													{item.ticketType.transferable
														? "Transferable"
														: "Non-Transferable"}{" "}
													<br />
													{item.priceLeg1
														? "Leg 1 Price $" + item.priceLeg1
														: ""}{" "}
													<br />
													{item.priceLeg2
														? "Leg 2 Price $" + item.priceLeg2
														: ""}
												</Card.Text>
												{createBookButton(true, item)}
											</Card.Body>
										</Card>
									);
								})}
							</ButtonToolbar>
						</>
					)}
				</>,
			];
		} else {
			return [<Spinner animation='border' />];
		}
	};

	return (
		<div className='container-fluid text-center'>
			<br />
			{instance} <br />
			<h1>Ticket Selection</h1>
			{renderContent()}
			<Button
				variant='primary'
				onClick={(event) => (window.location.href = "/Booking")}
				disabled={!selectedTicket || (returnFlight ? !selectedReTicket : false)}
			>
				Next
			</Button>
		</div>
	);
};

export default TicketSelectionPage;
