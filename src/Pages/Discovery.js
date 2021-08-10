// imports
import {useState} from 'react';
import '../Css/Discovery.css'
import '../Images/city-adelaide.jpg'
import Spinner from 'react-bootstrap/Spinner'

const Discovery = () => {

    // page controller states
    const [discoveryCalculated, setDiscoveryCalculated] = useState(false);
    const [listTagged, setListTagged] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const [covid, setCovidFlag] = useState(false);

    // tag states
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

    // incremental counters
    /*
    function addTag(e)
    {
        var newTags = tags;

        if(newTags.indexOf(e) != -1)
            newTags.push(e);
        else
            newTags.splice(newTags.indexOf(e));
        setTags(newTags);
    }*/

    function toggleCovid() { setCovidFlag(!covid); }
    
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

    async function getHistoryRecommendations()
    {
        let top3 = [];

        await fetch('http://localhost:8080/')
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
            await fetch('http://localhost:8080/getNonCovidDestinations')
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
                            taggedDestinations.push(' ' + element.airport);
                        }
                    });
                });
            }))
        }
        else
        {
            // retrieve data from db
            await fetch('http://localhost:8080/getDestinations')
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
                            taggedDestinations.push(' ' + element.airport);
                        }
                    });
                });
            }))
        }

        // set display list for rendering
        setListTagged(taggedDestinations.toString());

        // stop loading spinner
        var currentTime = new Date().getTime();
        while (currentTime + 1500 >= new Date().getTime()) {}
        setLoading(false);

        return taggedDestinations;
    }

    return (
        <div className="discovery-div">
            <h1>Revisit</h1>

            

            <h1>Discovery</h1>

            <p>Select any images that appeal to you.</p>

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

            {/* list of images for user to select }
            <table className='discovery-table'>
                <tr>
                    <td>
                        <label className="discovery-switch" id='beach'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleBeachFlag}></span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-switch" id='alps'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleAlpsFlag}></span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-switch" id='rainforest'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleRainforestFlag}></span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-switch" id='city'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleCityFlag}></span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label className="discovery-switch" id='safari'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleSafariFlag}></span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-switch" id='museum'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleMuseumFlag}></span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-switch" id='themePark'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleThemeParkFlag}></span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-switch" id='musicFestival'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleMusicFestivalFlag}></span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label className="discovery-switch" id='concert'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleConcertFlag}></span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-switch" id='wine'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleWineFlag}></span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-switch" id='scuba'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleScubaFlag}></span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-switch" id='resort'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleResortFlag}></span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label className="discovery-switch" id='balloons'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleBalloonsFlag}></span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-switch" id='restaurant'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleRestaurantFlag}></span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-switch" id='skiing'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleSkiingFlag}></span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-switch" id='hiking'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleHikingFlag}></span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label className="discovery-switch" id='asian'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleAsianFlag}></span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-switch" id='architecture'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleArchitectureFlag}></span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-switch" id='surfing'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleSurfingFlag}></span>
                        </label>
                    </td>
                    <td>
                        <label className="discovery-switch" id='fashion'>
                            <input type="checkbox"/>
                            <span className="discovery-slider" onClick={toggleFashionFlag}></span>
                        </label>
                    </td>
                </tr>
            </table>

    */}

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
                            <p><strong>List of destinations calculated:</strong> {listTagged}</p>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default Discovery;