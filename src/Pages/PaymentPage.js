import React, { useState, useEffect }  from 'react';
import { Steps } from 'rsuite';
import Card from "react-credit-cards";
import { Row, Col, Card as C, Button} from 'react-bootstrap';
import 'rsuite/dist/styles/rsuite-default.css';
import { formatCreditCardNumber, formatCVC, formatExpirationDate} from "../Util/CardUtils.js";
import 'react-credit-cards/es/styles-compiled.css';
import '../Css/Payment.css';
import moment from 'moment';


const PaymentPage = () => {
    const [paymentData, setPaymentData] = useState({ name: '', number: '', expiry: '', cvc: '', issuer: '', formData: null });
    const [paymentComplete, setPaymentComplete] = useState(false);
    const [payId, setPayId] = useState();
    const [loggedIn, setLoggedIn] = useState(false);
    const [flight, setFlight] = useState();
    const [returnFlight, setReturnFlight] = useState();
    const [ticket, setTicket] = useState();
    const [reTicket, setReTicket] = useState();
    const [passData, setPassData] = useState();
    const [number, setNumber] = useState("");
    const [focused, setFocused] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    let total = 0;
    const instance = (
        <Steps current={2} style={{cursor: "pointer"}}>
            <Steps.Item title="Ticket Selection " onClick={event => window.location.href='/TicketSelectionPage'}/>
            <Steps.Item title="Passenger Details "onClick={event => window.location.href='/Booking'}/>
            <Steps.Item title='Payment'/>
            <Steps.Item title="Booking Confirmation "/>
        </Steps>
      );
    useEffect(() => {
        let data = sessionStorage.getItem('returnFlight');
        let data2 = sessionStorage.getItem('flight');
        let logged = localStorage.getItem('user-login-state');
        if(data === null && data2 === null){
            window.location.href='/'
        }
        if(logged === 'true'){
            setLoggedIn(logged)
        }
        if(data != null){
            setReturnFlight(JSON.parse(sessionStorage.getItem('returnFlight')));
            setFlight(JSON.parse(sessionStorage.getItem('flight')));
        } else{
            setFlight(JSON.parse(sessionStorage.getItem('flight')));
        }
        setTicket(JSON.parse(sessionStorage.getItem('ticket')));
        setReTicket(JSON.parse(sessionStorage.getItem('returnTicket')))
        setPassData(JSON.parse(sessionStorage.getItem('formData')));
    }, [])
    
    async function makePayment(){
        let userId = "";
        let url = "";
        console.log('in pay');
        if(loggedIn){
            userId = passData[0].userId;
            url = `http://localhost:8080/makeRPayment?price=${total}&userId=${userId}`
        } else{
            userId = passData[0].gUserId;
            url = `http://localhost:8080/makeGPayment?price=${total}&guestUserId=${userId}`
        }
        return await fetch(url)
        .then(res => res.json())
        .then(data => {
            setPayId(data)
            console.log(data)
        })
    }

    async function makeBooking(){
        Promise.all(passData.map((item)=>{
            let date = new Date(flight.departureTime)
            date.setTime(date.getTime() + (10*60*60*1000));
            date = date.toISOString()
            console.log(date)
            if(loggedIn){
                let urlReg = `http://localhost:8080/makeRBooking?fNumber=${flight.flightNumber}&payComp=Yes&payId=${payId}&uId=${item.userId}&aCode=${flight.airlineCode.airlineCode}&fDepTime=${date}&DesCode=${flight.destinationCode.destinationCode}&classCode=${ticket.ticketClass.classCode}&ticketCode=${ticket.ticketType.ticketCode}`
                let urlRegGuest = `http://localhost:8080/makeBooking?fNumber=${flight.flightNumber}&payComp=Yes&payId=${payId}&uId=${item.userId}&gUId=${item.gUserId}&aCode=${flight.airlineCode.airlineCode}&fDepTime=${date}&DesCode=${flight.destinationCode.destinationCode}&classCode=${ticket.ticketClass.classCode}&ticketCode=${ticket.ticketType.ticketCode}`
                if(!item.gUserId){
                   fetch(urlReg).then(r => r.json())
                } else {
                    fetch(urlRegGuest).then(r => r.json())
                }
            } else {
                let urlGuest = `http://localhost:8080/makeGBooking?fNumber=${flight.flightNumber}&payComp=Yes&payId=${payId}&gUId=${item.gUserId}&aCode=${flight.airlineCode.airlineCode}&fDepTime=${date}&DesCode=${flight.destinationCode.destinationCode}&classCode=${ticket.ticketClass.classCode}&ticketCode=${ticket.ticketType.ticketCode}`
                console.log(urlGuest)
                fetch(urlGuest).then(r => r.json())
            }
        }));
        if(reTicket){
            Promise.all(passData.map((item)=>{
                let date = new Date(returnFlight.departureTime)
                date.setTime(date.getTime() + (10*60*60*1000));
                date = date.toISOString()
                console.log(date)
                if(loggedIn){
                    let urlReg = `http://localhost:8080/makeRBooking?fNumber=${returnFlight.flightNumber}&payComp=Yes&payId=${payId}&uId=${item.userId}&aCode=${returnFlight.airlineCode.airlineCode}&fDepTime=${date}&DesCode=${returnFlight.destinationCode.destinationCode}&classCode=${reTicket.ticketClass.classCode}&ticketCode=${reTicket.ticketType.ticketCode}`
                    let urlRegGuest = `http://localhost:8080/makeBooking?fNumber=${returnFlight.flightNumber}&payComp=Yes&payId=${payId}&uId=${item.userId}&gUId=${item.gUserId}&aCode=${returnFlight.airlineCode.airlineCode}&fDepTime=${date}&DesCode=${returnFlight.destinationCode.destinationCode}&classCode=${reTicket.ticketClass.classCode}&ticketCode=${reTicket.ticketType.ticketCode}`
                    if(!item.gUserId){
                       fetch(urlReg).then(r => r.json())
                    } else {
                        fetch(urlRegGuest).then(r => r.json())
                    }
                } else {
                    let urlGuest = `http://localhost:8080/makeGBooking?fNumber=${returnFlight.flightNumber}&payComp=Yes&payId=${payId}&gUId=${item.gUserId}&aCode=${returnFlight.airlineCode.airlineCode}&fDepTime=${date}&DesCode=${returnFlight.destinationCode.destinationCode}&classCode=${reTicket.ticketClass.classCode}&ticketCode=${reTicket.ticketType.ticketCode}`
                    fetch(urlGuest).then(r => r.json())
                }
            }));
        }
    }
  
    const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
        setPaymentData({ issuer: issuer });
    }
    };

    const handleInputFocus = ({ target }) => {
        setFocused(target.name);
    };

    const handleInputChange = ({ target }) => {
    if (target.name === "number") {
        target.value = formatCreditCardNumber(target.value)
        setNumber(target.value);
    } else if (target.name === "expiry") {
        target.value = formatExpirationDate(target.value)
        setExpiry(target.value);
    } else if (target.name === "cvc") {
        target.value = formatCVC(target.value);
        setCvc(target.value);
        // setPaymentData({cvc: target.value});
    } else if (target.name === "name"){
        setName(target.value);
        // setPaymentData({name: target.value});
    }
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    const formData = [...e.target.elements]
        .filter((d) => d.name)
        .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
        }, {});

    setPaymentData(formData);
    makePayment()
    console.log(paymentData);
      };
    const calculateTotal=()=>{
        let t = 0;
        let r = 0;
        t = ticket.totalPrice;
        t = t * passData.length;
        if(reTicket)
        {
            r = reTicket.totalPrice;
            r = r * passData.length;
        }
        t = t + r;
        total = t.toFixed(2);
        return t.toFixed(2);
    }
    useEffect(() => {
        if(passData)
            makeBooking().then(setPaymentComplete(true));
    }, [payId])
    
    return(
        <div className="container-fluid text-center  mx-2 mb-4 ">
            <br/>{instance} <br />
            <h1>Payment</h1>
            <div key="Payment">
            <Row className="d-flex justify-content-center">
            <div className="passDetails border mb-2 mx-2" as={Col}>
            {passData &&
            <>
                <h3>Passenger details</h3>
                    {passData.map((item) => { 
                        return[
                        <div className="border">
                            <Row className="mb-2 mx-2">
                                <Col>
                                    First Name: {item.fName}
                                </Col>
                                <Col>
                                    Last Name: {item.lName}
                                </Col>
                            </Row>    
                            <Row className="mb-2 mx-2">
                                <Col>
                                    Email: {item.email}
                                </Col>
                                <Col>
                                    Phone Number: {item.pNum}
                                </Col>
                            </Row> 
                        </div> 
                        ]
                    })}
                
            
                </>} 
            </div>
        <div className="App-payment border start-50" as={Col}>
        {flight &&
          <>
            <h3>The total to be paid is ${calculateTotal()}</h3>
          </>
         }
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={handleCallback}
          />
          <br/>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Expiry date"
                  pattern="\d\d/\d\d"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={paymentData.issuer} />
            <div className="form-actions">
              <button className={!paymentComplete?"btn btn-primary btn-block" : "btn btn-success btn-block"} disabled={paymentComplete}>
                  {paymentComplete? 'Payment succesful':'Pay'}
                </button>
            </div>
          </form>
        </div>
        <div className="tickets border mb-2 mx-2" as={Col}>
            <h3>The Selected Tickets</h3>
            {ticket && 
                 <C>
                 <C.Header as="h5">{ticket.ticketType.name}</C.Header>
                 <C.Body>
                     <C.Title>Price ${ticket.totalPrice}</C.Title>
                     <C.Text>
                         {ticket.ticketType.exchangeable? 'Exchangeable' : 'Non-Exchangeable'} <br/>
                         Frequent Flyer Points: {ticket.ticketType.frequentFlyerPoints? 'Yes':'No'} <br/>
                         {ticket.ticketType.refundable? 'Refundable':'Non-Refundable'} <br/>
                         {ticket.ticketType.transferable? 'Transferable': 'Non-Transferable'} <br/>
                         {ticket.priceLeg1? 'Leg 1 Price $' + ticket.priceLeg1:''} <br/>
                         {ticket.priceLeg2? 'Leg 2 Price $' + ticket.priceLeg2:''}
                     </C.Text>
                 </C.Body>
                 </C>
            }
            {reTicket && 
                 <C>
                 <C.Header as="h5">{reTicket.ticketType.name}</C.Header>
                 <C.Body>
                     <C.Title>Price ${reTicket.totalPrice}</C.Title>
                     <C.Text>
                         {reTicket.ticketType.exchangeable? 'Exchangeable' : 'Non-Exchangeable'} <br/>
                         Frequent Flyer Points: {reTicket.ticketType.frequentFlyerPoints? 'Yes':'No'} <br/>
                         {reTicket.ticketType.refundable? 'Refundable':'Non-Refundable'} <br/>
                         {reTicket.ticketType.transferable? 'Transferable': 'Non-Transferable'} <br/>
                         {reTicket.priceLeg1? 'Leg 1 Price $' + reTicket.priceLeg1:''} <br/>
                         {reTicket.priceLeg2? 'Leg 2 Price $' + reTicket.priceLeg2:''}
                     </C.Text>
                 </C.Body>
                 </C>
            }
             </div>
             </Row>
            </div>
            <Button variant="primary"  onClick={event => window.location.href='/ConfirmPage'} disabled={!paymentComplete} >
                 Next
            </Button>
     </div>
       
    )
}

export default PaymentPage;