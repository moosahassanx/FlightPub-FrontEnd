import React, { useState, useEffect }  from 'react';
import { Steps } from 'rsuite';
import Card from "react-credit-cards";
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'rsuite/dist/styles/rsuite-default.css';
import { formatCreditCardNumber, formatCVC, formatExpirationDate} from "../Util/CardUtils.js";
import 'react-credit-cards/es/styles-compiled.css';
import '../Css/Payment.css';


const PaymentPage = () => {
    const [paymentData, setPaymentData] = useState({ name: '', number: '', expiry: '', cvc: '', issuer: '', formData: null });
    const [focused, setFocused] = useState("")
    const instance = (
        <Steps current={2}>
            <Steps.Item title="Ticket Selection " onClick={event => window.location.href='/TicketSelectionPage'}/>
            <Steps.Item title="Passenger Details "onClick={event => window.location.href='/BookingPage'}/>
            <Steps.Item title='Payment'/>
            <Steps.Item title="Booking Confirmation "/>
        </Steps>
      );
    useEffect(() => {
        
    }, [])

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
        // setPaymentData({number: target.value});
    } else if (target.name === "expiry") {
        target.value = formatExpirationDate(target.value)
        // setPaymentData({expiry: target.value});
        console.log(paymentData.expiry)
    } else if (target.name === "cvc") {
        target.value = formatCVC(target.value)
        // setPaymentData({cvc: target.value});
    } else if (target.name === "name"){
        // setPaymentData({name: target.value});
    }
    // setPaymentData({[target.name]: target.value});
    console.log(paymentData)
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
    console.log(paymentData)
        // this.form.reset();
      };
    
    return(
        <div className="container-fluid text-center">
            <br/>{instance} <br />
            <h1>Payment</h1>
            <div key="Payment">
        <div className="App-payment">
          <Card
            number={paymentData.number}
            name={paymentData.name}
            expiry={paymentData.expiry}
            cvc={paymentData.cvc}
            focused={focused}
            callback={handleCallback}
          />
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
                  placeholder="Valid Thru"
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
              <button className="btn btn-primary btn-block">PAY</button>
            </div>
          </form>
        </div>
      </div>
        </div>
       
    )
}

export default PaymentPage;