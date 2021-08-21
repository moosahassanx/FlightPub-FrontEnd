// imports
import {useEffect, useState} from 'react';
import '../Css/Discovery.css'
import adelaide from '../Images/city-adelaide.jpg'
import Spinner from 'react-bootstrap/Spinner'


const Discovery = () => {

    // page controller states
    const [discoveryCalculated, setDiscoveryCalculated] = useState(false);
    const [listTagged, setListTagged] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const [covid, setCovidFlag] = useState(false);
    const [uName, setUName] = useState(() => {
        const initial = JSON.parse(localStorage.getItem('user-login-email'));
        return initial;
    });
    const [userHistoryList, setUserHistoryList] = useState([]);

    // tag states

    const [africa, setAfricaFlag] = useState(false);
    const [asia, setAsiaFlag] = useState(false);
    const [europe, setEuropeFlag] = useState(false);
    const [namerica, setNAmericaFlag] = useState(false);
    const [samerica, setSAmericaFlag] = useState(false);
    const [middleEast, setMiddleEastFlag] = useState(false);
    const [mediterranean, setMediterraneanFlag] = useState(false);
    const [oceania, setOceaniaFlag] = useState(false);

    const [beach, setBeachFlag] = useState(false);
    const [alps, setAlpsFlag] = useState(false);
    const [rainforest, setRainforestFlag] = useState(false);
    const [city, setCityFlag] = useState(false);
    const [safari, setSafariFlag] = useState(false);
    const [museum, setMuseumFlag] = useState(false);
    const [themePark, setThemeParkFlag] = useState(false);
    const [musicFestival, setMusicFestivalFlag] = useState(false);
    const [concert, setConcertFlag] = useState(false);
    const [wine, setWineFlag] = useState(false);
    const [scuba, setScubaFlag] = useState(false);
    const [resort, setResortFlag] = useState(false);
    const [balloons, setBalloonsFlag] = useState(false);
    const [restaurant, setRestaurantFlag] = useState(false);
    const [skiing, setSkiingFlag] = useState(false);
    const [hiking, setHikingFlag] = useState(false);
    const [asian, setAsianFlag] = useState(false);
    const [architecture, setArchitectureFlag] = useState(false);
    const [surfing, setSurfingFlag] = useState(false);
    const [fashion, setFashionFlag] = useState(false);

    // user has clicked on Discover button
    function discoveryCalculator()
    {
        setLoading(true);
        setDiscoveryCalculated(!discoveryCalculated);
        getDestinations();
    }
    
    function toggleCovid() { setCovidFlag(!covid); }

    function toggleAfricaFlag() { setAfricaFlag(!africa); }
    function toggleAsiaFlag() { setAsiaFlag(!asia); }
    function toggleEuropeFlag() { setEuropeFlag(!europe); }
    function toggleNAmericaFlag() { setNAmericaFlag(!namerica); }
    function toggleSAmericaFlag() { setSAmericaFlag(!samerica); }
    function toggleMiddleEastFlag() { setMiddleEastFlag(!middleEast)}
    function toggleMediterraneanFlag() { setMediterraneanFlag(!mediterranean); }
    function toggleOceaniaFlag() { setOceaniaFlag(!oceania); }
    
    function toggleBeachFlag() { setBeachFlag(!beach); }
    function toggleAlpsFlag() { setAlpsFlag(!alps); }
    function toggleRainforestFlag() { setRainforestFlag(!rainforest); }
    function toggleCityFlag() { setCityFlag(!city); }
    function toggleSafariFlag() { setSafariFlag(!safari); }
    function toggleMuseumFlag() { setMuseumFlag(!museum); }
    function toggleThemeParkFlag() { setThemeParkFlag(!themePark); }
    function toggleMusicFestivalFlag() { setMusicFestivalFlag(!musicFestival); }
    function toggleConcertFlag() { setConcertFlag(!concert); }
    function toggleWineFlag() { setWineFlag(!wine); }
    function toggleScubaFlag() { setScubaFlag(!scuba); }
    function toggleResortFlag() { setResortFlag(!resort); }
    function toggleBalloonsFlag() { setBalloonsFlag(!balloons); }
    function toggleRestaurantFlag() { setRestaurantFlag(!restaurant); }
    function toggleSkiingFlag() { setSkiingFlag(!skiing); }
    function toggleHikingFlag() { setHikingFlag(!hiking); }
    function toggleAsianFlag() { setAsianFlag(!asian); }
    function toggleArchitectureFlag() { setArchitectureFlag(!architecture); }
    function toggleSurfingFlag() { setSurfingFlag(!surfing); }
    function toggleFashionFlag() { setFashionFlag(!fashion); }

    // tag responses for each image user has clicked
    function getTags()
    {
        let tags = []

        if(africa)
            tags.push('africa');
        if(asia)
            tags.push('asia');
        if(europe)
            tags.push('europe');
        if(namerica)
            tags.push('africa');
        if(samerica)
            tags.push('samerica');
        if(middleEast)
            tags.push('middleEast');
        if(mediterranean)
            tags.push('mediterranean');
        if(oceania)
            tags.push('oceania');


        if(beach)
            tags.push('beach');
        if(alps)
            tags.push('alps');
        if(rainforest)
            tags.push('rainforest');
        if(city)
            tags.push('city');
        if(safari)
            tags.push('safari');
        if(museum)
            tags.push('museums');
        if(themePark)
            tags.push('themePark');
        if(musicFestival)
            tags.push('musicFestival');
        if(concert)
            tags.push('concert');
        if(wine)
            tags.push('wine');
        if(scuba)
            tags.push('scuba');
        if(resort)
            tags.push('resort');
        if(balloons)
            tags.push('balloons');
        if(restaurant)
            tags.push('restaurant');
        if(skiing)
            tags.push('skiing');
        if(hiking)
            tags.push('hiking');
        if(asian)
            tags.push('asian');
        if(architecture)
            tags.push('architecture');
        if(surfing)
            tags.push('surf');
        if(fashion)
            tags.push('fashion');

        return tags.toString();
    }

    useEffect(() => {
        getHistoryList()
    }, [])

    async function handleAddWishlistItem(element) {
        console.log(element);
        let url = `/newWishlistItem?user_name=` + uName + `&countryCode3=` + element.destinationCode;
        await fetch(url)
        .then(response => console.log(response));
    }

    async function getHistoryList()
    {
        if(uName == null)
            return;
        
        let top3 = [];

        const fetchData = async () => {
            const response = await fetch('/getUserHistory?userName=' + uName)
            const json = await response.json();

            console.log(JSON.parse(localStorage.getItem('user-login-name')));

            json.forEach(e => top3.push(
                <td>
                    <label className="history-flight-data">
                        <img className="history-flight-img" src={adelaide} width="100" height="100"/>
                        <div className="history-flight-text">
                            <p>From: {e.flight.departureCode.airport.toString()}</p>
                            <p>To: {e.flight.destinationCode.airport.toString()}</p>
                        </div>
                        <div className="flight-history-button">
                            <button className="bookButton">Book Now!</button>
                        </div>
                    </label>
                </td>
            ));
            setUserHistoryList(await top3)
        }

        fetchData();

        return top3;
    }

    // tag retrieving algorithm
    async function getDestinations()
    {
        // local storage
        setListTagged(null);

        // array splitting and retrieving
        let taggedDestinations = [];
        var inputTags = getTags();
        var inputTagSplitter = inputTags.split(',');

        if(covid)
        {
            // retrieve data from db
            await fetch('/getNonCovidDestinations')
            .then(response => response.json())
            .then(json => json.forEach(element => {

                // iterate through every destination
                var tagsSplitter = element.tags.split(', ');

                // check if the input tags match any of the tags in the tags in this destination
                inputTagSplitter.forEach(i => {
                    tagsSplitter.forEach(j => {
                        // db tag and input tag match
                        if(i == j)
                        {
                            // add tag to display list
                            taggedDestinations.push(
                                <tr>
                                    <label className="history-flight-data">
                                        <img className="history-flight-img" src={adelaide} width="100" height="100"/>
                                        <div className="history-flight-text">
                                            <h4>{element.airport.toString()}</h4>
                                            <p>{element.countryCode3.countryName.toString()}</p>
                                        </div>
                                    </label>
                                </tr>
                            );
                            console.log(element);
                        }
                    });
                });
            }))
        }
        else
        {
            // retrieve data from db
            await fetch('/getDestinations')
            .then(response => response.json())
            .then(json => json.forEach(element => {

                // iterate through every destination
                var tagsSplitter = element.tags.split(', ');

                // check if the input tags match any of the tags in the tags in this destination
                inputTagSplitter.forEach(i => {
                    tagsSplitter.forEach(j => {
                        // db tag and input tag match
                        if(i == j)
                        {
                            // add tag to display list
                            taggedDestinations.push(
                                <tr>
                                    <label className="history-flight-data">
                                        <img className="history-flight-img" src={adelaide} width="100" height="100"/>
                                        <div className="history-flight-text">
                                            <h4>{element.airport.toString()}</h4>
                                            <p>{element.countryCode3.countryName.toString()}</p>
                                        </div>
                                        <div className="flight-history-button">
                                            <button className="bookButton" onClick={() => handleAddWishlistItem(element)}>
                                                Add to Wishlist
                                            </button>
                                        </div>
                                    </label>
                                </tr>
                            );
                            console.log(element);
                        }
                    });
                });
            }))
        }

        // set display list for rendering
        //setListTagged(taggedDestinations.toString());
        setListTagged(taggedDestinations);

        // stop loading spinner
        var currentTime = new Date().getTime();
        while (currentTime + 1500 >= new Date().getTime()) {}
        setLoading(false);

        return taggedDestinations;
    }

    return (
        <div className="discovery-div">
            <h1>Revisit</h1>
            <p>How about revisiting one of your previous destinations?</p>

            {
                <table className="history-flight-table">
                    {
                        userHistoryList == null || userHistoryList == '' ? (
                            <p>Unable to get user history list.</p>
                        ) : (
                            <tr>{userHistoryList}</tr>
                        )
                    }
                </table>
            }

            <h1>Discovery</h1>

            <p></p>

            <h3>Destination</h3>
            <table className='discovery-text-table'>
                <tr>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleAfricaFlag}>Africa</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleAsiaFlag}>Asia</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleEuropeFlag}>Europe</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleNAmericaFlag}>North America</span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleSAmericaFlag}>South America</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleMediterraneanFlag}>Mediterranean</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleMiddleEastFlag}>Middle East</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleOceaniaFlag}>Oceania</span>
                        </label>
                    </td>
                </tr>
            </table>

            <h3>Geography</h3>
            <table className='discovery-text-table'>
                <tr>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleBeachFlag}>Beach</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleAlpsFlag}>Alps</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleRainforestFlag}>Rainforest</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleCityFlag}>City</span>
                        </label>
                    </td>
                </tr>
            </table>

            <h3>Entertainment</h3>
            <table className='discovery-text-table'>
                <tr>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleSafariFlag}>Safari</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleMuseumFlag}>Museum</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleThemeParkFlag}>Theme Park</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleMusicFestivalFlag}>Music Festival</span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleConcertFlag}>Concert</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleWineFlag}>Wine Tours</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleScubaFlag}>Scuba Diving</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleResortFlag}>Resort</span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleBalloonsFlag}>Balloon Rides</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleRestaurantFlag}>Restaurants</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleSkiingFlag}>Skiing</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleHikingFlag}>Hiking</span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleAsianFlag}>Asian Culture</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleArchitectureFlag}>Architecture</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleSurfingFlag}>Surfing</span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-text-switch">
                            <input type="checkbox"/>
                            <span className="discovery-text-slider" onClick={toggleFashionFlag}>Fashion</span>
                        </label>
                    </td>
                </tr>
            </table>

            <br/>

            <p>Would you like to filter out Covid-19 hotspots?</p>
            <label className="discovery-covid-avoidance-switch">
                <input type="checkbox"/>
                <span className="discovery-covid-slider round" onClick={toggleCovid}></span>
            </label>
            
            {
                // check if page is processing
                loading === true ? (
                    // page is calculating discovery list - display spinner
                    <div>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    // page is not processing - suggest button and/or list generated
                    <div>
                        <button className="discovery-button" onClick={discoveryCalculator}>Discover</button>

                        {listTagged == null || listTagged == '' ? (
                            // first time loading or user has not marked any images
                            <p>Click your favourite images and click "Discover".</p>
                        ) : (
                            // display discovery list
                            <table className="history-flight-table">{listTagged}</table>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default Discovery;