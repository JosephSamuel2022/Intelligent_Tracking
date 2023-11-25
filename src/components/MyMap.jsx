import React, { useEffect, useRef, useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	Polyline,
} from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";
import Booked from "./Booked";
import "../App.css";

const MyMap = () => {
	const location = useLocation();
	const { from, to, shortestPath } = location.state;

	const locationDataFrom = from;
	const locationDataTo = to;

	const coordinates = shortestPath;

	const polylineOptions = {
		color: "red",
		weight: 5,
		opacity: 0.7,
		dashArray: "5 10",
		lineCap: "round",
	};

	const locations = [
		{
			latitude: locationDataFrom.latitude,
			longitude: locationDataFrom.longitude,
		},
		{ latitude: locationDataTo.latitude, longitude: locationDataTo.longitude },
	];

	const center = {
		latitude: (locations[0].latitude + locations[1].latitude) / 2,
		longitude: (locations[0].longitude + locations[1].longitude) / 2,
	};

	const zoomLevel = 13;

	const mapContainerRef = useRef(null);

	return (
		<div>
			<div id='map' ref={mapContainerRef}>
				<MapContainer
					center={[center.latitude, center.longitude]}
					zoom={zoomLevel}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					<Polyline pathOptions={polylineOptions} positions={coordinates} />
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
		</div>
	);
};

export default MyMap;
