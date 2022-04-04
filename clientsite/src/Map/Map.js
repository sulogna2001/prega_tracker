import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'
import useGeoLocation from './UseGeoLocation';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3VtZWxpIiwiYSI6ImNsMWt5cWVnOTAwZHczZXBnbzE1bHAyb2QifQ.zI_kiUNGDAux1-D2J9Mqew';

export default function Maps() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const location = useGeoLocation();
  const [lng, setLng] = useState(88.3639);
  const [lat, setLat] = useState(22.5726);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
      {location.loaded
        ? JSON.stringify(location)
        : "Location data not available yet."}
    </div>
  );
}