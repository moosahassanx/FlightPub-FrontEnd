import { Slide } from "pure-react-carousel";
import { useEffect, useState }from "react";
import '../Css/Recommend.css'
import paris from "../Images/paris.png";


const CustomSlide = () => {
  const[destinations, setDestinations] = useState([]);
 
  //once redux is implemented, the url mapping will use the /${userType} to dynamically access a prepared set of data to be accessed
  //the suggestion implemented in the final implementation will be based on the Previously searched and booked flights for each user
  //for now the customSlide component fetches top 10 visted destinations from the backend on mount
  useEffect(() => {
       fetch('/destinationtrending')
      .then(response => response.json())
      .then(data =>{ 
        setDestinations(data);
      })
      console.log(destinations);
    }, [])
        
      //then the data fetched is a JSON array that is then mapped into each slide
      //The plan is to render images Dynamically depending on the Destination using google places api
      //once a slide is clicked, more information will be displayed about the chosen destination
      //and the user can then search for flights with a click of a button
        return(
          <>
              { destinations.map((dest, index) => (
                  <Slide index = {index} key= {index}>
                    <div className='Slide' key= {index}>
                    <img src= {paris} alt="Paris" className = "photo"/>
                    {/* <br/> */}
                    &emsp;
                    Visit {dest} &emsp;
                    Price from $
                    </div>
                  </Slide>
                ))
              }
          </>
        )
}

export default CustomSlide;