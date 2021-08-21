import React,{useState, useEffect} from 'react'
import ReactDOM from "react-dom";
import '../Css/RegisterForm.css';


class RegisterForm extends React.Component
  {
        constructor(props) {
        super(props);
        this.state = {firstName: '', lastName: '',phoneNumber: '', email: '', address: '', hPwd: '',};
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
        let passwordError = "";
        let emailError = "";
        let phoneError = "";
        let addressError = "";

        if (!this.state.firstName) {
          firstNameError = "first name cannot be blank";
        }
        if (!this.state.lastName) {
          lastNameError = "last name cannot be blank";
        }
        if (!this.state.hPwd) {
          passwordError = "password cannot be blank";
        }
        if (!this.state.phoneNumber) {
          phoneError = "phone number cannot be blank";
        }
        if (!this.state.address) {
          addressError = "address cannot be blank";
        }
        if (!this.state.email.includes("@")) {
          emailError = "invalid email";
        }
        if (phoneError ||emailError || firstNameError || lastNameError || passwordError || addressError) {
          this.setState({ phoneError, emailError, lastNameError, firstNameError, addressError, passwordError });
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
          alert("Error: Registration Form not valid");
        }
      }

      async submitForm() {
        var details = {
          'firstName': this.state.firstName,
          'lastName': this.state.lastName,
          'address': this.state.address,
          'phoneNumber': this.state.phoneNumber,
          'email': this.state.email,          
          'hPwd': this.state.hPwd,
        };
      
        var formBody = [];
        for (var property in details) {
          var key = encodeURIComponent(property);
          var value = encodeURIComponent(details[property]);
          formBody.push(key + "=" + value);
        }
        formBody = formBody.join("&");
        fetch('/registerUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },body: formBody


        }) //chescks if the account exsits
        .then(response => {
          if (!response.ok) {
            alert("Error: this account already exists");
          } else {
            this.setState({successMessage: "Registration complete!."});
          }
        })
      }
    
      render(){ 
        return (
          <div className="Centering">
                  <form>
                      <div id="registerForm">
                          <div className="register-box">
                              <div className="headerBox">Registration Form</div>
                              <label>
                                <div>
                                   {/* taking the clintes details*/}
                                  <div> <input type="text" value={this.state.firstName} placeholder = 'First Name' name='firstName' value={this.state.firstName} onChange={this.handleChange.bind(this)} /><br /></div> 
                                 {/* show error massages if these sections are empty */}
                                  <div style={{ fontSize: 10, color: "red" }}>
                                              {this.state.firstNameError}
                                  </div>
                                  <div>  <input type="text" value={this.state.lastName} placeholder = 'Last Name' name='lastName' value={this.state.lastName} onChange={this.handleChange.bind(this)} /><br /></div> 
                                  <div style={{ fontSize: 10, color: "red" }}>
                                              {this.state.lastNameError}
                                  </div>
                                  <div>  <input type="text" value={this.state.phoneNumber} placeholder = 'Phone Number' name='phoneNumber' value={this.state.phoneNumber} onChange={this.handleChange.bind(this)} /><br /></div> 
                                  <div style={{ fontSize: 10, color: "red" }}>
                                              {this.state.phoneError}
                                  </div>
                                </div>
                                
                                <div>  <input type="text" value={this.state.address} placeholder = 'Address' name='address' value={this.state.address} onChange={this.handleChange.bind(this)} /><br /></div> 
                                <div style={{ fontSize: 10, color: "red" }}>
                                            {this.state.addressError}
                                </div>
                                <div> <input type="text" value={this.state.email} placeholder = 'Email' name='email' value={this.state.email} onChange={this.handleChange.bind(this)} /><br /></div> 
                                <div style={{ fontSize: 10, color: "red" }}>
                                            {this.state.emailError}
                                </div>
                                <div> <input type="password" value={this.state.hPwd} placeholder="Password"  name='hPwd' value={this.state.hPwd} onChange={this.handleChange.bind(this)} /><br /></div> 
                                <div style={{ fontSize: 10, color: "red" }}>
                                            {this.state.passwordError}
                                </div>
                              </label><br />
                              <div class="registerButtonArea">  <input type="submit" className="button"  value="Create Account" onClick={this.handleSubmit}/></div> 
                              {/* show success massages if all details are valid and form submited */}
                              <div style={{ fontSize: 25, color: "green" }}>
                                            {this.state.successMessage}
                              </div>
                              <div class="registerButtonArea">  <input type="submit" className="button"  value="Close Form" /></div> 
                          </div> 
                      </div>
                  </form>
          </div>
          );
      }
  }


  export default RegisterForm