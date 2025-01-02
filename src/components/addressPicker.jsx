import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 37.7749, // Default latitude
  lng: -122.4194, // Default longitude
};

export function AddressPicker({ setAddress, setCoordinates }) {
  const [location, setLocation] = useState(defaultCenter);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(currentLocation);
          setCoordinates(currentLocation);
          if (markerRef.current) {
            markerRef.current.setPosition(currentLocation);
          }
          if (mapRef.current) {
            mapRef.current.setCenter(currentLocation);
          }
        },
        (error) => {
          console.error("Error fetching current location:", error);
          alert("Unable to fetch current location. Using default location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const onMapLoad = (map) => {
    mapRef.current = map;

    const MarkerClass =
      window.google?.maps?.marker?.AdvancedMarkerElement ||
      window.google?.maps?.Marker;

    if (MarkerClass) {
      markerRef.current = new MarkerClass({
        position: location,
        draggable: true,
        map: mapRef.current,
      });

      markerRef.current.addListener("position_changed", async () => {
        const position = markerRef.current.getPosition();
        const lat = position.lat();
        const lng = position.lng();

        const newLocation = { lat, lng };
        setLocation(newLocation);
        setCoordinates(newLocation);

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCqpxjBGfcG_daTHD40n-QnxUYPEZsa2Rc`
          );
          const data = await response.json();
          if (data.results.length > 0) {
            setAddress(data.results[0].formatted_address);
          } else {
            setAddress("No address found.");
          }
        } catch (error) {
          console.error("Error with reverse geocoding:", error);
          setAddress("Error fetching address.");
        }
      });
    } else {
      console.error("No valid marker class available.");
    }

    // Fetch current location when the map is loaded
    handleCurrentLocation();
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCqpxjBGfcG_daTHD40n-QnxUYPEZsa2Rc"
      libraries={["places"]}
      onLoad={() => console.log("Google Maps script loaded successfully")}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={15}
        onLoad={onMapLoad}
      />
    </LoadScript>
  );
}
