import React, { useState } from "react";
import "./PlanRideForm.css";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase-config";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect } from "react";

const PlanRideForm = () => {
	const navigate = useNavigate();
	const [locationNameFrom, setFromLocation] = useState("chrompet");
	const [locationNameTo, setToLocation] = useState("t nagar");

	const [locationDataFrom, setLocationDataFrom] = useState(null);
	const [locationDataTo, setLocationDataTo] = useState(null);

	useEffect(() => {
		if (locationDataFrom !== null && locationDataTo !== null) {
			const locationState = { from: locationDataFrom, to: locationDataTo };
			navigate("/map", { state: locationState });
		}
	}, [locationDataFrom, locationDataTo]);

	const handleLocationSearchFrom = async () => {
		if (locationNameFrom.trim() === "") {
			return; // Handle empty input or validation as needed.
		}

		try {
			const db = getDatabase();
			const locationsRef = ref(db, "locations/" + locationNameFrom);

			const snapshot = await get(locationsRef);
			if (snapshot.exists()) {
				setLocationDataFrom((prevData) => snapshot.val());
			} else {
				setLocationDataFrom(null);
				// Handle case where location was not found in the database.
			}
		} catch (error) {
			console.error("Error querying the database:", error);
			// Handle the error as needed.
		}
	};

	const handleLocationSearchTo = async () => {
		if (locationNameTo.trim() === "") {
			return; // Handle empty input or validation as needed.
		}

		try {
			const db = getDatabase();
			const locationsRef = ref(db, "locations/" + locationNameTo);

			const snapshot = await get(locationsRef);
			if (snapshot.exists()) {
				setLocationDataTo((prevData) => snapshot.val());
			} else {
				setLocationDataTo(null);
				// Handle case where location was not found in the database.
			}
		} catch (error) {
			console.error("Error querying the database:", error);
			// Handle the error as needed.
		}
	};

	const handleBookClick = async () => {
		await handleLocationSearchFrom();
		await handleLocationSearchTo();
		console.log(locationDataFrom);
		console.log(locationDataTo);
	};

	return (
		<div>
			<h1 className='heading'>Plan your ride</h1>
			<div className='plan-ride'>
				<div className='ride-details'>
					<div className='from-input'>
						<div className='circle'></div>
						<input
							type='text'
							placeholder='From Location'
							spellCheck='false'
							value={locationNameFrom}
							onChange={(e) => setFromLocation(e.target.value)}
						/>
					</div>
				</div>
				<div className='ride-details'>
					<div className='to-input'>
						<div className='square'></div>
						<input
							type='text'
							placeholder='To Location'
							spellCheck='false'
							value={locationNameTo}
							onChange={(e) => setToLocation(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<button className='book-button' onClick={handleBookClick}>
				Book
			</button>
		</div>
	);
};

export default PlanRideForm;
