import React from 'react';
import emailjs from 'emailjs-com';
//npm install emailjs-com   packge u need to install


const ConfirmPage = () => {

    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('service_2nhmpca', 'template_2rpfqmj', e.target, 'user_fmaqudfaRrfYGcKlP1RNh')
          .then((result) => {
              window.location.reload() 
          }, (error) => {
              console.log(error.text);
          });
      }
    

    return(
        <div className="Container">
            <div className="content">
                <p>This is ConfirmPage</p>
            </div>
        </div>
    )
}

export default ConfirmPage;