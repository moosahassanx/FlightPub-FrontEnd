import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';


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
    
    useEffect(() => {
        console.log("-- effects selected flights:");
        console.log(selectedFlight);
        console.log("-- effects selected return  flights:");
        console.log(selectedRetuenFlight);
        
    }, [selectedFlight, selectedRetuenFlight ])
    const handleSelectedFlight = (date) =>{
        setSelectedFlight(date);
        console.log("selected flight !!!!!!!");
    }
    const handleSReturnSlectedFlight = (date) =>{
        setSelectedRetuenFlight(date);
        console.log("selected return flight !!!!!!!");
    }
    //converts the duration of the flight from minutes to hours and minutes
    function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
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
    function getTime(t)
    {
        var time = new Date(t).toLocaleTimeString();
        return time;
    }
    
    function createBookButton(isReturn, selectedFlight) {
        // console.log(selectedFlight);
        return (isReturn ? <Button variant="primary" onClick={() => handleSReturnSlectedFlight(selectedFlight)}>Book Return Flight</Button> : <Button variant="primary" onClick={() => handleSelectedFlight(selectedFlight)}>Book One-Way Flight</Button>);
    }

    //this will map the flightData object array into cards and display the needed information for each flight found
    const renderFlight = (data, isReturn) =>{
        var flightData = data;
        return[
            <>
                { flightData.map((item, index) => {
                   return(
                   <Card key = {index}>
                    <Card.Header as="h5">Flight {item.flightNumber}</Card.Header>
                    <Card.Body>
                      <Card.Title>From: {item.departureCode.destinationCode}, {item.departureCode.countryCode3.countryName}
                       &emsp;&emsp;&emsp;To: {item.destinationCode.destinationCode}, {item.destinationCode.countryCode3.countryName} </Card.Title>
                      <Card.Text>
                        Date: {formatDate(item.departureTime)}&emsp;&emsp;&emsp;Duration: {timeConvert(item.duration + item.durationSecondLeg)}<br/>    
                        Departs At {getTime(item.departureTime)}&emsp;&emsp;&emsp;Arrives At {getTime(item.arrivalTime)} <br/>
                        Plane type: {item.planeType.details} <br/>
                        Price: ${item.price}
                      </Card.Text>
                      {createBookButton(isReturn, item)}
                      {console.log(item)}
                    </Card.Body>
                    </Card>
                   )
                })
                }
             </>
        ]
    }
    //if flightData && returnFlight == null then display no search results
    //if flightData != null && returnFlight ==null then display one-way search
    //else if both have data then display both tickets
    //if tripType == return but one or both data variables are null then disply message
    //include a way to get to the booking form from each flight card

    //checks if there are any flights found, whether the flight is one way or return, if both flights found when the trip type is return-
    //and render the results based on that to prevent errors
    const renderContent = () => {
        if(flight.length === 0 && tripType === 'One-Way')
        {
            return[
                <h3>No Results have been found</h3>
            ]
        }
        if(returnFlight.length === 0 && flight.length === 0)
        {
            return[
                <h3>No Results have been found</h3>
            ]
        }
        if(tripType === "One-Way")
        {
            return[
                <>
                    <h2>Flights to {flight[0].destinationCode.airport}</h2>
                    {renderFlight(flight)}
                </>
            ]
        }
        if(tripType === "Return")
        {
            if(flight.length === 0)
            {
                return[
                    <>
                        <h2>No flights found to {returnFlight[0].destinationCode.airport} at the selected date</h2>
                        <h2>Return FLights to {returnFlight[0].departureCode.airport}</h2>
                        {renderFlight(returnFlight, false)}
                    </>
                    ]
            }
            if(returnFlight.length === 0)
            {
                return[
                    <>
                        <h2>Flights found to {flight[0].destinationCode.airport}</h2>
                        {renderFlight(flight, false)}
                        <h2>No return flights found to {flight[0].departureCode.airport} at the selected date</h2>
                    </>
                    ]
            }
            else
            {
                return[
                    <>
                        <h2>Flights to {flight[0].destinationCode.airport}</h2>
                        {renderFlight(flight, false)}
                        <h2>Return flights to {returnFlight[0].destinationCode.airport}</h2>
                        {renderFlight(returnFlight, true)}
                    </>
                ]
            }
        }

    }
    //displays text and then calls the function renderContent to decide what to render to the user based on the search results
    return(
        <>

            <h1>Search Results</h1>    
            {renderContent()}
        </>
    )
}

export default FlightCard;