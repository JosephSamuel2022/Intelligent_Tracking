import React from "react";
import "./DriverProfile.css";
import "font-awesome/css/font-awesome.min.css";

const DriverProfile = () => {
	const photo = "../images/man.jpg";
	const name = "John Doe";
	const vehicleName = "Toyota Camry";
	const numberOfTrips = 500;
	const rating = 4.7;
	const yearsWith = 3;

	return (
		<div className='driver-profile'>
			<div className='profile-photo'>
				<img src={photo} alt={name} />
			</div>
			<div className='driver-info'>
				<h2>{name}</h2>
				<p>{vehicleName}</p>
			</div>
			<div className='call-button'>
				<button>📞 Call</button>
			</div>
			<div className='driver-stats'>
				<div>
					{numberOfTrips}
					<p>Trips</p>
				</div>
				<div>
					{rating}
					<span className='star'>★</span>
					<p>Rating</p>
				</div>
				<div>
					{yearsWith}
					<p>Years</p>
				</div>
			</div>
		</div>
	);
};

export default DriverProfile;
