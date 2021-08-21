import React, { useState, useEffect } from 'react';
import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import '../Css/modal.css';

function CropPackageEndDate(props){
  const croppedDate = props.newDate.substring(0, 11);
  return <p>Avaliable until: <b>{croppedDate}</b></p>
}

function VerticallyCenteredModal(props) {
    const isLogged = localStorage.getItem('user-login-state');
    const loggerEmail = JSON.parse(localStorage.getItem('user-login-email'));
    const [departureDate, setDepartureDate] = useState(new Date());
    const [numberOfTravellers, setnumberOfTravellers] = useState(1);
    const [userId, setUserId] = useState();
    const [userData, setUserData] = useState();
    const [flight, setFlight] = useState();
    const minDate = new Date();
    const maxDate = new Date(props.data.package_end_datetime);

    const handleDepDate = (date) =>{
      setDepartureDate(date);
      getFlight(props.data.airline_code, props.data.destination_code, departureDate);
    }

    const handleNumberOfTravellers = (event) =>{
      setnumberOfTravellers(event.target.value);
    }

    function myFunction(){
      alert('Thank you for booking with FlightPub');
    }

    async function getFlight(ac, dc, dd) {
      let in1Day = new Date();
      in1Day.setDate(dd.getDate() + 1);
      
      let minus1Day = new Date();
      minus1Day.setDate(dd.getDate() - 1);
      
      let url = `/getflight?1=${ac}&2=${dc}&3=${minus1Day.toJSON()}&4=${in1Day.toJSON()}`
      return await fetch(url)
      .then(response => response.json())
      .then(data =>{
        setFlight(data);
      })
    }

    async function bookHolidayPackage(fn, numberOfTravellers, userId, ac, dt){
      var url = `/makeNewBooking?1=${fn}&2=yes&3=${userId}&4=${ac}&5=${dt}&6=${ac}&7=1`;
      return await fetch(url)
          .then(response => response.json())     
    }
 
    async function getUserId(){
      let url = `/getDetails?userName=${loggerEmail}`
      return await fetch(url)
      .then(response => response.json())
      .then(data =>{
        setUserData(data);
        setUserId(data.id);
      })
    }

    useEffect(() => {
      if(userId === 'null' && loggerEmail !== 'null'){
          getUserId();
      }
      getFlight(props.data.airline_code, props.data.destination_code, departureDate);
    }, [loggerEmail])

    

    return (
      
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Holiday Package
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <h5>{props.data.airline_name} and {props.data.hotel_name} have partnered together
              to create the ultimate {props.data.target_user} holiday package.</h5>
              <br/>
            </Row>
            <Row>  
              <p>Both companies are offering: <b>{props.data.discount_percentage} % Discount</b></p>
              <br/>
            </Row>
            <Row>
              <CropPackageEndDate newDate={props.data.package_end_datetime} />
              <br/>
            </Row>
            <Row>
              <h5>{props.data.hotel_name}</h5>
              <br/>
            </Row>
            <Row>
              <p><b>{props.data.hotel_star_rating}/5 Stars</b></p>
              <br/>
            </Row>
            <Row>
              <p>{props.data.hotel_description}</p>
              <br/>
              <br/>
            </Row>
            <Row className="d-flex justify-content-center">
              <Col classname="d-flex justify-content-center">
                <p>Number of Travellers:</p>
              </Col>
              <Col>
                <p>Select your desired departing date:</p>
              </Col>
              <br/>
            </Row>
            <Row className="d-flex justify-content-center">
              <Col>
                <select value={numberOfTravellers} onChange={handleNumberOfTravellers}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                </select>
              </Col>
              <Col>
                <DatePicker
                  selected={departureDate}
                  minDate={minDate}
                  maxDate={maxDate}
                  onChange={handleDepDate}
                />
              </Col>       
              <br/>
            </Row>
            <br/>
            <Row className="d-flex justify-content-center">
            <>
            {isLogged == 'true' ?
              <Button onClick={() => myFunction()}>Book Holiday Package</Button>
            : <p> Please Login/Register to book this holiday package</p>}
            </>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
}

const HolidayModal = ({holidayData}) => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Learn More
        </Button>

        <VerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={holidayData}
        />
      </>      
    );
}

export default HolidayModal;