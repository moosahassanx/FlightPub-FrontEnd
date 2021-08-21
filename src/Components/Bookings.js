import { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";

const Bookings = () => {
	const loginNameData = localStorage.getItem("user-login-name");
	const loginLastNameData = localStorage.getItem("user-login-last-name");
	const loginEmailData = localStorage.getItem("user-login-email");
	const [userId, setUserId] = useState();
	const [bookings, setBookings] = useState();

	//useEffect to fetch logged in user details on component mount
	useEffect(() => {
		let email = JSON.parse(loginEmailData);
		console.log(email[0]);
		let url = `/getDetails?userName=${email[0]}`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setUserId(data.id);
			});
	}, []);

	//useEffect to fetch the list of user bookings once the userId becomes available
	useEffect(() => {
		if (userId) {
			let url = `/findBookings?userId=${userId}`;
			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					setBookings(data);
				});
		}
	}, [userId]);

	//converts UTC date to local date and time
	const localTime = (date) => {
		return new Date(date).toLocaleString();
	};
	return (
		<div className='container-fluid text-center'>
			{bookings ? ( //check if the booking list is available or not
				<>
					{bookings.map((booking, i) => {
						//if there are bookings then loop through them to render the content in cards
						return (
							<>
								<Card key={i} className='font-weight-bold mx-2 mb-4'>
									<Card.Body>
										<Card.Text className='mx-2 mb-4'>
											<Row>
												<Col>
													Booking reference number: {booking.bookId}
													<br />
													<br />
													Passenger name:{" "}
													{booking.guestUser !== null
														? booking.guestUser.firstName +
														  booking.guestUser.lastName
														: booking.user.firstName + booking.user.lastName}
													<br />
													<br />
													Flight number: {booking.flight_number}
													<br />
													<br />
												</Col>
												<Col>
													Departs from: {booking.flight.departureCode.airport}
													<br />
													<br />
													Departs at: {localTime(booking.flight.departureTime)}
													<br />
													<br />
													Arrives at: {booking.flight.destinationCode.airport}
													<br />
													<br />
													Arrives at: {localTime(booking.flight.arrivalTime)}
													<br />
													<br />
												</Col>
												<Col>
													Ticket price: ${booking.paymentId.price}
													<br />
													<br />
												</Col>
											</Row>
										</Card.Text>
									</Card.Body>
								</Card>
							</>
						);
					})}
				</>
			) : (
				//if the user has no bookings then display this message
				<div>
					You have not booked any flights. Visit our Discovery sections for
					suggestions.
				</div>
			)}
		</div>
	);
};

export default Bookings;
