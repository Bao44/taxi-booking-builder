import { UserLocationContext } from "@/context/UserLocationContext";
import React, { useContext, useEffect, useRef } from "react";
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { SourceCoordinateContext } from "@/context/SourceCoordinateContext";
import { DestinationCoordinateContext } from "@/context/DestinationCoordinateContext";
import { DirectionDataContext } from "@/context/DirectionDataContext";
import MapBoxRoute from "./MapBoxRoute";
import DistanceTime from "./DistanceTime";

const session_token = "5ccce4a4-ab0a-4a7c-943d-580e55542363";
const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";

function MapBoxMap() {
  const mapRef = useRef<any>(null);
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCoordinates, setSourceCoordinates } = useContext(
    SourceCoordinateContext
  );
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCoordinateContext
  );

  const { directionData, setDirectionData } = useContext(DirectionDataContext);

  // Use to fly to the source coordinates
  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates.lng, sourceCoordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);

  // Use to fly to the destination coordinates
  useEffect(() => {
    if (destinationCoordinates) {
      mapRef.current?.flyTo({
        center: [destinationCoordinates.lng, destinationCoordinates.lat],
        duration: 2500,
      });
    }

    if (sourceCoordinates && destinationCoordinates) {
      getDirectionRoute();
    }
  }, [destinationCoordinates]);

  const getDirectionRoute = async () => {
    const res = await fetch(
      MAPBOX_DRIVING_ENDPOINT +
        sourceCoordinates.lng +
        "," +
        sourceCoordinates.lat +
        ";" +
        destinationCoordinates.lng +
        "," +
        destinationCoordinates.lat +
        "?overview=full&geometries=geojson" +
        "&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    setDirectionData(result);
  };

  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 600, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />

            {directionData?.routes ? (
              <MapBoxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>
      <div className="absolute bottom-[90px] z-20 right-[20px] hidden md:block">
        <DistanceTime />
      </div>
    </div>
  );
}

export default MapBoxMap;
