import {useState, useEffect} from 'react'
import '../Css/AdminViewSponsoredAirlines.css';

const AdminViewSponsoredAirlines = () => {
    // use states
    const [airlines, setAirlines] = useState([]);
    
    // fetching list of users
    async function getAirlines()
    {
        // retrieve data from db
        await fetch('http://localhost:8080/getAirlines')
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
                        <h5>sponsored: {element.sponsored}</h5>
                        <button>set as sponsored</button>
                        <button>remove as sponsored</button>
                        <hr></hr>
                    </div>
                </div>
            ))
        )

    }
    
    // main renderer
    return (
        <div className="single-card">
            {/* render the fetched users */}
            <div className="full-name">
                <button onClick={getAirlines}>Refresh Airlines Listing</button>
            </div>

            {renderAirlines()}
        </div>
    )
}

export default AdminViewSponsoredAirlines;