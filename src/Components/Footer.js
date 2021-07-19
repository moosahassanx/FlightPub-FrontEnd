import React, { useEffect, useState } from 'react';
import TravelBot from './TravelBot'
import '../Css/footer.css'

const Footer = () => {

    // Local state until extending to redux
    const [open, isOpen] = useState(false);
    const onClick = () => isOpen(!open);

    return(
        <div className="footer-main">
            <div className="container">
                <div className="row">
                    {/* Col 1 */}
                    <div className="col-md-4 col-md-offset-3">
                        <h3>Contact us</h3>
                        <ul className="list-unstyled">
                            <li>Email: enquires@flighpub.com</li>
                            <li>P: 2342 4234</li>
                            <li>M: 0402 324 543</li>
                        </ul>
                    </div>
                    {/* Col 2 */}
                    <div className="col-md-4">
                        <h2>Company</h2>
                        <ul className="list-unstyled">
                            <li>42 Wallaby way, Sydney </li>
                        </ul>

                    </div>
                    {/* Col 3 */}
                    <div className="col-md-3">
                        <h2>Find us</h2>
                        
                    </div>

                </div>
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} FlightPub | All rights reserved | <a href="/">TOC</a> | <a href="/">Privacy statement</a>
                    </p>
                </div>
            </div>
            <div className="float-right">
                            {open ? <TravelBot /> : null}
                            <button onClick={onClick}>TravelBot</button>
            </div>
        </div>

    )
}

export default Footer;
