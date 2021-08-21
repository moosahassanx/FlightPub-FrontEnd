import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown } from "semantic-ui-react";
import countryOptions from "./CountryOptions";
import FlightCard from "./FlightCard";
import { Form } from "react-bootstrap";
import { FaOldRepublic } from "react-icons/fa";

//plans to extend the search functionality to inlude the option to search from departure destination to all Available Destination
//and display a list of possible Destinations and their prices for users that would like to travel but are unsure where to go
const SearchForm = () => {
	//form parameters, all set to null intially except for the trip type, departure date and return date (arrDate)
	//trip type is set to One-Way by default and the dates are set to the current date
	const [tripType, setTripType] = useState("One-Way");
	const [destFrom, setDestFrom] = useState();
	const [sort, setSort] = useState("non");
	const [searchType, setSearchType] = useState("Fixed");
	const [numberOfTravellers, setnumberOfTravellers] = useState(1);
	const [tClass, setTclass] = useState("ECO");
	const [destTo, setDestTo] = useState();
	const [departureDate, setDepartureDate] = useState(new Date());
	const [arrDate, setArrDate] = useState(new Date());
	const [depDateRange, setDepDateRange] = useState([null, null]);
	const [depStartDate, depEndDate] = depDateRange;
	const [reDateRange, setReDateRange] = useState([null, null]);
	const [reStartDate, reEndDate] = reDateRange;
	const [flightData, setFlightData] = useState([]);
	const [returnFlights, setReturnFlights] = useState([]);
	const [filteredFlights, setFilteredFlights] = useState([]);
	const [filteredReFlights, setFilteredReFlights] = useState([]);
	const [filters, setFilters] = useState({
		noStop: { state: true, count: 0 },
		oneStop: { state: true, count: 0 },
		morning: { state: true, count: 0 },
		afternoon: { state: true, count: 0 },
		evening: { state: true, count: 0 },
	});
	const [airlines, setAirlines] = useState([]);
	//search is a boolean that is set to false to represent that there has not been a search performed, untill it is change on Submission
	const [search, setSearch] = useState(false);
	//minDate is the Minimum date for the dates selection which is the current date at the time of use in the system
	const minDate = new Date();

	//this variable is used to set the maximum date for a search to be 1 year in the future
	let in1Years = new Date();
	in1Years.setFullYear(in1Years.getFullYear() + 1);

	const [maxDates, setMaxDate] = useState(in1Years);
	//sorting functions to sort the flights based on user selection
	const sortFlights = (sort) => {
		if (sort === "price") {
			if (filteredFlights.length > 0) {
				filteredFlights.sort((a, b) => {
					if (a.price > b.price) {
						return 1;
					} else if (b.price > a.price) {
						return -1;
					} else {
						return 0;
					}
				});
			}
			if (filteredReFlights.length > 0) {
				filteredReFlights.sort((a, b) => {
					if (a.price > b.price) {
						return 1;
					} else if (b.price > a.price) {
						return -1;
					} else {
						return 0;
					}
				});
			}
		} else if (sort === "duration") {
			if (filteredFlights.length > 0) {
				filteredFlights.sort((a, b) => {
					if (
						a.duration + a.durationSecondLeg >
						b.duration + b.durationSecondLeg
					) {
						return 1;
					} else if (
						b.duration + b.durationSecondLeg >
						a.duration + a.durationSecondLeg
					) {
						return -1;
					} else {
						return 0;
					}
				});
			}
			if (filteredReFlights.length > 0) {
				filteredReFlights.sort((a, b) => {
					if (
						a.duration + a.durationSecondLeg >
						b.duration + b.durationSecondLeg
					) {
						return 1;
					} else if (
						b.duration + b.durationSecondLeg >
						a.duration + a.durationSecondLeg
					) {
						return -1;
					} else {
						return 0;
					}
				});
			}
		} else if (sort === "deptEarly") {
			if (filteredFlights.length > 0) {
				filteredFlights.sort((a, b) => {
					let d1 = new Date(a.departureTime).toLocaleString();
					let d2 = new Date(b.departureTime).toLocaleString();
					if (d1 > d2) {
						return 1;
					} else if (d2 > d1) {
						return -1;
					} else {
						return 0;
					}
				});
			}
			if (filteredReFlights.length > 0) {
				filteredReFlights.sort((a, b) => {
					let d1 = new Date(a.departureTime).toLocaleString();
					let d2 = new Date(b.departureTime).toLocaleString();
					if (d1 > d2) {
						return 1;
					} else if (d2 > d1) {
						return -1;
					} else {
						return 0;
					}
				});
			}
		} else if (sort === "deptLate") {
			if (filteredFlights.length > 0) {
				filteredFlights.sort((a, b) => {
					let d1 = new Date(a.departureTime).toLocaleString();
					let d2 = new Date(b.departureTime).toLocaleString();
					if (d1 < d2) {
						return 1;
					} else if (d2 < d1) {
						return -1;
					} else {
						return 0;
					}
				});
			}
			if (filteredReFlights.length > 0) {
				filteredReFlights.sort((a, b) => {
					let d1 = new Date(a.departureTime).toLocaleString();
					let d2 = new Date(b.departureTime).toLocaleString();
					if (d1 < d2) {
						return 1;
					} else if (d2 < d1) {
						return -1;
					} else {
						return 0;
					}
				});
			}
		}
	};
	//Parameter change handlers
	const handleTripType = (event) => {
		setTripType(event.target.value);
	};
	const handledestFrom = (event, data) => {
		setAirlines([]);
		setDestFrom(data.value);
	};
	const handledestTo = (event, data) => {
		setAirlines([]);
		setDestTo(data.value);
	};
	const handleDepDate = (date) => {
		if (searchType === "Flexible") {
			setDepDateRange(date);
		} else {
			setDepartureDate(date);
		}
	};
	const handleArrDate = (date) => {
		if (searchType === "Flexible") {
			setReDateRange(date);
			if (date[1]) {
				setMaxDate(date[1]);
			}
		} else {
			setArrDate(date);
			setMaxDate(date);
		}
	};

	const handleNumberOfTravellers = (event) => {
		setnumberOfTravellers(event.target.value);
	};
	const handleTicketClass = (event) => {
		setTclass(event.target.value);
	};

	const handleSort = (event) => {
		setSort(event.target.value);
		sortFlights(event.target.value);
	};

	const handleSearchType = (event) => {
		setSearchType(event.target.value);
	};
	//api call to get the lowest price for a flight with the specified class and date
	async function getPrice(num, date) {
		let d = new Date(date);
		var url = `/getlowprice?fNum=${num}&class=${tClass}&date=${d.toJSON()}`;
		return await fetch(url).then((response) => response.json());
	}
	//api call to check if there are seats available on the specified flight for the number of passengers specified by the user
	async function getFlightAvailblity(flight) {
		let d = new Date(flight.departureTime);
		var url = `/getAvailability?depTime=${d.toJSON()}&flightNum=${
			flight.flightNumber
		}&depSeats=${numberOfTravellers}&class=${tClass}`;
		return await fetch(url).then((response) => response.json());
	}
	//load price gets the price for each of the flights returned from the backend and stores then in the state if they are available
	async function loadPrice(data, num) {
		data.map((item) => {
			getPrice(item.flightNumber, item.departureTime).then((d) => {
				item.price = d;
				if (num === 1) {
					getFlightAvailblity(item).then((available) => {
						if (available.length > 0) {
							let time = new Date(item.departureTime).getHours();
							setFlightData((old) => [...old, item]);
							if (item.stopOverCode === null) {
								setFilters((prevFilters) => ({
									...prevFilters,
									noStop: {
										state: prevFilters.noStop.state,
										count: prevFilters.noStop.count + 1,
									},
								}));
							}
							if (item.stopOverCode !== null) {
								setFilters((prevFilters) => ({
									...prevFilters,
									oneStop: {
										state: prevFilters.oneStop.state,
										count: prevFilters.oneStop.count + 1,
									},
								}));
							}
							if (time < 12) {
								setFilters((prevFilters) => ({
									...prevFilters,
									morning: {
										state: prevFilters.morning.state,
										count: prevFilters.morning.count + 1,
									},
								}));
							} else if (time < 18) {
								setFilters((prevFilters) => ({
									...prevFilters,
									afternoon: {
										state: prevFilters.afternoon.state,
										count: prevFilters.afternoon.count + 1,
									},
								}));
							} else {
								setFilters((prevFilters) => ({
									...prevFilters,
									evening: {
										state: prevFilters.evening.state,
										count: prevFilters.evening.count + 1,
									},
								}));
							}
							let found = false;
							airlines.map((airline) => {
								if (airline.name === item.airlineCode.airlineName) {
									found = true;
								}
							});
							if (!found) {
								let temp = airlines;
								temp.push({
									name: item.airlineCode.airlineName,
									checked: true,
								});
								setAirlines(temp);
							}
						}
					});
				} else {
					getFlightAvailblity(item).then((available) => {
						if (available.length > 0) {
							let time = new Date(item.departureTime).getHours();
							setReturnFlights((old) => [...old, item]);
							if (item.stopOverCode === null) {
								setFilters((prevFilters) => ({
									...prevFilters,
									noStop: {
										state: prevFilters.noStop.state,
										count: prevFilters.noStop.count + 1,
									},
								}));
							}
							if (item.stopOverCode !== null) {
								setFilters((prevFilters) => ({
									...prevFilters,
									oneStop: {
										state: prevFilters.oneStop.state,
										count: prevFilters.oneStop.count + 1,
									},
								}));
							}
							if (time < 12) {
								setFilters((prevFilters) => ({
									...prevFilters,
									morning: {
										state: prevFilters.morning.state,
										count: prevFilters.morning.count + 1,
									},
								}));
							} else if (time < 18) {
								setFilters((prevFilters) => ({
									...prevFilters,
									afternoon: {
										state: prevFilters.afternoon.state,
										count: prevFilters.afternoon.count + 1,
									},
								}));
							} else {
								setFilters((prevFilters) => ({
									...prevFilters,
									evening: {
										state: prevFilters.evening.state,
										count: prevFilters.evening.count + 1,
									},
								}));
							}
							let found = false;
							airlines.map((airline) => {
								if (airline.name === item.airlineCode.airlineName) {
									found = true;
								}
							});
							if (!found) {
								let temp = airlines;
								temp.push({
									name: item.airlineCode.airlineName,
									checked: true,
								});
								setAirlines(temp);
							}
						}
					});
				}
			});
		});
		setSearch(true);
	}

	//Assyncronised function to fetch flight data from the backend depending on the type of trip
	//it uses the passed urls to make a HTTP request to the back-end, urlOne is for one-way trips and urlRe is for return
	//once the data is fetched, the returnFlights and flightData variables are set to the JSON object array

	async function getFlightData(urlOne, urlRe) {
		setAirlines([]);
		if (tripType === "Return") {
			await fetch(urlRe)
				.then((response) => response.json())
				.then((data) => {
					loadPrice(data, 2);
				});
		}
		// we always want to get the one-way trips
		await fetch(urlOne)
			.then((response) => response.json())
			.then((data) => {
				loadPrice(data, 1);
			});
	}

	//on submit the form is validated to ensure that the api call is done correctly and to prevent server side errors
	//then the Parameters are added to the urls and sent to the getFlightData function
	const handleSubmit = (event) => {
		var url = "/";
		var urlRe = "/";
		var error = false;
		if (destTo == null || destFrom == null) {
			alert("Both destinations must be selected");
			error = true;
		} else if (destFrom === destTo) {
			alert("The travel destinations must be different please try again");
			error = true;
		}
		if (
			tripType === "Return" &&
			departureDate.getTime() === arrDate.getTime() &&
			searchType !== "Flexible"
		) {
			alert("The return date cannot be the same as the departure date");
			error = true;
		}
		if (
			tripType === "One-Way" &&
			searchType === "Flexible" &&
			(depStartDate === null || depEndDate === null)
		) {
			alert("The date range must be selected");
			error = true;
		} else if (
			tripType === "Return" &&
			searchType === "Flexible" &&
			(depStartDate === null ||
				depEndDate === null ||
				reStartDate === null ||
				reEndDate === null)
		) {
			alert("The date range must be selected");
			error = true;
		}
		if (tripType === "One-Way" && !error) {
			if (searchType === "Flexible") {
				url += `getFlexFlights?from=${destFrom}&to=${destTo}&dep1=${depStartDate.toJSON()}&dep2=${depEndDate.toJSON()}`;
			} else {
				url += `getflights?from=${destFrom}&to=${destTo}&dep=${departureDate.toJSON()}`;
			}
			getFlightData(url, urlRe);
		}
		if (tripType === "Return" && !error) {
			if (searchType === "Flexible") {
				url += `getFlexFlights?from=${destFrom}&to=${destTo}&dep1=${depStartDate.toJSON()}&dep2=${depEndDate.toJSON()}`;
				urlRe += `getFlexFlights?from=${destTo}&to=${destFrom}&dep1=${reStartDate.toJSON()}&dep2=${reEndDate.toJSON()}`;
			} else {
				url += `getflights?from=${destFrom}&to=${destTo}&dep=${departureDate.toJSON()}`;
				urlRe += `getflights?from=${destTo}&to=${destFrom}&dep=${arrDate.toJSON()}`;
			}
			getFlightData(url, urlRe);
		}
		setFilters({
			noStop: { state: true, count: 0 },
			oneStop: { state: true, count: 0 },
			morning: { state: true, count: 0 },
			afternoon: { state: true, count: 0 },
			evening: { state: true, count: 0 },
		});
		setAirlines([]);
		setFlightData([]);
		setReturnFlights([]);
		event.preventDefault();
	};

	//this sets the data variables to null everytime the component mounts to prevent old searches from presisting
	useEffect(() => {
		sessionStorage.clear();
	}, []);

	useEffect(() => {
		setMaxDate(in1Years);
	}, [tripType]);

	useEffect(() => {
		setFilteredFlights(flightData);
		setFilteredReFlights(returnFlights);
	}, [flightData, returnFlights]);

	//function to filter the list of flights displayed based on user selections
	const handleFilters = (e) => {
		if (e.target.name === "noStop") {
			//if the previous state is true then the flights that match the object should be removed
			if (filters.noStop.state) {
				let temp = filteredFlights.filter((flight) => {
					if (flight.stopOverCode !== null) {
						return flight;
					}
				});
				setFilteredFlights(temp);
				let tempRe = filteredReFlights.filter((flight) => {
					if (flight.stopOverCode !== null) {
						return flight;
					}
				});
				setFilteredReFlights(tempRe);
			} else {
				//otherwise they should be added from the original list
				let temp = flightData.filter((flight) => {
					if (flight.stopOverCode === null) {
						return flight;
					}
				});
				if (temp.length > 0) {
					let arr = temp.concat(filteredFlights);
					setFilteredFlights(arr);
				}
				let tempRe = returnFlights.filter((flight) => {
					if (flight.stopOverCode === null) {
						return flight;
					}
				});
				if (tempRe.length > 0) {
					let arr = temp.concat(filteredReFlights);
					setFilteredReFlights(arr);
				}
			}
			setFilters((prevFilters) => ({
				...prevFilters,
				noStop: {
					state: !prevFilters.noStop.state,
					count: prevFilters.noStop.count,
				},
			}));
		} else if (e.target.name === "oneStop") {
			//if the previous state is true then the flights that match the object should be removed
			if (filters.oneStop.state) {
				let temp = filteredFlights.filter((flight) => {
					if (flight.stopOverCode === null) {
						return flight;
					}
				});
				setFilteredFlights(temp);
				let tempRe = filteredReFlights.filter((flight) => {
					if (flight.stopOverCode === null) {
						return flight;
					}
				});
				setFilteredReFlights(tempRe);
			} else {
				//otherwise they should be added from the original list
				let temp = flightData.filter((flight) => {
					if (flight.stopOverCode !== null) {
						return flight;
					}
				});
				if (temp.length > 0) {
					let arr = temp.concat(filteredFlights);
					setFilteredFlights(arr);
				}
				let tempRe = returnFlights.filter((flight) => {
					if (flight.stopOverCode !== null) {
						return flight;
					}
				});
				if (tempRe.length > 0) {
					let arr = temp.concat(filteredReFlights);
					setFilteredReFlights(arr);
				}
			}
			setFilters((prevFilters) => ({
				...prevFilters,
				oneStop: {
					state: !prevFilters.oneStop.state,
					count: prevFilters.oneStop.count,
				},
			}));
		} else if (e.target.name === "morning") {
			//if the previous state is true then the flights that match the object should be removed
			if (filters.morning.state) {
				let temp = filteredFlights.filter((flight) => {
					let time = new Date(flight.departureTime).getHours();
					if (time > 12) {
						return flight;
					}
				});
				setFilteredFlights(temp);
				let tempRe = filteredReFlights.filter((flight) => {
					let time = new Date(flight.departureTime).getHours();
					if (time > 12) {
						return flight;
					}
				});
				setFilteredReFlights(tempRe);
			} else {
				//otherwise they should be added from the original list
				let temp = flightData.filter((flight) => {
					let time = new Date(flight.departureTime).getHours();
					if (time < 12) {
						return flight;
					}
				});
				if (temp.length > 0) {
					let arr = temp.concat(filteredFlights);
					setFilteredFlights(arr);
				}
				let tempRe = returnFlights.filter((flight) => {
					let time = new Date(flight.departureTime).getHours();
					if (time < 12) {
						return flight;
					}
				});
				if (tempRe.length > 0) {
					let arr = temp.concat(filteredReFlights);
					setFilteredReFlights(arr);
				}
			}
			setFilters((prevFilters) => ({
				...prevFilters,
				morning: {
					state: !prevFilters.morning.state,
					count: prevFilters.morning.count,
				},
			}));
		} else if (e.target.name === "afternoon") {
			//if the previous state is true then the flights that match the object should be removed
			if (filters.afternoon.state) {
				let temp = filteredFlights.filter((flight) => {
					let time = new Date(flight.departureTime).getHours();
					if (time > 18 || time < 12) {
						return flight;
					}
				});
				setFilteredFlights(temp);
				let tempRe = filteredReFlights.filter((flight) => {
					let time = new Date(flight.departureTime).getHours();
					if (time > 18 || time < 12) {
						return flight;
					}
				});
				setFilteredReFlights(tempRe);
			} else {
				//otherwise they should be added from the original list
				let temp = flightData.filter((flight) => {
					let time = new Date(flight.departureTime).getHours();
					if (time < 18 && time > 12) {
						return flight;
					}
				});
				if (temp.length > 0) {
					let arr = temp.concat(filteredFlights);
					setFilteredFlights(arr);
				}
				let tempRe = returnFlights.filter((flight) => {
					let time = new Date(flight.departureTime).getHours();
					if (time < 18 && time > 12) {
						return flight;
					}
				});
				if (tempRe.length > 0) {
					let arr = temp.concat(filteredReFlights);
					setFilteredReFlights(arr);
				}
			}
			setFilters((prevFilters) => ({
				...prevFilters,
				afternoon: {
					state: !prevFilters.afternoon.state,
					count: prevFilters.afternoon.count,
				},
			}));
		} else if (e.target.name === "evening") {
			if (filters.evening.state) {
				let temp = filteredFlights.filter((flight) => {
					let time = new Date(flight.departureTime).getHours();
					if (time > 0 && time < 18) {
						return flight;
					}
				});
				setFilteredFlights(temp);
				let tempRe = filteredReFlights.filter((flight) => {
					let time = new Date(flight.departureTime).getHours();
					if (time > 0 && time < 18) {
						return flight;
					}
				});
				setFilteredReFlights(tempRe);
			} else {
				//otherwise they should be added from the original list
				let temp = flightData.filter((flight) => {
					let time = new Date(flight.departureTime).getHours();
					if (time >= 18) {
						return flight;
					}
				});
				if (temp.length > 0) {
					let arr = temp.concat(filteredFlights);
					setFilteredFlights(arr);
				}
				let tempRe = returnFlights.filter((flight) => {
					let time = new Date(flight.departureTime).getHours();
					if (time >= 18) {
						return flight;
					}
				});
				if (tempRe.length > 0) {
					let arr = temp.concat(filteredReFlights);
					setFilteredReFlights(arr);
				}
			}
			setFilters((prevFilters) => ({
				...prevFilters,
				evening: {
					state: !prevFilters.evening.state,
					count: prevFilters.evening.count,
				},
			}));
		} else {
			let index;
			airlines.map((airline, i) => {
				if (airline.name === e.target.name) {
					index = i;
				}
			});
			if (airlines[index].checked) {
				let temp = filteredFlights.filter((flight) => {
					if (flight.airlineCode.airlineName !== airlines[index].name) {
						return flight;
					}
				});
				setFilteredFlights(temp);
				let tempRe = filteredReFlights.filter((flight) => {
					if (flight.airlineCode.airlineName !== airlines[index].name) {
						return flight;
					}
				});
				setFilteredReFlights(tempRe);
			} else {
				let temp = flightData.filter((flight) => {
					if (flight.airlineCode.airlineName === airlines[index].name) {
						return flight;
					}
				});
				if (temp.length > 0) {
					let arr = temp.concat(filteredFlights);
					setFilteredFlights(arr);
				}
				let tempRe = returnFlights.filter((flight) => {
					if (flight.airlineCode.airlineName === airlines[index].name) {
						return flight;
					}
				});
				if (tempRe.length > 0) {
					let arr = temp.concat(filteredReFlights);
					setFilteredReFlights(arr);
				}
			}
			let temp = [...airlines];
			temp[index].checked = !temp[index].checked;
			setAirlines(temp);
		}
	};
	//conditional rendering where only the required fields are shown depending on the trip type selected.
	//two packages have been used to implement the dropdown search menu (semantics-ui) and the date pickers (react-datepicker).
	//once the form has been submitted and the data is fetched the FlightCard component rendered below will recieve the flight data-
	//and render the flights and all their required details.
	return (
		<>
			<div className='search-form'>
				{tripType === "One-Way" ? (
					<form
						onSubmit={handleSubmit}
						className='form-outline mb-2 text-center'
					>
						<div>
							<br />
							Trip Type:&emsp;
							<select value={tripType} onChange={handleTripType}>
								<option value='One-Way'>One-Way</option>
								<option value='Return'>Return</option>
							</select>
							&emsp; Dates:&emsp;
							<select value={searchType} onChange={handleSearchType}>
								<option value='Fixed'>Fixed</option>
								<option value='Flexible'>Flexible</option>
							</select>
						</div>
						<div className='dropdown'>
							<br />
							Number of Travellers: &emsp;
							<select
								value={numberOfTravellers}
								onChange={handleNumberOfTravellers}
							>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
								<option value='5'>5</option>
								<option value='6'>6</option>
								<option value='7'>7</option>
								<option value='8'>8</option>
								<option value='9'>9</option>
							</select>
							&emsp; Ticket Class: &emsp;
							<select value={tClass} onChange={handleTicketClass}>
								<option value='ECO'>Economy</option>
								<option value='PME'>Premium Economy</option>
								<option value='BUS'>Business Class</option>
								<option value='FIR'>First Class</option>
							</select>
						</div>
						<br />
						<div>
							<p>Departure Destination</p>
							<Dropdown
								placeholder='Travelling from'
								fluid
								search
								selection
								onChange={handledestFrom}
								options={countryOptions}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginTop: "5px",
									width: "30%",
									position: "relative",
									left: "50%",
									top: 10,
									transform: "translate(-50%, -50%)",
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
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginTop: "5px",
									width: "30%",
									position: "relative",
									left: "50%",
									top: 10,
									transform: "translate(-50%, -50%)",
								}}
							/>
						</div>
						<div>
							<p>Departing</p>
							{searchType === "Flexible" ? (
								<DatePicker
									selectsRange={true}
									minDate={minDate}
									maxDate={maxDates}
									startDate={depStartDate}
									endDate={depEndDate}
									dateFormat='dd/MM/yyyy'
									onChange={handleDepDate}
									withPortal
								/>
							) : (
								<DatePicker
									selected={departureDate}
									minDate={minDate}
									maxDate={maxDates}
									dateFormat='dd/MM/yyyy'
									onChange={handleDepDate}
									withPortal
								/>
							)}
						</div>
						<br />
						<input
							type='submit'
							value='Search Flights'
							className='btn btn-secondary btn-lg'
						/>
					</form>
				) : (
					<form
						onSubmit={handleSubmit}
						className='form-outline mb-2 text-center'
					>
						<div>
							<br />
							Trip Type:&emsp;
							<select value={tripType} onChange={handleTripType}>
								<option value='One-Way'>One-Way</option>
								<option value='Return'>Return</option>
							</select>
							&emsp; Dates:&emsp;
							<select value={searchType} onChange={handleSearchType}>
								<option value='Fixed'>Fixed</option>
								<option value='Flexible'>Flexible</option>
							</select>
						</div>
						<div>
							<br />
							Number of Travellers: &emsp;
							<select
								value={numberOfTravellers}
								onChange={handleNumberOfTravellers}
							>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
								<option value='5'>5</option>
								<option value='6'>6</option>
								<option value='7'>7</option>
								<option value='8'>8</option>
								<option value='9'>9</option>
							</select>
							&emsp; Ticket Class: &emsp;
							<select value={tClass} onChange={handleTicketClass}>
								<option value='ECO'>Economy</option>
								<option value='PME'>Premium Economy</option>
								<option value='BUS'>Business Class</option>
								<option value='FIR'>First Class</option>
							</select>
						</div>
						<br />
						<div>
							<p>Departure Destination</p>
							<Dropdown
								placeholder='Travelling from'
								fluid
								search
								selection
								onChange={handledestFrom}
								options={countryOptions}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginTop: "5px",
									width: "30%",
									position: "relative",
									left: "50%",
									top: 10,
									transform: "translate(-50%, -50%)",
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
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginTop: "5px",
									width: "30%",
									position: "relative",
									left: "50%",
									top: 10,
									transform: "translate(-50%, -50%)",
								}}
							/>
						</div>
						<div>
							<p>Departing</p>
							{searchType === "Flexible" ? (
								<DatePicker
									selectsRange={true}
									minDate={minDate}
									maxDate={maxDates}
									startDate={depStartDate}
									endDate={depEndDate}
									dateFormat='dd/MM/yyyy'
									onChange={handleDepDate}
									withPortal
								/>
							) : (
								<DatePicker
									selected={departureDate}
									minDate={minDate}
									maxDate={maxDates}
									dateFormat='dd/MM/yyyy'
									onChange={handleDepDate}
									withPortal
								/>
							)}
						</div>
						<div>
							<p>Returning</p>
							{searchType === "Flexible" ? (
								<DatePicker
									selectsRange={true}
									minDate={minDate}
									maxDate={in1Years}
									startDate={reStartDate}
									endDate={reEndDate}
									dateFormat='dd/MM/yyyy'
									onChange={handleArrDate}
									withPortal
								/>
							) : (
								<DatePicker
									selected={arrDate}
									minDate={departureDate}
									maxDate={in1Years}
									dateFormat='dd/MM/yyyy'
									onChange={handleArrDate}
									withPortal
								/>
							)}
						</div>
						<br />
						<input
							type='submit'
							value='Search Flights'
							className='btn btn-secondary btn-lg'
						/>
					</form>
				)}
			</div>

			{flightData.length > 0 && (
				<div className='container-fluid text-center'>
					<hr />
					<Form>
						<div key={"inline-checkbox"} className='mb-3'>
							Stops:&emsp;
							<Form.Check
								inline
								label={`Non-stop ${filters.noStop.count}`}
								checked={filters.noStop.state}
								name='noStop'
								type={"checkbox"}
								id={"inline-checkbox-1"}
								onChange={handleFilters}
							/>
							<Form.Check
								inline
								label={`One stop ${filters.oneStop.count}`}
								checked={filters.oneStop.state}
								name='oneStop'
								type={"checkbox"}
								id={"inline-checkbox-2"}
								onChange={handleFilters}
							/>
							<br />
							Departure times:&emsp;
							<Form.Check
								inline
								label={`Morning ${filters.morning.count}`}
								checked={filters.morning.state}
								name='morning'
								type={"checkbox"}
								id={"inline-checkbox-3"}
								onChange={handleFilters}
							/>
							<Form.Check
								inline
								label={`Afternoon ${filters.afternoon.count}`}
								checked={filters.afternoon.state}
								name='afternoon'
								type={"checkbox"}
								id={"inline-checkbox-4"}
								onChange={handleFilters}
							/>
							<Form.Check
								inline
								label={`Evening ${filters.evening.count}`}
								checked={filters.evening.state}
								name='evening'
								type={"checkbox"}
								id={"inline-checkbox-5"}
								onChange={handleFilters}
							/>
							<br />
							Airlines:&emsp;
							{airlines.map((item, i) => {
								return (
									<Form.Check
										inline
										label={`${item.name}`}
										checked={item.checked}
										name={`${item.name}`}
										type={"checkbox"}
										id={`inline-checkbox-${i}`}
										onChange={handleFilters}
										key={i}
									/>
								);
							})}
						</div>
					</Form>
					Sort by:&emsp;
					<select value={sort} onChange={handleSort}>
						<option value='non'>Non</option>
						<option value='price'>Lowest price</option>
						<option value='deptEarly'>Earliest departure</option>
						<option value='deptLate'>Latest departure</option>
						<option value='duration'>Shortest duration</option>
					</select>
					<hr />
				</div>
			)}
			{search && (
				<div className='container-fluid text-center'>
					<FlightCard
						oneWayData={filteredFlights}
						returnData={filteredReFlights}
						trip={tripType}
						numberOfTravellrs={numberOfTravellers}
						tType={tClass}
					/>
				</div>
			)}
		</>
	);
};

export default SearchForm;
