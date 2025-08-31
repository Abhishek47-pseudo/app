import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ disasterData, loading, error }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    // Initialize map if it doesn't exist
    if (!mapRef.current) {
      const map = L.map('disaster-map').setView([22.5, 78.9], 5);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors & CartoDB',
        maxZoom: 19
      }).addTo(map);
      mapRef.current = map;
    }

    const map = mapRef.current;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    // Add new markers based on fetched data
    if (disasterData.length > 0) {
      const customIcon = L.icon({
        iconUrl: 'imgs/disater_pin.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
      });

      const tableBody = document.querySelector("#data-table tbody");
      tableBody.innerHTML = ''; // Clear existing table rows

      disasterData.forEach(item => {
        const { latitude, longitude, timestamp, predicted_labels } = item;
        const readableLabels = predicted_labels.map(label => label.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()));
        
        const popupContent = `<b>Time:</b> ${timestamp}<br/><b>Labels:</b> ${readableLabels.join(", ")}`;
        
        const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map).bindPopup(popupContent);
        markersRef.current.push(marker);

        const row = document.createElement("tr");
        row.innerHTML = `<td>${new Date(timestamp).toLocaleString()}</td><td>${latitude.toFixed(2)}</td><td>${longitude.toFixed(2)}</td><td>${readableLabels.join(", ")}</td>`;
        row.addEventListener("click", () => {
          map.setView([latitude, longitude], 10);
          marker.openPopup();
        });
        tableBody.appendChild(row);
      });
    }

    return () => {
      // Cleanup function to prevent memory leaks if the component unmounts
      if (map) {
        map.remove();
        mapRef.current = null;
      }
    };
  }, [disasterData]);

  if (loading) return <p>Loading map data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section id="map" className="map-section hidden-section">
      <div className="map-container">
        <div id="disaster-map"></div>
        <div id="data-table-container">
          <h3>Disaster Data</h3>
          <table id="data-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Labels</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Map;