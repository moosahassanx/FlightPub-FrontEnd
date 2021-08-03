import React,{useState, useEffect} from 'react'
import ReactDOM from "react-dom";
import '../Css/RegisterForm.css';


class FlightBookingForm extends React.Component
  {
        constructor(props) {
        super(props);
        this.state = {firstName: '', lastName: '',phoneNumber: '', email: '',};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      
      //sets inputs to varibles 
      handleChange(e)
       {
        this.setState({ [e.target.name] : e.target.value });
      };;

      // validates all iputs and retuens fales if any input is plank alsong with alrt message
      validates = () => 
      {
        let firstNameError = "";
        let lastNameError = "";
        let emailError = "";
        let phoneError = "";

        if (!this.state.firstName) {
          firstNameError = "first name cannot be blank";
        }
        if (!this.state.lastName) {
          lastNameError = "last name cannot be blank";
        }
        if (!this.state.phoneNumber) {
          phoneError = "phone number cannot be blank";
        }
        if (!this.state.email.includes("@")) {
          emailError = "invalid email";
        }
        if (phoneError ||emailError || firstNameError || lastNameError) {
          this.setState({ phoneError, emailError, lastNameError, firstNameError});
          return false;
        }
        return true;
      };
    
      handleSubmit(event){
        if (this.state.succesMessage) {
          this.setState({successMessage: null});
        }
        
        event.preventDefault();
        const isValid = this.validates();
        if (isValid) {
          this.submitForm();
        } else {
          alert("Error: Flight Booking Form not valid");
        }
      }

      async submitForm() {
        var details = {
          'firstName': this.state.firstName,
          'lastName': this.state.lastName,
          'phoneNumber': this.state.phoneNumber,
          'email': this.state.email,          
        };
      
        var formBody = [];
        for (var property in details) {
          var key = encodeURIComponent(property);
          var value = encodeURIComponent(details[property]);
          formBody.push(key + "=" + value);
        }
        formBody = formBody.join("&");
        fetch('http://localhost:8080/makeBooking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },body: formBody


        }) //chescks if the account exsits
        .then(response => {
          if (!response.ok) {
            alert("Error: While booking the Flight");
          } else {
            this.setState({successMessage: "booking complete!."});
          }
        })
      }
    
      render(){ 
        return (
          <div className="Centering">
                  <form>
                              <div class="registerButtonArea">  <input type="submit" className="button"  value="Close Form" /></div> 
                  </form>
          </div>
          );
      }
  }


  export default FlightBookingForm