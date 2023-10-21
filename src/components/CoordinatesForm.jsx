import React, { useState } from "react";
import axios from "axios";

const CoordinatesForm = () => {
	const [address, setAddress] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");

	const handleGetCoordinates = async () => {
		try {
			// Replace 'YOUR_API_KEY' with your HERE API key
			const apiKey = "iamsvxSR-apCYzt_-Lou8oVTAU3R8CN_skH1mVu1I1M";

			const url = `https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=${address}&gen=9&apiKey=${apiKey}`;
			const response = await axios.get(url);

			if (response.data && response.data.Response.View.length > 0) {
				const location =
					response.data.Response.View[0].Result[0].Location.DisplayPosition;
				setLatitude(location.Latitude);
				setLongitude(location.Longitude);
			} else {
				console.error("Geocoding API request failed.");
			}
		} catch (error) {
			console.error("Error geocoding address:", error);
		}
	};

	return (
		<form>
			<label>Address</label>
			<input
				type='text'
				name='address'
				value={address}
				onChange={(e) => setAddress(e.target.value)}
			/>
			<br />
			<label>Latitude</label>
			<input type='text' name='lat' value={latitude} readOnly />
			<br />
			<label>Longitude</label>
			<input type='text' name='lng' value={longitude} readOnly />
			<br />
			<button type='button' onClick={handleGetCoordinates}>
				Get Coordinates
			</button>
		</form>
	);
};

export default CoordinatesForm;
