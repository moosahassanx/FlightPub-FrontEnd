import {React, useState, useEffect } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import HolidayPackage from '../Components/HolidayPackage';
import '../Css/HolidayPackages.css';




const HolidayPackages = () => {

  // State for the holiday packages flightpub offers
  const [soloHolidayPackages,setSoloHolidayPackages] = useState([]);
  const [familyHolidayPackages,setFamilyHolidayPackages] = useState([]);
  const [seniorHolidayPackages,setSeniorHolidayPackages] = useState([]);
  const [businessHolidayPackages,setBusinessHolidayPackages] = useState([]);
  const [trendingDestinations,setTrendingDestinations] = useState([]);
  const [recommendedHolidayPackages,setRecommendedHolidayPackages] = useState([]);
  
  useEffect(() => {
    const fetchSoloData = async () => {
    const response = await fetch('/getSoloHolidayPackages');
    const data = await response.json();
    setSoloHolidayPackages(await data)
  }
    const fetchFamilyData = async () => {
    const response = await fetch('/getFamilyHolidayPackages');
    const data = await response.json();
    setFamilyHolidayPackages(await data)
  } 
    const fetchSeniorData = async () => {
    const response = await fetch('/getSeniorHolidayPackages');
    const data = await response.json();
    setSeniorHolidayPackages(await data)
  } 
    const fetchBusinessData = async () => {
    const response = await fetch('/getBusinessHolidayPackages');
    const data = await response.json();
    setBusinessHolidayPackages(await data)
  }
    const fetchTrendingData = async () => {
    const response = await fetch('/trendingDestinations');
    const data = await response.json();
    setTrendingDestinations(await data)
  }
    const fetchRecommendedData = async () => {
    const response = await fetch('/getRecommended');
    const data = await response.json();
    setRecommendedHolidayPackages(await data)
  }
    fetchSoloData();
    fetchFamilyData();
    fetchSeniorData();
    fetchBusinessData();
    fetchTrendingData();
    fetchRecommendedData();
  },[])

  return(
    <main>
      <Container fluid>
        <Row>
          <Col id="centre">
            <h1>Our Recommened Holiday Package</h1>
          </Col>
        </Row>
        <Row>
          <HolidayPackage packages={recommendedHolidayPackages}/>
        </Row>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col id="centre">
            <h1>Explore Our Holiday Packages</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto" id="solo">
            <a href="#solo-travellers" class="a">Solo Travellers ></a>
          </Col>
          <Col md="auto" id="family">
            <a href="#family-travellers" class="a">Family Travellers ></a>
          </Col>
          <Col md="auto" id="senior">
            <a href="#senior-travellers" class="a">Senior Travellers ></a>
          </Col>
          <Col md="auto" id="business">
            <a href="#business-travellers" class="a">Business Travellers ></a>
          </Col>
        </Row>
        <br/>
        <br/>
        <br/>
        <a name="solo-travellers"></a>
        <Row>
          <Col id="centre">
            <h1>Solo Traveller Holiday Packages</h1>
          </Col>
        </Row>
        <Row>
          <HolidayPackage packages={soloHolidayPackages}/>
        </Row>
        <br/>
        <br/>
        <br/>
        <a name="family-travellers"></a>
        <Row>
          <Col id="centre">
            <h1>Family Traveller Holiday Packages</h1>
          </Col>
        </Row>
        <Row>
          <HolidayPackage packages={familyHolidayPackages}/>
        </Row> 
        <br/>
        <br/>
        <br/>
        <a name="senior-travellers"></a>
        <Row>
          <Col id="centre">
            <h1>Senior Traveller Holiday Packages</h1>
          </Col>
        </Row>
        <Row>
          <HolidayPackage packages={seniorHolidayPackages}/>
        </Row>
        <br/>
        <br/>
        <br/>
        <a name="business-travellers"></a>
        <Row>
          <Col id="centre">
            <h1>Business Traveller Holiday Packages</h1>
          </Col>
        </Row>
        <Row>
          <HolidayPackage packages={businessHolidayPackages}/>
        </Row>
      </Container>
    </main>
  )
}

export default HolidayPackages;