import React, { useState } from "react";
import "./PlanRideForm.css";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase-config";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect } from "react";
import Select from "react-select";

const PlanRideForm = () => {
	const navigate = useNavigate();
	const [locationNameFrom, setFromLocation] = useState(null);
	const [locationNameTo, setToLocation] = useState(null);

	const [lNameFrom, setFromLocations] = useState(null);
	const [lNameTo, setToLocations] = useState(null);

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

	const options = [
		{
			value: "chennai international airport (maa)",
			label: "Chennai International Airport (MAA)",
		},
		{
			value: "chennai central railway station",
			label: "Chennai Central Railway Station",
		},
		{ value: "egmore railway station", label: "Egmore Railway Station" },
		{ value: "marina beach", label: "Marina Beach" },
		{ value: "besant nagar beach", label: "Besant Nagar Beach" },
		{ value: "kapaleeshwarar temple", label: "Kapaleeshwarar Temple" },
		{ value: "vadapalani murugan temple", label: "Vadapalani Murugan Temple" },
		{ value: "ashtalakshmi temple", label: "Ashtalakshmi Temple" },
		{
			value: "parthasarathy temple, triplicane",
			label: "Parthasarathy Temple, Triplicane",
		},
		{ value: "government museum, egmore", label: "Government Museum, Egmore" },
		{ value: "valluvar kottam", label: "Valluvar Kottam" },
		{ value: "guindy national park", label: "Guindy National Park" },
		{ value: "semmozhi poonga", label: "Semmozhi Poonga" },
		{ value: "santhome basilica", label: "Santhome Basilica" },
		{ value: "koyambedu bus terminus", label: "Koyambedu Bus Terminus" },
		{ value: "express avenue mall", label: "Express Avenue Mall" },
		{ value: "phoenix marketcity", label: "Phoenix MarketCity" },
		{ value: "spencer plaza", label: "Spencer Plaza" },
		{ value: "t nagar", label: "T Nagar (Shopping District)" },
		{ value: "mylapore", label: "Mylapore" },
		{ value: "nanganallur", label: "Nanganallur" },
		{ value: "thiruvanmiyur", label: "Thiruvanmiyur" },
		{ value: "adyar", label: "Adyar" },
		{ value: "royapettah", label: "Royapettah" },
		{
			value: "t nagar ranganathan street",
			label: "T Nagar Ranganathan Street",
		},
		{ value: "pallikaranai marsh", label: "Pallikaranai Marsh" },
		{ value: "anna university", label: "Anna University" },
		{ value: "iit madras", label: "IIT Madras" },
		{ value: "madras high court", label: "Madras High Court" },
		{
			value: "theosophical society adyar",
			label: "Theosophical Society Adyar",
		},
		{ value: "royapuram fishing harbour", label: "Royapuram Fishing Harbour" },
		{ value: "st thomas mount", label: "St Thomas Mount" },
		{ value: "birla planetarium", label: "Birla Planetarium" },
		{ value: "chetpet ecopark", label: "Chetpet Ecopark" },
		{ value: "ripon building", label: "Ripon Building" },
		{ value: "chennai snake park", label: "Chennai Snake Park" },
		{ value: "brahmapuram reservoir", label: "Brahmapuram Reservoir" },
		{ value: "kishkinta theme park", label: "Kishkinta Theme Park" },
		{ value: "kovalam beach", label: "Kovalam Beach" },
		{
			value: "mahabalipuram (mamallapuram)",
			label: "Mahabalipuram (Mamallapuram)",
		},
	];
	const filteredOptionsFrom = options.filter(
		(option) => option.value !== locationNameTo
	);
	const filteredOptionsTo = options.filter(
		(option) => option.value !== locationNameFrom
	);

	return (
		<div>
			<h1 className='heading'>Plan your ride</h1>
			<div className='plan-ride'>
				<div className='ride-details'>
					<div className='from-input'>
						<div className='circle'></div>
						<Select
							className='custom-select'
							options={filteredOptionsFrom}
							placeholder='Select From Location'
							spellCheck='false'
							defaultValue={lNameFrom}
							onChange={(selectedOption) => {
								setFromLocations(selectedOption); // Update lNameTo
								setFromLocation(selectedOption.value); // Update locationNameTo
							}}
						/>
					</div>
				</div>
				<div className='ride-details'>
					<div className='to-input'>
						<div className='square'></div>
						<Select
							className='custom-select'
							options={filteredOptionsTo}
							placeholder='Select To Location'
							spellCheck='false'
							defaultValue={lNameTo}
							onChange={(selectedOption) => {
								setToLocations(selectedOption); // Update lNameTo
								setToLocation(selectedOption.value); // Update locationNameTo
							}}
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
