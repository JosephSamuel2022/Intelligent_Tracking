import React from "react";
import PlanRideForm from "./components/PlanRideForm";
import MyMap from "./components/MyMap";
import Booked from "./components/Booked";
import DriverProfile from "./components/DriverProfile";
import { Routes, Route } from "react-router-dom";
import RoundedTextBoxWithCircle from "./components/RoundedTextBoxWithCircle";
import LocationLookup from "./components/LocationLookup";

function App() {
	return (
		<Routes>
			<Route path='/' element={<PlanRideForm />} />
			<Route path='/profile' element={<DriverProfile />} />
			<Route path='/map' element={<MyMap />} />
			<Route path='/test' element={<LocationLookup />} />
		</Routes>
	);
}

export default App;
