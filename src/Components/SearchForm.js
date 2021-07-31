import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown } from 'semantic-ui-react';
import countryOptions from './CountryOptions';
import FlightCard from './FlightCard';

//plans to extend the search functionality to inlude the option to search from departure destination to all Available Destination 
//and display a list of possible Destinations and their prices for users that would like to travel but are unsure where to go
const SearchForm = () => {
    //form parameters, all set to null intially except for the trip type, departure dat and return date (arrDate)
    //trip type is set to One-Way by default and the dates are set to the current date
    const[tripType, setTripType] = useState('One-Way');
    const[destFrom, setDestFrom] = useState();
    const[destTo, setDestTo] = useState();
    const [departureDate, setDepartureDate] = useState(new Date());
    const [arrDate, setArrDate] = useState(new Date());
    const [flightData, setFlightData] = useState([]);
    const [returnFlights, setReturnFlights] = useState([]);
    //search is a boolean that is set to false to represent that there has not been a search performed, untill it is change on Submission
    const [search, setSearch] = useState(false);
    //minDate is the Minimum date for the dates selection which is the current date at the time of use in the system
    const minDate = new Date();
    //this sets the data variables to null everytime the component mounts to prevent old searches from presisting
    useEffect(() => {
        // setFlightData([]);
        // setReturnFlights([]);
        
    }, [flightData, returnFlights])
    //this variable is used to set the maximum date for a search to be 1 year in the future
    let in1Years = new Date();
    in1Years.setFullYear(in1Years.getFullYear() + 1);
    //Parameter change handlers
    const handleTripType = (event) =>{
        setTripType(event.target.value);
    }
    const handledestFrom = (event, data) =>{
        setDestFrom(data.value);
    }
    const handledestTo = (event, data) =>{
        setDestTo(data.value);
    }
    const handleDepDate = (date) =>{
        setDepartureDate(date);
    }
    const handleArrDate = (date) =>{
        setArrDate(date);
    }
    
    async function getPrice(num, date){
        let d = new Date(date)
        var url = `http://localhost:8080/getlowprice?fNum=${num}&date=${d.toISOString()}`;
        return await fetch(url)
            .then(response => response.json())
           
    }

    async function loadPrice(data, num) {
       await data.map((item)=>{
            getPrice(item.flightNumber, item.departureTime).then(d => {
                item.price = d
                if(num == 1)
                {
                    setFlightData(data)
                }
                else{
                    setReturnFlights(data)
                }
            })
        })
        setSearch(true);
    }
    //Assyncronised function to fetch flight data from the backend depending on the type of trip
    //it uses the passed urls to make a HTTP request to the back-end, urlOne is for one-way trips and urlRe is for return
    //once the data is fetched, the returnFlights and flightData variables are set to the JSON object array
    async function getFlightData(urlOne, urlRe) {
        if(tripType === 'Return')
        {
            await fetch(urlRe)
            .then(response => response.json())
            .then(data =>{ 
              loadPrice(data, 2)
            })       
        }
        await fetch(urlOne)
        .then(response => response.json())
        .then(data =>{ 
          loadPrice(data, 1);
        })
    }   
    //on submit the form is validated to ensure that the api call is done correctly and to prevent server side errors
    //then the Parameters are added to the urls and sent to the getFlightData function
    const handleSubmit = (event)=>{
        var url = 'http://localhost:8080/';
        var urlRe = 'http://localhost:8080/';
        var error = false;
        if(destTo== null || destFrom == null)
        {
            alert("Both destinations must be selected");
            error = true;
        }
        else if(destFrom ===  destTo)
        {
            alert("The travel destinations must be different please try again");
            error = true;
        }
        if(tripType === 'Return' && departureDate.getTime() === arrDate.getTime())
        {
            alert("The return date cannot be the same as the departure date");
            error = true;
        }
        if(tripType === 'One-Way' && !error)
        {
            url += `getflights?from=${destFrom}&to=${destTo}&dep=${departureDate.toISOString()}`;
            getFlightData(url , urlRe);
        }
        if(tripType === 'Return' && !error)
        {
            url += `getflights?from=${destFrom}&to=${destTo}&dep=${departureDate.toISOString()}`;
            urlRe += `getflights?from=${destTo}&to=${destFrom}&dep=${arrDate.toISOString()}`;
            getFlightData(url , urlRe);
        }
        
        setFlightData([])
        setReturnFlights([])
        event.preventDefault();
    }
    //conditional rendering where only the required fields are shown depending on the trip type selected.
    //two packages have been used to implement the dropdown search menu (semantics-ui) and the date pickers (react-datepicker).
    //once the form has been submitted and the data is fetched the FlightCard component rendered below will recieve the flight data-
    //and render the flights and all their required details.
    return(
        <>
            <div className="form">
                {/* {console.log(tripType)} */}
                {tripType === 'One-Way'
                    ?<form onSubmit={handleSubmit} className="form-outline mb-2 text-center">  
                    <div>
                    <br/>
                        <select value={tripType} onChange={handleTripType}>
                            <option value="One-Way">One-Way</option>
                            <option value="Return">Return</option>
                        </select>
                    </div>
                    <div>
                        <p>Depature Destination</p>
                        <Dropdown
                            placeholder='Travelling from'
                            fluid
                            search
                            selection
                            onChange={handledestFrom}
                            options={countryOptions}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop:'5px',
                                width:'30%',
                                position: 'relative', left: '50%', top: 10,
                               transform: 'translate(-50%, -50%)'
                            }}
                        />
                    </div>
                    <div>
                        <p>Arrival Destination</p>
                        <Dropdown
                            placeholder='Travelling to'
                            fluid
                            search
                            selection
                            onChange={handledestTo}
                            options={countryOptions}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop:'5px',
                                width:'30%',
                                position: 'relative', left: '50%', top: 10,
                               transform: 'translate(-50%, -50%)'
                            }}
                        />
                    </div>
                    <div>
                        <p>Departing</p>
                        <DatePicker 
                        selected={departureDate}
                        minDate={minDate}
                        maxDate={arrDate}
                        onChange={handleDepDate}
                        />
                    </div>
                    <br/>
                    <input type="submit" value="Search Flights" className="col-2"/>
                    </form>
                    :<form onSubmit={handleSubmit} className="form-outline mb-2 text-center">  
                        <div>
                        <br/>
                        <select value={tripType} onChange={handleTripType}>
                            <option value="One-Way">One-Way</option>
                            <option value="Return">Return</option>
                        </select>
                        </div>
                        <div>
                        <p>Depature Destination</p>
                        <Dropdown
                            placeholder='Travelling from'
                            fluid
                            search
                            selection
                            onChange={handledestFrom}
                            options={countryOptions}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop:'5px',
                                width:'30%',
                                position: 'relative', left: '50%', top: 10,
                               transform: 'translate(-50%, -50%)'
                            }}
                        />
                    </div>
                    <div>
                        <p>Arrival Destination</p>
                        <Dropdown
                            placeholder='Travelling to'
                            fluid
                            search
                            selection
                            onChange={handledestTo}
                            options={countryOptions}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop:'5px',
                                width:'30%',
                                position: 'relative', left: '50%', top: 10,
                               transform: 'translate(-50%, -50%)'
                            }}
                        />
                    </div>
                        <div>
                            <p>Departing</p>
                            <DatePicker 
                            selected={departureDate}
                            minDate={minDate}
                            maxDate={arrDate}
                            onChange={handleDepDate}
                            />
                        </div>
                        <div>
                            <p>Returning</p>
                            <DatePicker 
                            selected={arrDate}
                            minDate={minDate}
                            maxDate={in1Years}
                            onChange={handleArrDate}
                            />
                        </div>
                        <br/>
                        <input type="submit" value="Search Flights" className="col-2"/>
                    </form>
                }
            </div>
            {search 
                &&
                <div className="container-fluid text-center">
                    <FlightCard oneWayData ={flightData} returnData={returnFlights} trip ={tripType}/>
                </div>
            }
        </>
    )
}

export default SearchForm;