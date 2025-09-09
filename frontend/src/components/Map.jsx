import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const fireIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/482/482059.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = ({ fireData }) => {
  return (
    <section id="map" className="map-section hidden-section">
      <div className="map-container" style={{ width: '100%', height: '80vh' }}>
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          />

          {fireData.length > 0 && fireData.map((fire, idx) => (
            <Marker
              key={idx}
              position={[parseFloat(fire.latitude), parseFloat(fire.longitude)]}
              icon={fireIcon}
            >
              <Popup>
                <strong>🔥 Fire Alert</strong>
                <br />
                Brightness: {fire.brightness}
                <br />
                Date: {fire.acq_date} {fire.acq_time}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default Map;