import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import HolidayModal from '../Components/HoildayModal';
import '../Css/HolidayPackages.css';

function DestinationName(props){
  switch(props.location){
    case "ADL":
      return <h1>Adeladie</h1>
      break;
    case "AMS":
      return <h1>Amsterdam</h1>
      break;
    case "ATL":
      return <h1>Atlanta</h1>
      break;
    case "BKK":
      return <h1>Bangkok</h1>
      break;
    case "BNE":
      return <h1>Brisbane</h1>
      break;
    case "CBR":
      return <h1>Canberra</h1>
      break;
    case "CDG":
      return <h1>Paris - Charles De Gaulle</h1>
      break;
    case "CNS":
      return <h1>Cairns</h1>
      break;
    case "DOH":
      return <h1>Doha</h1>
      break;
    case "DRW":
      return <h1>Darwin</h1>
      break;
    case "DXB":
      return <h1>Dubai</h1>
      break;
    case "FCO":
      return <h1>Rome-Fiumicino</h1>
      break;
    case "GIG":
      return <h1>Rio De Janeiro</h1>
      break;
    case "HBA":
      return <h1>Hobart</h1>
      break;
    case "HEL":
      return <h1>Helsinki</h1>
      break;
    case "HKG":
      return <h1>Hong Kong</h1>
      break;
    case "HNL":
      return <h1>Honolulu</h1>
      break;
    case "JFK":
      return <h1>New York - JFK</h1>
      break;
    case "JNB":
      return <h1>Johannesburg</h1>
      break;
    case "KUL":
      return <h1>Kuala Lumpur</h1>
      break;
    case "LAX":
      return <h1>Los Angeles</h1>
      break;
    case "LGA":
      return <h1>New York - Laguardia</h1>
      break;
    case "LGW":
      return <h1>London-Gatwick</h1>
      break;
    case "LHR":
      return <h1>London-Heathrow</h1>
      break;
    case "MAD":
      return <h1>Madrid </h1>
      break;
    case "MEL":
      return <h1>Melbourne </h1>
      break;
    case "MIA":
      return <h1>Miami </h1>
      break;
    case "MUC":
      return <h1>Munich </h1>
      break;
    case "NRT":
      return <h1>Tokyo - Narita</h1>
      break;
    case "OOL":
      return <h1>Gold Coast</h1>
      break;
    case "ORD":
      return <h1>Chicago - OHare Intl.</h1>
      break;
    case "ORY":
      return <h1>Paris - Orly</h1>
      break;
    case "PER":
      return <h1>Perth</h1>
      break;
    case "SFO":
      return <h1>San Francisco</h1>
      break;
    case "SIN":
      return <h1>Singapore</h1>
      break;
    case "SYD":
      return <h1>Sydney</h1>
      break;
    case "VIE":
      return <h1>Vienna</h1>
      break;
    case "YYZ":
      return <h1>Toronto</h1>
      break;
    default:
      return <h1>Package</h1>
  }
}

function CropPackageEndDate(props){
  const croppedDate = props.newDate.substring(0, 11);
  return <p>Avaliable until: <b>{croppedDate}</b></p>
}

const HolidayPackage = ({packages}) => {
  return(
      <Container fluid>
        {packages.map((data, key) => {
          return(
            <Row key={key}>
              <Col className="col-md-1">
              </Col>
              <Col id="info1" className="col-md-3">
                <>
                {data.airport == null ? <DestinationName location={data.destination_code} /> : <h1>{data.airport}</h1>}
                </>
                <br/>
                <h3>{data.hotel_name}</h3>
                <h4>{data.hotel_star_rating}/5 Stars</h4>
                <p>{data.hotel_description}</p>
                <h3>{data.airline_name}</h3>
                <h4>{data.discount_percentage} % Discount</h4>
                <CropPackageEndDate newDate={data.package_end_datetime} />
                <HolidayModal holidayData={data}/>
              </Col>
              <Col className="col-md-7">
                <img src={require('../Images/HolidayPackages/' + data.destination_code + '.jpg').default} alt="Image not found" />
              </Col>
              <Col className="col-md-1">
              </Col>
            </Row>
          );
        })}
      </Container>
      
  )
}

export default HolidayPackage;