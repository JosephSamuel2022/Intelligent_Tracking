import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { database } from "../firebase-config";
function LocationLookup() {
	const [locationName, setLocationName] = useState("");
	const [locationData, setLocationData] = useState(null);

	const handleLocationSearch = async () => {
		if (locationName.trim() === "") {
			return; // Handle empty input or validation as needed.
		}

		try {
			const db = getDatabase();
			const locationsRef = ref(db, "locations/" + locationName);

			const snapshot = await get(locationsRef);
			if (snapshot.exists()) {
				setLocationData(snapshot.val());
			} else {
				setLocationData(null);
				// Handle case where location was not found in the database.
			}
		} catch (error) {
			console.error("Error querying the database:", error);
			// Handle the error as needed.
		}
	};

	return (
		<div>
			<h1>Location Lookup</h1>
			<input
				type='text'
				placeholder='Enter Location Name'
				value={locationName}
				onChange={(e) => setLocationName(e.target.value)}
			/>
			<button onClick={handleLocationSearch}>Search</button>

			{locationData && (
				<div>
					<h2>Location: {locationName}</h2>
					<p>Latitude: {locationData.latitude}</p>
					<p>Longitude: {locationData.longitude}</p>
				</div>
			)}
		</div>
	);
}

export default LocationLookup;
