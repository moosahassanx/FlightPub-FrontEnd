import React,{useState, useEffect} from 'react'
import ReactDOM from "react-dom";
import '../Css/RegisterForm.css';


class PamentBookingForm extends React.Component
  {
        constructor(props) {
        super(props);
        this.state = {firstName: '', lastName: '',cardNumber: '', VCC: '', expiryDate: '', isAproved: '',};
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
        let cardNumberErro = "";
        let VCCError = "";
        let expiryDateError = "";
        let isApprovedError = "";

        if (!this.state.firstName) {
          firstNameError = "first name cannot be blank";
        }
        if (!this.state.lastName) {
          lastNameError = "last name cannot be blank";
        }
        if (!this.state.cardNumber) {
            cardNumberErro = "Card number cannot be blank";
        }
        if (!this.state.VCC) {
            VCCError = "securty code cant be blank";
        }
        if (!this.state.expiryDate) {
            expiryDateError = "expiry date cant be blank";
        }
        if (!this.state.isApprovedError) {
            isApprovedError = "payment Declinde";
        }
        if (cardNumberErro ||VCCError || firstNameError || lastNameError || expiryDateError || isApprovedError) {
          this.setState({ cardNumberErro, VCCError, lastNameError, firstNameError, expiryDateError, isApprovedError});
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
          alert("Error: Payment Form not valid");
        }
      }

      async submitForm() {
        var details = {
          'firstName': this.state.firstName,
          'lastName': this.state.lastName,
          'cardNumber': this.state.cardNumber,
          'VCC': this.state.VCC,
          'expirDdate': this.state.expirDdate,
          'isApproved': this.state.isApproved,        
        };
      
        var formBody = [];
        for (var property in details) {
          var key = encodeURIComponent(property);
          var value = encodeURIComponent(details[property]);
          formBody.push(key + "=" + value);
        }
        formBody = formBody.join("&");
        fetch('http://localhost:8080/makePayment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },body: formBody


        }) 
        .then(response => {
          if (!response.ok) {
            alert("Error: While makingPayment the Flight");
          } else {
            this.setState({successMessage: "payment complete!."});
          }
        })
      }
    
      render(){ 
        return (
          <div>
                  <form>
                              <div class="paymentButtonArea">  <input type="submit" className="button"  value="Close Form" /></div> 
                  </form>
          </div>
          );
      }
  }


  export default PamentBookingForm