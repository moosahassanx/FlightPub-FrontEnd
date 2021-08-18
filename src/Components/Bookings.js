import {useState, useEffect} from 'react'
import { Card, Row, Col} from 'react-bootstrap';

const Bookings = () => {
   
    const loginNameData = localStorage.getItem('user-login-name');
    const loginLastNameData = localStorage.getItem('user-login-last-name');
    const loginEmailData = localStorage.getItem('user-login-email');
    const [userId, setUserId] = useState();
    const [bookings, setBookings] = useState();

    //useEffect to fetch the user bookings
    useEffect(() => {
        let email = JSON.parse(loginEmailData)
        console.log(email[0])
        let url = `http://localhost:8080/getDetails?userName=${email[0]}`
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            setUserId(data.id);
        })   
    }, [])

    useEffect(() => {
        if(userId){
            let url = `http://localhost:8080/findBookings?userId=${userId}`
            fetch(url)
            .then(response => response.json())
            .then(data =>{
                setBookings(data);
            })   
        }
    }, [userId])

    //converts UTC date to local date and time
    const localTime = (date) =>{
        return new Date(date).toLocaleString()
    }
    return (
        <div className="container-fluid text-center">
               {bookings?
                    <>
                    {console.log(bookings)}
                        {bookings.map((booking, i)=>{     
                            return(  
                                <>         
                                    <Card key={i} className="font-weight-bold mx-2 mb-4">
                                        <Card.Body>
                                            <Card.Text className="mx-2 mb-4">
                                                <Row>
                                                    <Col>
                                                        Booking reference number: {booking.bookId}<br/><br/>
                                                        Passenger name: {booking.user.firstName} {booking.user.lastName}<br/><br/>
                                                        Flight number: {booking.flight_number}<br/><br/>
                                                    </Col>
                                                    <Col>
                                                        Departs from: {booking.flight.departureCode.airport}<br/><br/>
                                                        Departs at: {localTime(booking.flight.departureTime)}<br/><br/>
                                                        Arrives at: {booking.flight.destinationCode.airport}<br/><br/>
                                                        Arrives at: {localTime(booking.flight.arrivalTime)}<br/><br/>
                                                    </Col>
                                                    <Col>
                                                        Ticket price: ${booking.paymentId.price}<br/><br/>
                                                    </Col>
                                                </Row>
                                        </Card.Text>
                                        </Card.Body>
                                    </Card>                    
                                    {/* <div className='account-detail-left' key={i}>
                                        <p>Flight number: </p>
                                        <p>Departure: </p>
                                        <p>Arrival: </p>
                                    </div> */}

                                    {/* retrieving and rendering details */}
                                    {/* <div className='account-detail-right' key={i}>
                                        <p>{booking.flight_number} </p>
                                        <p>{booking.flight.departureCode.airport} </p>
                                        <p>{booking.flight.destinationCode.airport} </p>
                                    </div>
                                    <br/> */}
                                </>
                            )
                        })}
                    </>
                    :
                    <div>
                        You not booked any flights. Visit our Discovery sections for suggestions. 
                    </div>
                }
        </div>
    )
}

export default Bookings;