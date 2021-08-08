<<<<<<< Updated upstream
import React from 'react';
import emailjs from 'emailjs-com';
//npm install emailjs-com   packge u need to install


const ConfirmPage = () => {

    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('service_2nhmpca', 'template_2rpfqmj', e.target, 'user_fmaqudfaRrfYGcKlP1RNh')
          .then((result) => {
              window.location.reload() 
          }, (error) => {
              console.log(error.text);
          });
      }
    

=======
import React, { useState, useEffect }  from 'react';
import { Steps } from 'rsuite';
import { Card, Row, Col, Button } from 'react-bootstrap';
import 'rsuite/dist/styles/rsuite-default.css';




const ConfirmPage = () => {
    const [bookings, setBookings] = useState([])
    const instance = (
        <Steps current={3} style={{cursor: "pointer"}}>
            <Steps.Item title="Ticket Selection "/>
            <Steps.Item title="Passenger Details "/>
            <Steps.Item title='Payment'/>
            <Steps.Item title="Booking Confirmation "/>
        </Steps>
      );

    useEffect(() => {
        setBookings(JSON.parse(sessionStorage.getItem("bookId")))
    }, [])

    const localTime = (date) =>{
        return new Date(date).toLocaleString()
    }
>>>>>>> Stashed changes
    return(
        <div className="container-fluid text-center">
            <br/>{instance} <br />
            <h1>Thank you for booking with FlightPub</h1>
            <h3>The following bookings have been confirmed</h3>
            {bookings &&
                <>
                    {bookings.map((item, i) =>{
                        return[
                            <Card key={i} className="font-weight-bold mx-2 mb-4">
                                <Card.Body>
                                    <Card.Text className="mx-2 mb-4">
                                        <Row>
                                            <Col>
                                                Booking reference number: {item.bookId}<br/><br/>
                                                Passenger name: {item.user}<br/><br/>
                                                Flight number: {item.flightNum}<br/><br/>
                                            </Col>
                                            <Col>
                                                Departs from: {item.flightDep}<br/><br/>
                                                Departs at: {localTime(item.flightDepTime)}<br/><br/>
                                                Arrives at: {item.flightArr}<br/><br/>
                                                Arrives at: {localTime(item.flightArrDate)}<br/><br/>
                                            </Col>
                                            <Col>
                                                Ticket class: {item.class}<br/><br/>
                                                Ticket type: {item.type}<br/><br/>
                                                Ticket price: ${item.total}<br/><br/>
                                            </Col>
                                        </Row>
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        ]
                    })}
                </>
            }
             <Button variant="primary sticky-bottom"  onClick={event => window.location.href='/'} >
                 Go Home
            </Button>
        </div>
    )
}

export default ConfirmPage;