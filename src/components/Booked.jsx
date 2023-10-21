import React from "react";
import "./Booked.css";
import { useNavigate } from "react-router-dom";
const Booked = () => {
	const navigate = useNavigate();
	const handleProfile = () => {
		navigate("/profile");
	};
	const carImage = "../images/Toyoto_Camry.png";
	const driverName = "John Doe";
	const carNumber = "TN 63 DB 5481";

	return (
		<div className='booked-container' onClick={handleProfile}>
			<h2 className='driver-name'>{driverName}</h2>
			<div className='car-image'>
				<img src={carImage} alt={driverName} />
			</div>
			<p className='car-number'>{carNumber}</p>
		</div>
	);
};

export default Booked;
