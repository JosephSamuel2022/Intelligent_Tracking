import React, { useState } from "react";
import "./PlanRideForm.css";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase-config";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const PlanRideForm = () => {
	const navigate = useNavigate();
	const [nation, changeNation] = useState("India");
	const [locationNameFrom, setFromLocation] = useState(null);
	const [locationNameTo, setToLocation] = useState(null);

	const [lNameFrom, setFromLocations] = useState(null);
	const [lNameTo, setToLocations] = useState(null);

	const [locationDataFrom, setLocationDataFrom] = useState(null);
	const [locationDataTo, setLocationDataTo] = useState(null);

	const [locationDataIntermediate, setLocationDataIntermediate] =
		useState(null);
	const [locationDataIntermediate2, setLocationDataIntermediate2] =
		useState(null);
	const [locationDataIntermediate3, setLocationDataIntermediate3] =
		useState(null);
	const [locationDataIntermediate4, setLocationDataIntermediate4] =
		useState(null);
	const [locationDataIntermediate5, setLocationDataIntermediate5] =
		useState(null);

	const [locationDataB1, setLocationDataB1] = useState(null);
	const [locationDataB2, setLocationDataB2] = useState(null);

	const [showIntermediateStop, setShowIntermediateStop] = useState(false);
	const [showBlockages, setShowBlockages] = useState(false);

	const [intermediateStop, setIntermediateStop] = useState(null);
	const [intermediateStop2, setIntermediateStop2] = useState(null);
	const [intermediateStop3, setIntermediateStop3] = useState(null);
	const [intermediateStop4, setIntermediateStop4] = useState(null);
	const [intermediateStop5, setIntermediateStop5] = useState(null);

	const [blockage1, setBlockage1] = useState(null);
	const [blockage2, setBlockage2] = useState(null);

	const [blockageSelected, setBlockageSelected] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			if (locationDataFrom && locationDataTo) {
				const startCoords = `${locationDataFrom.latitude},${locationDataFrom.longitude}`; // Replace with the actual key for coordinates in locationData
				console.log(startCoords);
				const endCoords = `${locationDataTo.latitude}, ${locationDataTo.longitude}`; // Replace with the actual key for coordinates in locationData

				let url = "";

				if (!intermediateStop && !blockage1 && !blockage2) {
					url = "http://localhost:5000/shortest_path";
				} else if (intermediateStop && !blockage1 && !blockage2) {
					url = "http://localhost:5000/priority";
				} else if (!intermediateStop && blockage1 && blockage2) {
					url = "http://localhost:5000/blockage";
				} else if (intermediateStop && blockage1 && blockage2) {
					url = "http://localhost:5000/blockagenpriority";
				}
				if (!intermediateStop && !blockage1 && !blockage2) {
					try {
						const response = await axios.get(url, {
							params: {
								start_coords: startCoords,
								end_coords: endCoords,
								nation: nation,
							},
						});

						const shortestPathCoordinates = response.data; // Assuming the Flask response contains the coordinates

						const locationState = {
							from: locationDataFrom,
							to: locationDataTo,
							shortestPath: shortestPathCoordinates, // Add the shortest path array to the state
						};
						navigate("/map", { state: locationState });
					} catch (error) {
						console.error("Error fetching shortest path:", error);
						// Handle the error as needed
					}
				} else if (intermediateStop && !blockage1 && !blockage2) {
					if (
						locationDataIntermediate &&
						locationDataIntermediate2 &&
						locationDataIntermediate3 &&
						locationDataIntermediate4 &&
						locationDataIntermediate5
					) {
						console.log(locationDataIntermediate);
						const iCoords = `${locationDataIntermediate.latitude}, ${locationDataIntermediate.longitude}`;
						const i2Coords = `${locationDataIntermediate2.latitude}, ${locationDataIntermediate2.longitude}`;
						const i3Coords = `${locationDataIntermediate3.latitude}, ${locationDataIntermediate3.longitude}`;
						const i4Coords = `${locationDataIntermediate4.latitude}, ${locationDataIntermediate4.longitude}`;
						const i5Coords = `${locationDataIntermediate5.latitude}, ${locationDataIntermediate5.longitude}`;
						try {
							const response = await axios.get(url, {
								params: {
									start_coords: startCoords,
									end_coords: endCoords,
									intermediate_coords: iCoords,
									intermediate2_coords: i2Coords,
									intermediate3_coords: i3Coords,
									intermediate4_coords: i4Coords,
									intermediate5_coords: i5Coords,
								},
							});

							const shortestPathCoordinates = response.data; // Assuming the Flask response contains the coordinates

							const locationState = {
								from: locationDataFrom,
								to: locationDataTo,
								shortestPath: shortestPathCoordinates, // Add the shortest path array to the state
							};
							navigate("/map", { state: locationState });
						} catch (error) {
							console.error("Error fetching shortest path:", error);
							// Handle the error as needed
						}
					}
				} else if (!intermediateStop && blockage1 && blockage2) {
					if (locationDataB1 && locationDataB2) {
						const b1Coords = `${locationDataB1.latitude}, ${locationDataB1.longitude}`;
						const b2Coords = `${locationDataB2.latitude}, ${locationDataB2.longitude}`;
						try {
							const response = await axios.get(url, {
								params: {
									start_coords: startCoords,
									end_coords: endCoords,
									blockage1_coords: b1Coords,
									blockage2_coords: b2Coords,
								},
							});

							const shortestPathCoordinates = response.data; // Assuming the Flask response contains the coordinates

							const locationState = {
								from: locationDataFrom,
								to: locationDataTo,
								shortestPath: shortestPathCoordinates, // Add the shortest path array to the state
							};
							navigate("/map", { state: locationState });
						} catch (error) {
							console.error("Error fetching shortest path:", error);
							// Handle the error as needed
						}
					}
				} else {
					if (
						locationDataIntermediate &&
						locationDataIntermediate2 &&
						locationDataIntermediate3 &&
						locationDataIntermediate4 &&
						locationDataIntermediate5 &&
						locationDataB1 &&
						locationDataB2
					) {
						const iCoords = `${locationDataIntermediate.latitude}, ${locationDataIntermediate.longitude}`;
						const i2Coords = `${locationDataIntermediate2.latitude}, ${locationDataIntermediate2.longitude}`;
						const i3Coords = `${locationDataIntermediate3.latitude}, ${locationDataIntermediate3.longitude}`;
						const i4Coords = `${locationDataIntermediate4.latitude}, ${locationDataIntermediate4.longitude}`;
						const i5Coords = `${locationDataIntermediate5.latitude}, ${locationDataIntermediate5.longitude}`;

						const b1Coords = `${locationDataB1.latitude}, ${locationDataB1.longitude}`;
						const b2Coords = `${locationDataB2.latitude}, ${locationDataB2.longitude}`;
						try {
							const response = await axios.get(url, {
								params: {
									start_coords: startCoords,
									end_coords: endCoords,
									intermediate_coords: iCoords,
									intermediate2_coords: i2Coords,
									intermediate3_coords: i3Coords,
									intermediate4_coords: i4Coords,
									intermediate5_coords: i5Coords,
									blockage1_coords: b1Coords,
									blockage2_coords: b2Coords,
								},
							});

							const shortestPathCoordinates = response.data; // Assuming the Flask response contains the coordinates

							const locationState = {
								from: locationDataFrom,
								to: locationDataTo,
								shortestPath: shortestPathCoordinates, // Add the shortest path array to the state
							};
							navigate("/map", { state: locationState });
						} catch (error) {
							console.error("Error fetching shortest path:", error);
							// Handle the error as needed
						}
					}
				}
			}
		};

		fetchData();
	}, [
		locationDataFrom,
		locationDataTo,
		locationDataIntermediate,
		locationDataIntermediate2,
		locationDataIntermediate3,
		locationDataIntermediate4,
		locationDataIntermediate5,
		locationDataB1,
		locationDataB2,
	]);

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

	const handleLocationSearchIntermediate = async () => {
		if (intermediateStop) {
			const intermediateStops = intermediateStop.value;
			if (intermediateStops.trim() === "") {
				return; // Handle empty input or validation as needed.
			}

			try {
				const db = getDatabase();
				const locationsRef = ref(db, "locations/" + intermediateStops);

				const snapshot = await get(locationsRef);
				if (snapshot.exists()) {
					// Update the locationDataIntermediate state here before continuing
					setLocationDataIntermediate((prevData) => snapshot.val());
					// Continue with other actions or set flags to proceed with the API call
				} else {
					setLocationDataIntermediate(null);
					// Handle case where location was not found in the database.
				}
			} catch (error) {
				console.error("Error querying the database:", error);
				// Handle the error as needed.
			}
		}
	};

	const handleLocationSearchIntermediate2 = async () => {
		if (intermediateStop2) {
			const intermediateStops = intermediateStop2.value;
			if (intermediateStops.trim() === "") {
				return; // Handle empty input or validation as needed.
			}

			try {
				const db = getDatabase();
				const locationsRef = ref(db, "locations/" + intermediateStops);

				const snapshot = await get(locationsRef);
				if (snapshot.exists()) {
					// Update the locationDataIntermediate state here before continuing
					setLocationDataIntermediate2((prevData) => snapshot.val());
					// Continue with other actions or set flags to proceed with the API call
				} else {
					setLocationDataIntermediate2(null);
					// Handle case where location was not found in the database.
				}
			} catch (error) {
				console.error("Error querying the database:", error);
				// Handle the error as needed.
			}
		}
	};

	const handleLocationSearchIntermediate3 = async () => {
		if (intermediateStop3) {
			const intermediateStops = intermediateStop3.value;
			if (intermediateStops.trim() === "") {
				return; // Handle empty input or validation as needed.
			}

			try {
				const db = getDatabase();
				const locationsRef = ref(db, "locations/" + intermediateStops);

				const snapshot = await get(locationsRef);
				if (snapshot.exists()) {
					// Update the locationDataIntermediate state here before continuing
					setLocationDataIntermediate3((prevData) => snapshot.val());
					// Continue with other actions or set flags to proceed with the API call
				} else {
					setLocationDataIntermediate3(null);
					// Handle case where location was not found in the database.
				}
			} catch (error) {
				console.error("Error querying the database:", error);
				// Handle the error as needed.
			}
		}
	};

	const handleLocationSearchIntermediate4 = async () => {
		if (intermediateStop4) {
			const intermediateStops = intermediateStop4.value;
			if (intermediateStops.trim() === "") {
				return; // Handle empty input or validation as needed.
			}

			try {
				const db = getDatabase();
				const locationsRef = ref(db, "locations/" + intermediateStops);

				const snapshot = await get(locationsRef);
				if (snapshot.exists()) {
					// Update the locationDataIntermediate state here before continuing
					setLocationDataIntermediate4((prevData) => snapshot.val());
					// Continue with other actions or set flags to proceed with the API call
				} else {
					setLocationDataIntermediate4(null);
					// Handle case where location was not found in the database.
				}
			} catch (error) {
				console.error("Error querying the database:", error);
				// Handle the error as needed.
			}
		}
	};

	const handleLocationSearchIntermediate5 = async () => {
		if (intermediateStop5) {
			const intermediateStops = intermediateStop5.value;
			if (intermediateStops.trim() === "") {
				return; // Handle empty input or validation as needed.
			}

			try {
				const db = getDatabase();
				const locationsRef = ref(db, "locations/" + intermediateStops);

				const snapshot = await get(locationsRef);
				if (snapshot.exists()) {
					// Update the locationDataIntermediate state here before continuing
					setLocationDataIntermediate5((prevData) => snapshot.val());
					// Continue with other actions or set flags to proceed with the API call
				} else {
					setLocationDataIntermediate5(null);
					// Handle case where location was not found in the database.
				}
			} catch (error) {
				console.error("Error querying the database:", error);
				// Handle the error as needed.
			}
		}
	};

	const handleLocationSearchB1 = async () => {
		if (blockage1) {
			const blockage1s = blockage1.value;

			if (blockage1s.trim() === "") {
				return; // Handle empty input or validation as needed.
			}

			try {
				const db = getDatabase();
				const locationsRef = ref(db, "locations/" + blockage1s);

				const snapshot = await get(locationsRef);
				if (snapshot.exists()) {
					setLocationDataB1((prevData) => snapshot.val());
				} else {
					setLocationDataB1(null);
					// Handle case where location was not found in the database.
				}
			} catch (error) {
				console.error("Error querying the database:", error);
				// Handle the error as needed.
			}
		}
	};

	const handleLocationSearchB2 = async () => {
		if (blockage2) {
			const blockage2s = blockage2.value;
			if (blockage2s.trim() === "") {
				return; // Handle empty input or validation as needed.
			}

			try {
				const db = getDatabase();
				const locationsRef = ref(db, "locations/" + blockage2s);

				const snapshot = await get(locationsRef);
				if (snapshot.exists()) {
					setLocationDataB2((prevData) => snapshot.val());
				} else {
					setLocationDataB2(null);
					// Handle case where location was not found in the database.
				}
			} catch (error) {
				console.error("Error querying the database:", error);
				// Handle the error as needed.
			}
		}
	};

	const handleBookClick = async () => {
		await handleLocationSearchFrom();
		await handleLocationSearchTo();
		await handleLocationSearchIntermediate();
		await handleLocationSearchB1();
		await handleLocationSearchB2();
		await handleLocationSearchIntermediate2();
		await handleLocationSearchIntermediate3();
		await handleLocationSearchIntermediate4();
		await handleLocationSearchIntermediate5();

		const chinaLocations = options.slice(40); // Locations from index 40 (41st element) onwards are in China

		if (chinaLocations.some((option) => option.value === locationNameFrom)) {
			changeNation("China"); // Update nation state to China
		} else {
			changeNation("India"); // Set back to India if it's not in China
		}
		console.log(locationDataFrom);
		console.log(locationDataTo);
	};

	const handleIntermediateStopChange = (selectedOption, setter) => {
		setter(selectedOption);
	};

	const handleDeleteIntermediateStop = () => {
		setIntermediateStop(null); // Reset intermediate stop value to null
		setIntermediateStop2(null);
		setIntermediateStop3(null);
		setIntermediateStop4(null);
		setIntermediateStop5(null);
		setShowIntermediateStop(false);
		// Hide intermediate stop section
	};

	const handleDeleteBlockages = () => {
		setBlockage1(null); // Reset blockage 1 value to null
		setBlockage2(null); // Reset blockage 2 value to null
		setShowBlockages(false); // Hide blockages section
	};

	const handleBlockageChange = (selectedOption, setter) => {
		setter(selectedOption);

		// Check if only one blockage is selected
	};

	useEffect(() => {
		// Check if only one blockage is selected
		const isOneBlockageSelected =
			(blockage1 && !blockage2) || (!blockage1 && blockage2);

		// Check if from and to locations are selected
		const areLocationsSelected = locationNameFrom && locationNameTo;

		// Update blockageSelected state based on the conditions
		setBlockageSelected(areLocationsSelected && !isOneBlockageSelected);
	}, [blockage1, blockage2, locationNameFrom, locationNameTo]);

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
	const filterOptions = () => {
		const selectedValues = [
			locationNameFrom,
			locationNameTo,
			intermediateStop?.value,
			intermediateStop2?.value,
			intermediateStop3?.value,
			intermediateStop4?.value,
			intermediateStop5?.value,
			blockage1?.value,
			blockage2?.value,
		];

		const filteredOptions = options.filter(
			(option) => !selectedValues.includes(option.value)
		);

		return filteredOptions;
	};

	const filteredOptions = filterOptions();

	return (
		<div>
			<h1 className='heading'>Plan your ride</h1>
			<div className='plan-ride'>
				<div className='ride-details'>
					<div className='from-input'>
						<div className='circle'></div>
						<Select
							className='custom-select'
							options={filteredOptions}
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
							options={filteredOptions}
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
				<div className='ride-details-n'>
					{showIntermediateStop && (
						<>
							<button onClick={handleDeleteIntermediateStop}>
								Delete Intermediate Stop
							</button>

							<div className='to-input'>
								<div className='circle-i'></div>
								<Select
									className='custom-select'
									options={filteredOptions}
									placeholder='Select Intermediate Stop 1'
									spellCheck='false'
									defaultValue={intermediateStop}
									onChange={(selectedOption) =>
										handleIntermediateStopChange(
											selectedOption,
											setIntermediateStop
										)
									}
								/>
							</div>
							<div className='to-input'>
								<div className='circle-i'></div>
								<Select
									className='custom-select'
									options={filteredOptions}
									placeholder='Select Intermediate Stop 2'
									spellCheck='false'
									defaultValue={intermediateStop2}
									onChange={(selectedOption) =>
										handleIntermediateStopChange(
											selectedOption,
											setIntermediateStop2
										)
									}
								/>
							</div>
							<div className='to-input'>
								<div className='circle-i'></div>
								<Select
									className='custom-select'
									options={filteredOptions}
									placeholder='Select Intermediate Stop 3'
									spellCheck='false'
									defaultValue={intermediateStop3}
									onChange={(selectedOption) =>
										handleIntermediateStopChange(
											selectedOption,
											setIntermediateStop3
										)
									}
								/>
							</div>
							<div className='to-input'>
								<div className='circle-i'></div>
								<Select
									className='custom-select'
									options={filteredOptions}
									placeholder='Select Intermediate Stop 4'
									spellCheck='false'
									defaultValue={intermediateStop4}
									onChange={(selectedOption) =>
										handleIntermediateStopChange(
											selectedOption,
											setIntermediateStop4
										)
									}
								/>
							</div>
							<div className='to-input'>
								<div className='circle-i'></div>
								<Select
									className='custom-select'
									options={filteredOptions}
									placeholder='Select Intermediate Stop 5'
									spellCheck='false'
									defaultValue={intermediateStop5}
									onChange={(selectedOption) =>
										handleIntermediateStopChange(
											selectedOption,
											setIntermediateStop5
										)
									}
								/>
							</div>
						</>
					)}
					{!showIntermediateStop && (
						<button
							onClick={() => setShowIntermediateStop(!showIntermediateStop)}>
							Add Intermediate Stop
						</button>
					)}
				</div>
				<div className='ride-details-m'>
					{showBlockages && (
						<>
							<button onClick={handleDeleteBlockages}>Delete Blockages</button>
							<div className='to-input'>
								<div className='circle-b'></div>
								<Select
									className='custom-select'
									options={filteredOptions}
									placeholder='Select Blockage 1'
									spellCheck='false'
									defaultValue={blockage1}
									onChange={(selectedOption) =>
										handleBlockageChange(selectedOption, setBlockage1)
									}
								/>
							</div>
							<div className='to-input'>
								<div className='circle-b'></div>
								<Select
									className='custom-select'
									options={filteredOptions}
									placeholder='Select Blockage 2'
									spellCheck='false'
									defaultValue={blockage2}
									onChange={(selectedOption) =>
										handleBlockageChange(selectedOption, setBlockage2)
									}
								/>
							</div>
						</>
					)}
					{!showBlockages && (
						<button onClick={() => setShowBlockages(!showBlockages)}>
							Add Blockages
						</button>
					)}
				</div>
			</div>
			<button
				className={`book-button ${blockageSelected ? "" : "disabled"}`}
				onClick={handleBookClick}
				disabled={!blockageSelected}>
				Book
			</button>
		</div>
	);
};

export default PlanRideForm;
