import React, { useState, useEffect }  from 'react';
import { Steps } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { Card, Spinner, Button, ToggleButton, ButtonToolbar } from 'react-bootstrap';

const TicketSelectionPage = () => {
    const [flight, setFlight] = useState();
    const [returnFlight, setReturnFlight] = useState();
    const [ticketClass, setTicketClass] = useState();
    const [flightTickets, setFlightTickets] = useState([]);
    const [returnTickets, setReturnTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState();
    const [selectedReTicket, setSelectedReTicket] = useState();
    const [loading, setLoading] = useState(true);
    const instance = (
        <Steps current={0}>
        <Steps.Item title="Ticket Selection " onClick={event => window.location.href='/TicketSelectionPage'}/>
        <Steps.Item title="Passenger Details "/>
        <Steps.Item title='Payment'/>
        <Steps.Item title="Booking Confirmation "/>
      </Steps>
      );

    async function getTicketData(flightInfo){
        let d = new Date(flightInfo.departureTime)
        let url = `http://localhost:8080/getticketprice?fnum=${flightInfo.flightNumber}&tclass=${ticketClass}&depdate=${d.toISOString()}`
        return await fetch(url)
        .then(response => response.json())   
    }
    async function getTickets(num){
        if(num === 1){
            getTicketData(flight).then(data =>{
                setFlightTickets(data);
            })
        } else{
            getTicketData(returnFlight).then(data => {
                setReturnTickets(data)
            })
        }
    }
    useEffect(() => {
        setLoading(true);
        let data = sessionStorage.getItem('returnFlight');
        let data2 = sessionStorage.getItem('flight');
        if(data === null && data2 === null){
            window.location.href='/'
        }
        if(data != null){
            setReturnFlight(JSON.parse(sessionStorage.getItem('returnFlight')));
            setFlight(JSON.parse(sessionStorage.getItem('flight')));
            setTicketClass(sessionStorage.getItem('ticketClass'));
        } else{
            setFlight(JSON.parse(sessionStorage.getItem('flight')));
            setTicketClass(sessionStorage.getItem('ticketClass'));
        }
    }, [])

    useEffect(() => {
        if(returnFlight && flight){
            getTickets(1);
            getTickets(2).then(setLoading(false));
        } else if (flight && !returnFlight) {
            getTickets(1).then(setLoading(false));
        }
        // console.log(returnFlight)
        // console.log(flightTickets)
        // console.log(loading)
    }, [returnFlight, flight])

    useEffect(() => {
        sessionStorage.setItem('ticket', JSON.stringify(selectedTicket));
        if(selectedReTicket)
            sessionStorage.setItem('retrunTicket', JSON.stringify(selectedReTicket));    
    }, [selectedReTicket, selectedTicket])

    const handleSelectedTicket = (data, e) =>{
        if(data === selectedTicket){
            setSelectedTicket();
        }
        else{
            setSelectedTicket(data);
        }
        e.preventDefault();
    }
    const handleReSelectedticket = (data, e) =>{
        if(data === selectedReTicket)
        {
           setSelectedReTicket();
        }
        else{
            setSelectedReTicket(data);
        }
        e.preventDefault();
    }

    function createBookButton(isReturn, ticket) {
        // console.log(selectedFlight);
        return (isReturn ? <ToggleButton type="checkbox" variant="outline-dark" onClick={(e) => handleReSelectedticket(ticket, e)} checked={selectedReTicket ? ticket===selectedReTicket : false}> Select Return Ticket</ToggleButton> 
        : <ToggleButton type="checkbox" variant="outline-dark" onClick={(e) => handleSelectedTicket(ticket, e)} checked={selectedTicket ? ticket===selectedTicket : false}> Select Ticket</ToggleButton>);
    }

    const renderContent = () =>{
        // console.log(flightTickets)
    if(!loading){   
         return[
            <>
                <h2>Flight {flight.flightNumber} &emsp; <FaPlaneDeparture/> {flight.departureCode.airport}, {flight.departureCode.countryCode3.countryName} &emsp;
                <FaPlaneArrival/> {flight.destinationCode.airport}, {flight.destinationCode.countryCode3.countryName} <br/>  </h2>
                <h3>Please select the desired ticket type for your flight</h3>
                <ButtonToolbar size="lg" className="mb-4">
                        { flightTickets.map((item, index) => {
                            return(
                            <Card key = {index}>
                            <Card.Header as="h5">{item.ticketType.name}</Card.Header>
                            <Card.Body>
                                <Card.Title>Total ${item.totalPrice}</Card.Title>
                                <Card.Text>
                                    {item.ticketType.exchangeable? 'Exchangeable' : 'Non-Exchangeable'} <br/>
                                    Frequent Flyer Points: {item.ticketType.frequentFlyerPoints? 'Yes':'No'} <br/>
                                    {item.ticketType.refundable? 'Refundable':'Non-Refundable'} <br/>
                                    {item.ticketType.transferable? 'Transferable': 'Non-Transferable'} <br/>
                                    {item.priceLeg1? 'Leg 1 Price $' + item.priceLeg1:''} <br/>
                                    {item.priceLeg2? 'Leg 2 Price $' + item.priceLeg2:''}
                                </Card.Text>
                                {createBookButton(false, item)}
                            </Card.Body>
                            </Card>
                            )
                        })
                        }
                </ButtonToolbar>
                {(returnTickets && returnFlight) &&
                    <>
                     <h2> Return Flight {returnFlight.flightNumber} &emsp; <FaPlaneDeparture/> {returnFlight.departureCode.airport}, {returnFlight.departureCode.countryCode3.countryName} &emsp;
                     <FaPlaneArrival/> {returnFlight.destinationCode.airport}, {returnFlight.destinationCode.countryCode3.countryName} </h2>
                     <ButtonToolbar size="lg" className="mb-4">
                             { returnTickets.map((item, index) => {
                                 return(
                                 <Card key = {index}>
                                 <Card.Header as="h5">{item.ticketType.name}</Card.Header>
                                 <Card.Body>
                                     <Card.Title>Total ${item.totalPrice}</Card.Title>
                                     <Card.Text>
                                         {item.ticketType.exchangeable? 'Exchangeable' : 'Non-Exchangeable'} <br/>
                                         Frequent Flyer Points: {item.ticketType.frequentFlyerPoints? 'Yes':'No'} <br/>
                                         {item.ticketType.refundable? 'Refundable':'Non-Refundable'} <br/>
                                         {item.ticketType.transferable? 'Transferable': 'Non-Transferable'} <br/>
                                         {item.priceLeg1? 'Leg 1 Price $' + item.priceLeg1:''} <br/>
                                         {item.priceLeg2? 'Leg 2 Price $' + item.priceLeg2:''}
                                     </Card.Text>
                                     {createBookButton(true, item)}
                                 </Card.Body>
                                 </Card>
                                 )
                             })
                            }
                        </ButtonToolbar>
                    </>
                }
            </>
        ]
        } else{
            return[
                <Spinner animation="border" />
            ]
        }
    }

    return(
        <div className="container-fluid text-center">
            <br/>{instance} <br />
            <h1>Ticket Selection</h1>
            {renderContent()}
            <Button variant="primary"  onClick={event =>  window.location.href='/Booking'} disabled={!selectedTicket || (returnFlight? !selectedReTicket:false)} >
                 Next
            </Button>
        </div>
    )
}

export default TicketSelectionPage;