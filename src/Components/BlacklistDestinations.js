import {useState, useEffect} from 'react'
import '../Css/BlackListDestinations.css';

const BlackListDestinations = () => {

    // use states
    const [destinations, setDestinations] = useState([]);

    // fetching list of destinations from backend
    async function getDestinations()
    {
        // retrieve data from db
        await fetch('/getDestinations')
        .then(response => response.json())
        .then(json => setDestinations(json))
    }

    function destinationCodeInConsole(destCode)
    {
        console.log(destCode);
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
                        <form>
                            <div className="full-name">
                                <h3>{destination.airport}</h3>
                            </div>

                            <div className="other-shit">
                                <h5>Number of times booked: {destination.timesBooked}</h5>
                                {
                                    destination.covid == true ? (
                                        <h5>Blacklisted: True</h5>
                                    ) : (
                                        <h5>Blacklisted: False</h5>
                                    )
                                }
                                <h5>Destination code: {destination.destinationCode}</h5>
                                <button onClick={destinationCodeInConsole(destination.destinationCode)}>set blacklisted</button><br></br><br></br>
                                <button >set unblacklisted</button>

                                <hr></hr>
                            </div>
                        </form>
                    </div>
                    
                ))}
            </div>
        )

    }

    async function blacklistDestination()
    {
        console.log("desCode: " + document.getElementById("desCode").value);

        // retrieve data from db
        await fetch('/desCovid', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                destCode: document.getElementById("desCode").value,
                trueOrFalse: "1"
            })
        })

        // successful backend reach
        .then(response => {
            const data = response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
        })

        // react catch
        .catch(error => {
            console.error('CATCH ERROR: ', error.toString());
            alert("Error: destination code not found.");
        });
    }

    async function unBlacklistDestination()
    {
        console.log("desCode: " + document.getElementById("desCode").value);

        // retrieve data from db
        await fetch('/desCovid', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                destCode: document.getElementById("desCode").value,
                trueOrFalse: "0"
            })
        })

        // successful backend reach
        .then(response => {
            const data = response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
        })

        // react catch
        .catch(error => {
            console.error('CATCH ERROR: ', error.toString());
            alert("Error: destination code not found.");
        });
    }

    return (
        <div className="single-card">
            <div className="full-name">
                <form>
                    <h4>Blacklist Destination by Search</h4>
                    <input type='text' id='desCode' placeholder='Enter destination code'></input>
                    <submit className='submission' onClick={blacklistDestination}>Blacklist destination</submit>
                </form>
                <hr></hr>
            </div>

            <div className="full-name">
                <form>
                    <h4>Unblacklist Destination by Search</h4>
                    <input type='text' id='desCode' placeholder='Enter destination code'></input>
                    <submit className='submission' onClick={unBlacklistDestination}>Unblacklist destination</submit>
                </form>
                <hr></hr>
            </div>
            
            {/* render the fetched destinations */}
            <div className="full-name">
                <button onClick={getDestinations}>Refresh Destination Listing</button>
            </div>

            {renderDestinations()}

        </div>
    )
}

export default BlackListDestinations;