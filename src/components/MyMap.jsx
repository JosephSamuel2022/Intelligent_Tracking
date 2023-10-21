import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import DriverProfile from "./DriverProfile";
import axios from "axios";
import Booked from "./Booked";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";
import "../App.css";

const MyMap = () => {
	// const [latitude, setCurrLatitude] = useState(12.947767);
	// const [longitude, setCurrLongitude] = useState(80.139424);

	// useEffect(() => {
	// 	getLocation();
	// }, []);

	// const getLocation = async () => {
	// 	const location = await axios.get("https://ipapi.co/json");
	// 	setCurrLatitude(location.data.latitude);
	// 	setCurrLongitude(location.data.longitude);
	// 	console.log(location);
	// };
	const location = useLocation();
	const { from, to } = location.state;

	const locationDataFrom = from;
	const locationDataTo = to;

	const locations = [
		{
			latitude: locationDataFrom.latitude,
			longitude: locationDataFrom.longitude,
		},
		{ latitude: locationDataTo.latitude, longitude: locationDataTo.longitude },
	];

	//chrompet and thoraipakkam

	const center = {
		latitude: (locations[0].latitude + locations[1].latitude) / 2,
		longitude: (locations[0].longitude + locations[1].longitude) / 2,
	};
	const zoomLevel = 13;
	return (
		<div>
			<MapContainer
				center={[center.latitude, center.longitude]}
				zoom={zoomLevel}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{locations.map((location, index) => (
					<Marker
						key={index}
						position={[location.latitude, location.longitude]}>
						{index === 0 ? (
							<Popup>
								<Booked />
							</Popup>
						) : null}
					</Marker>
				))}
			</MapContainer>
		</div>
	);
};

export default MyMap;
