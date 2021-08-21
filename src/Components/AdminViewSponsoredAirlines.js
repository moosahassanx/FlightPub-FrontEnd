import {useState, useEffect} from 'react'
import '../Css/AdminViewSponsoredAirlines.css';

const AdminViewSponsoredAirlines = () => {
    // use states
    const [airlines, setAirlines] = useState([]);
    
    // fetching list of users
    async function getAirlines()
    {
        // retrieve data from db
        await fetch('/getAirlines')
        .then(response => response.json())
        .then(json => setAirlines(json))
    }

    // render the users
    function renderAirlines()
    {
        // loading destinations on startup if possible
        if(airlines == null)
        {
            getAirlines()
        }

        console.log(airlines);

        // render the list
        return (
            airlines.map((element) => (
                <div>
                    <div className="full-name">
                        <h3>{element.airlineName}</h3>
                    </div>

                    <div className="other-shit">
                        <h5>airlineCode: {element.airlineCode}</h5>
                        {
                            element.sponsored == true ? (
                                <h5>sponsored: True</h5>
                            ) : (
                                <h5>sponsored: False</h5>
                            )
                        }
                        <button>set as sponsored</button>
                        <button>remove as sponsored</button>
                        <hr></hr>
                    </div>
                </div>
            ))
        )

    }

    async function sponsorAirline()
    {
        // retrieve data from db
        await fetch('/updateSponsorship', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                airlineCode: document.getElementById("airlineCode").value,
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
            alert("Error: airline code not found.");
        });
    }

    async function unsponsorAirline()
    {
        // retrieve data from db
        await fetch('/updateSponsorship', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                airlineCode: document.getElementById("airlineCode").value,
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
            alert("Error: airline code not found.");
        });
    }

    
    // main renderer
    return (
        <div className="single-card">
            <div className="full-name">
                <form>
                    <h4>Mark as Sponsored via Search</h4>
                    <input type='text' id='airlineCode' placeholder='Enter airline code'></input>
                    <submit className='submission' onClick={sponsorAirline}>Sponsor airline</submit>
                </form>
                <hr></hr>
            </div>

            <div className="full-name">
                <form>
                    <h4>Mark as Unsponsored via Search</h4>
                    <input type='text' id='airlineCode' placeholder='Enter airline code'></input>
                    <submit className='submission' onClick={unsponsorAirline}>Unsponsor airline</submit>
                </form>
                <hr></hr>
            </div>

            {/* render the fetched users */}
            <div className="full-name">
                <button onClick={getAirlines}>Refresh Airlines Listing</button>
            </div>

            {renderAirlines()}
        </div>
    )
}

export default AdminViewSponsoredAirlines;