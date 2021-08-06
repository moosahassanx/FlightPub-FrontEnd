import {useState, useEffect} from 'react'
import '../Css/BlackListDestinations.css';

const BlackListDestinations = () => {

    // use states
    const [destinations, setDestinations] = useState([]);

    // fetching list of destinations from backend
    async function getDestinations()
    {
        // retrieve data from db
        await fetch('http://localhost:8080/getDestinations')
        .then(response => response.json())
        .then(json => setDestinations(json))
    }

    // render the destinations
    function renderDestinations()
    {
        // loading destinations on startup if possible
        if(destinations == null)
        {
            getDestinations()
        }

        console.log(destinations);

        // render the list
        return (
            <div className="full-name">
                {destinations.map((destination) => (

                    <div>
                        <div className="full-name">
                            <h3>{destination.airport}</h3>
                        </div>

                        <div className="other-shit">
                            <h5>Number of times booked: {destination.timesBooked}</h5>
                            {
                                destination.blacklisted == '1' ? (
                                    <h5>Blacklisted: True</h5>
                                )
                                :
                                <h5>Blacklisted: False</h5>
                            }

                            <button>set blacklisted</button>
                            <button>set unblacklisted</button>

                            <hr></hr>
                        </div>
                    </div>
                    
                ))}
            </div>
        )

    }

    return (
        <div className="single-card">
            
            {/* render the fetched destinations */}
            <div className="full-name">
                <button onClick={getDestinations}>Refresh Destination Listing</button>
            </div>

            {renderDestinations()}

        </div>
    )
}

export default BlackListDestinations;