import React, { useEffect, useState } from 'react';
import { useStore, useSelector } from 'react-redux';
import SearchForm from '../Components/SearchForm';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from 'moment';


const Home = () => {

    // Individual state for the form components
    // This can be compacted into formData as an array
    // But having trouble mapping the selected option
    const[depart, setDepart] = useState(moment());
    const[arrival, setArrival] = useState(moment());
    const[departDate, setDepartDate] = useState();
    const[arriveDate, setArriveDate] = useState();
    const[focused, setFocusedInput] = useState(false);
    const[openUserList, setOpenUserList] = useState(false);
    const [usersList, setUserList] = useState([]);


    // State for total form data
    const [formData, setFormData] = useState();

    // State for the locations flightpub offers
    const [locations,setLocations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/getDestinations');
            const json = await response.json();
            setLocations(await json)

            //var item = (await locations[0].airport)
            //SetItem(item);
            //console.log(item);
    }    
       fetchData();
    },[])


    const handleSelectionDeparture = (e) => {
        
        setDepart([
            {
                departLocation: e
            }
        ])

        console.log(depart)
    }
    const handleSelectionArrival = (e) => {
        
        setArrival([
            {
                arrivalLocation: e
            }
        ])

        console.log(arrival)
    }

    const onFocusChangeRangeHandler = (focusedInput) => {
        setFocusedInput(focusedInput);
    }

    const rangeDatesChangeHandler = ({ startDate, endDate }) => {
        setDepartDate(moment(startDate));
        setArriveDate(moment(endDate));

        console.log(startDate)
      }

    const isLogged = useSelector(state => state.isLogged);

    return(
        <>
        {isLogged ? <p>MESSAGE FROM REDUX: user has logged in </p> : ''}

        <SearchForm/>
        </>
    )
}

export default Home;