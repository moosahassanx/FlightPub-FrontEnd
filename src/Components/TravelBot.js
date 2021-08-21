import React, { createRef, useEffect, useState, useRef } from 'react';
import '../Css/TravelBot.css';
import {getDate} from '../Util/GetDate'

// Travelbot component
// TODO for implementation - Create seperate message parsing file with regex 

const TravelBot = () => {  

    // State and ref variables
    // Will need to transfer state to redux where possible
    let messageRef = useRef();
    const [messages, setMessages] = useState([
        {
            name: 'travelbotMessage',
            message: 'Hey there! I\'m TravelBot and here to help! Type \'Help\' for more information or type \
                      \'Inpire\' for the ultimate travel experience, or \'Trending\' for the best travel destinations.'
        }
    ])
    const [input, setInput] = useState('');
    const [destinations, setDestinations] = useState([]);
    const [tickets, setTickets] = useState([])

    // Adds the messages to the message state array
    // and sets user input to blank
    function addToArray(oldArray, name, message) {

        setMessages(oldArray =>
            [...oldArray,
                {
                    name,
                    message
                }
            ])
        setInput('');     
    }

    // Logic for what message the user has selected
    function sendMessage() {

        if(input !== '' && !destinations.includes(input)) {

            addToArray(messages, 'usermessage', input.toString())

            switch(input) {
                case 'help':
                case 'Help':
                    addToArray(messages, 'travelbotMessage', 'Help section')
                    break;
                
                case 'trending':
                case 'Trending':
                    addToArray(messages, "travelbotMessage", "The current top destination being booked right now are:\n" );
                    trendingDestinations();

                    break;

                case 'inspire':
                case 'Inspire':
                    addToArray(messages, 'travelbotMessage', 'Inspire section')
                    break;             

                default:
                    addToArray(messages, 'travelbotMessage', "Oops! Wrong selection.")
                    break;                                                                   
            }
                      
        }
        // Not implemented, extend functionality to display the upcoming set of flights to the selected location
//         if(destinations.includes("Doha")){
//             getFlightsforDestination();
//         }      
    };

    // Handler if the user uses enter to send message
    const enterPress = (e) => {
        if(e.key === 'Enter'){
            sendMessage()
        }
    }

    // When message state is updated, auto scrolls to the new message in chat view
    useEffect(() => {
        
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
        
    },[messages])
    
    // Extend feature for showing upcoming flights
//     useEffect(() => {
//         renderTicket();
//     },[tickets])

    // Async API call to fetch the trending countries
    // sets the trendingdestination state
    async function trendingDestinations() {

        var trendingMessage = "";
        var newDestinationState = destinations;

        await fetch('/destinationtrending')
            .then(response => response.json())
            .then(json => json.forEach(element => {
                trendingMessage += element;
                trendingMessage += "\n"
                newDestinationState.push(element);
            }))
            .then(setDestinations(newDestinationState))

        addToArray(messages, "travelbotMessage", trendingMessage);
    }   

    // Gets the tickets for upcoming flights for the users choice
    // Setting the ticket state and the useEffect renders the tickets into the chat
    // Doesnt work - Extend functionality in implementation
//     async function getFlightsforDestination() {

//         var newticketState = tickets

//         await fetch('/trendingflights?Destination=' + input)
//               .then(res => res.json())
//               .then(json => json.forEach(e => {
//                   newticketState.push(e)
//               }))
//               .then(setTickets(newticketState))  
//     }

    return (

        <div id="travelbot">
            <div className="chat-box">
                <div className="header">TravelBot</div>
                    <div className="chat-area" ref={messageRef}>
                        { 
                            messages.map((msg) => (
                                (
                                     <div className={msg.name}><span>{ msg.message }</span></div>
                                
                                ) 
                            ))                   
                        }  
                        {/* {
                            renderTicket()
                        } */}
                    </div>
                    <div className="footer">
                        <input type="text" value={input} onInput={ e => setInput(e.target.value) } onKeyDown={enterPress}/>
                        <button onClick={sendMessage} >send</button>
                    </div>
            </div> 
        </div>
    )
}

export default TravelBot;
