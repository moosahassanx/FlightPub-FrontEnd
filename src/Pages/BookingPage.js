// Extending to show the booking and advantages FlightPub offers over competition
import React, { useState, useEffect }  from 'react';
import { Steps } from 'rsuite';
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'rsuite/dist/styles/rsuite-default.css';


const BookingPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggerName, setLoggerName] = useState();
    const [loggerLastName, setLoggerLastName] = useState();
    const [loggerEmail, setLoggerEmail] = useState();
    const [userId, setUserId] = useState();
    const [userData, setUserData] = useState();
    const [formData, setFormData] = useState([]);
    const [fName, setFName] = useState();
    const [lName, setLName] = useState();
    const [pNum, setPNum] = useState();
    const [email, setEmail] = useState();
    const [passNum, setPassNum]  = useState(1);
    const [logDet, setLogDet] = useState(false);
    const instance = (
        <Steps current={1} style={{cursor: "pointer"}}>
            <Steps.Item title="Ticket Selection "/>
            <Steps.Item title="Passenger Details "/>
            <Steps.Item title='Payment'/>
            <Steps.Item title="Booking Confirmation "/>
        </Steps>
      );
    async function getUserId(){
        console.log(loggerEmail)
        let url = `http://localhost:8080/getDetails?userName=${loggerEmail}`
        return await fetch(url)
        .then(response => response.json())
        .then(data =>{
            setUserData(data);
            setUserId(data.id);
        })
    }
    
    useEffect(() => {
        setPassNum(sessionStorage.getItem('passNum'));
        let data = sessionStorage.getItem('ticket');
        let data2 = sessionStorage.getItem('returnTicket');
        if(data === null && data2 === null){
            window.location.href='/'
        }
        setTimeout(() => {
            const email = JSON.parse(localStorage.getItem('user-login-email'));
            const name = JSON.parse(localStorage.getItem('user-login-name'));
            const last = JSON.parse(localStorage.getItem('user-login-last-name'))
            setLoggedIn(JSON.parse(localStorage.getItem('user-login-state')));
            if(name){
                setLoggerName(name[0]);
                setLoggerLastName(last[0]);
                setLoggerEmail(email[0]);
                setFName(name[0]);
                setLName(last[0]);
                setEmail(email[0]);
            }
        }, 100);
    }, [])
    useEffect(() => {
        console.log(loggerEmail)
        if(loggerEmail !== 'null' && loggerEmail !== undefined){
            getUserId();
        }
            
    }, [loggerEmail])

    async function getGUserId(item){
        let url = `http://localhost:8080/getGuserId?email=${item.email}&firstName=${item.fName}&lastName=${item.lName}&phoneNumber=${item.pNum}`
        return await fetch(url)
        .then(response => response.json())   
    }

    useEffect(() => {
        if(formData.length === parseInt(passNum)){
            formData.forEach((item)=>{
                if(!item.loggedUser){
                    getGUserId(item).then(data =>{
                        console.log(data)
                        item.gUserId = data;
                        sessionStorage.setItem("formData", JSON.stringify(formData));
                    })
                }
            })
        }
        setFName('');
        setLName('');
        setPNum('');
        setEmail('');
        sessionStorage.setItem("formData", JSON.stringify(formData));
    }, [formData])

    // validates all inputs and returns true or false
    const validates = () => 
    {
        let validationRule = /^(\d|\w)+$/i;
        let pattern = /[\d]{8}/g;
        let errors = "";
        console.log(fName)
        if (!fName) {
            errors += "first name cannot be blank.\n";
        }
        else if(!validationRule.test(fName)){
            errors += "first name cannot contain spaces or special characters.\n";
        }
        if (!lName) {
            errors +="last name cannot be blank.\n";
        }
        else if(!validationRule.test(lName)){
            errors +="last name cannot contain spaces or special characters.\n";
        }
        if (!pNum) {
            errors += "phone number cannot be blank.\n";
        }
        else if (!pattern.test(pNum)) {
            errors +="phone number is incorrect. It must be a valid Australian mobile number.\n";
        }
        if (email !== loggerEmail && !email) {
            errors +="email cannot be blank.\n";
        }
        else if (email !== loggerEmail && (!email.includes("@") || !email.includes("."))) {
            errors +="invalid email.\n";
        } 
        if (errors.length > 0) {
            alert(errors);
            return false;
        }
        return true;
    };
    const handleFName = (e) =>{
        setFName(e.target.value);
    }
    const handleLName = (e) =>{
        setLName(e.target.value);
    }
    const handleEmail = (e) =>{
        setEmail(e.target.value);
        console.log(email)
    }
    const handlePNum = (e) =>{
        setPNum(e.target.value);
        console.log(pNum)
    }
    const handleRemove = (i) =>{
        console.log(i)
        if(i.email === loggerEmail){
            setLogDet(false)
        }
        const newList = formData.filter((item) => item !== i);
        setFormData(newList);
    }
    const handleSubmit = (e) =>{
        if(validates()){
            if(loggerEmail === email){
                setLogDet(true);
                console.log('im here ')
                setFormData(old => {
                    return [...old, {userId: userId, gUserId: '',fName: fName, lName: lName, pNum: pNum, email: email, loggedUser: true}]
                })
            } else{
                if(loggedIn === true){
                    setFormData(old => {
                        return [...old, {userId: userId, gUserId: '',fName: fName, lName: lName, pNum: pNum, email: email, loggedUser: false}]})
                } else{
                    setFormData(old => {
                        return [...old, {gUserId: '',fName: fName, lName: lName, pNum: pNum, email: email, loggedUser: false}]
                    })
             }
            
          }
        e.preventDefault()
    }
}
    const renderContent = () =>{
        if(loggedIn === true && logDet != true){
            return[
                <>
                {/* {console.log(formData)} */}
                {!logDet &&
               <> {console.log("wtf")}
                    <Form className="border mx-2 mb-4">
                        <Row className="mb-2 mx-2">
                            <Form.Group as={Col} controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="First Name" placeholder="First Name" defaultValue={loggerName} onChange={handleFName}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="Last Name" placeholder="Last Name" defaultValue={loggerLastName} onChange={handleLName}/>
                            </Form.Group>
                        </Row>    
                        <Row className="mb-2 mx-2">
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={loggerEmail} />
                            </Form.Group>
                        
                            <Form.Group as={Col} controlId="phoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="phone number" placeholder="Phone Number" onChange={handlePNum}/>
                            </Form.Group>
                        </Row>    
                        <Button variant="outline-success" onClick={handleSubmit}>
                            Confirm
                        </Button>
                    </Form></>
                }
                {[...Array(parseInt(passNum - formData.length -1 ))].map((x, i) =>
                    <Form className="border mx-2 mb-4" key={i + formData.length}>
                    <Row className="mb-2 mx-2">
                        <Form.Group as={Col} controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="First Name" placeholder="First Name" onChange={handleFName} />
                        </Form.Group>
    
                        <Form.Group as={Col} controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="Last Name" placeholder="Last Name" onChange={handleLName}/>
                        </Form.Group>
                    </Row>    
                    <Row className="mb-2 mx-2">
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={handleEmail}/>
                        </Form.Group>
                    
                        <Form.Group as={Col} controlId="phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="phone number" placeholder="Phone Number" onChange={handlePNum}/>
                        </Form.Group>
                    </Row>  
                    <Button variant="outline-success" onClick={handleSubmit}>
                        Confirm
                    </Button >
                    </Form>
                    )}
                </>
            ]
        } else {
            // console.log('im here' + passNum)
            return[
                <>
                {[...Array(parseInt(passNum - formData.length))].map((x, i) =>
                    <Form className="border mx-2 mb-4" key={i + formData.length}>
                        <h3> Passenger {formData.length + i + 1}</h3>
                    <Row className="mb-2 mx-2">
                        <Form.Group as={Col} controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="First Name" placeholder="First Name" onChange={handleFName} />
                        </Form.Group>
    
                        <Form.Group as={Col} controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="Last Name" placeholder="Last Name" onChange={handleLName}/>
                        </Form.Group>
                    </Row>    
                    <Row className="mb-2 mx-2">
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={handleEmail}/>
                        </Form.Group>
                    
                        <Form.Group as={Col} controlId="phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="phone number" placeholder="Phone Number" onChange={handlePNum}/>
                        </Form.Group>
                    </Row>  
                    <Button variant="outline-success" onClick={handleSubmit}>
                        Confirm
                    </Button >
                    </Form>
                    )}
                </>
            ]
        } 
    }
   
    return(
         <div className="container-fluid text-center">
            <br/>{instance} <br />
            <h1>Passenger Details</h1>
            {formData.map((data, i) =>{
                return[
                    <div className="border mx-2 mb-4" key={i}>
                        <h3> Passenger {i + 1}</h3>
                        <Row className="mb-2 mx-2">
                            <Col>
                                First Name: {data.fName}
                            </Col>
                            <Col>
                                Last Name: {data.lName}
                            </Col>
                        </Row>    
                        <Row className="mb-2 mx-2">
                            <Col>
                                Email: {data.email}
                            </Col>
                            <Col>
                                Phone Number: {data.pNum}
                            </Col>
                        </Row> 
                        <Button variant="outline-danger" onClick={event => handleRemove(data)}>
                            Remove
                        </Button>  
                    </div>
                ]
            })
            }
            {renderContent()} 
            <Button variant="primary"  onClick={event => window.location.href='/PaymentPage'} disabled={(formData.length < passNum? true:false)} >
                 Next
            </Button>
        </div>
    )   
}

export default BookingPage;