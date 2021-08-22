import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar, Footer, CardCarousel } from "./Components/index";
import {
	Home,
	Features,
	Register,
	Business,
	AccountManagement,
	Discovery,
	Groups,
	BookingPage,
	TicketSelectionPage,
	PaymentPage,
	ConfirmPage,
	HolidayPackages,
	WishlistPage,
} from "./Pages/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/app.css";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import AdminControl from "./Pages/AdminControl";
import ApplyForPosition from "./Pages/ApplyForPosition";

// Implementing React Router for the use of SPA and conditionally rendering pages
const Routing = () => {
	return (
		<div className='page-container'>
			<div className='content-wrapper'>
				<Router>
					<NavBar />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/features' component={Features} />
						<Route exact path='/Groups' component={Groups} />
						<Route
							exact
							path='/accountManagement'
							component={AccountManagement}
						/>
						<Route exact path='/Discovery' component={Discovery} />
						<Route exact path='/HolidayPackages' component={HolidayPackages} />
						<Route exact path='/Booking' component={BookingPage} />
						<Route
							exact
							path='/TicketSelectionPage'
							component={TicketSelectionPage}
						/>
						<Route exact path='/PaymentPage' component={PaymentPage} />
						<Route exact path='/ConfirmPage' component={ConfirmPage} />
						<Route exact path='/adminControl' component={AdminControl} />
						<Route
							exact
							path='/applyForPosition'
							component={ApplyForPosition}
						/>
						<Route exact path='/WishlistPage' component={WishlistPage} />
					</Switch>
				</Router>
			</div>
			{/* <CardCarousel/> */}
			<Footer />
		</div>
	);
};
function App() {
	return <Routing />;
}

export default App;
