import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    fetch('/districts.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        console.log("Fetched data:", json.districts);
        setData(json.districts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDistrictChange = (event) => {
    const districtName = event.target.value;
    setSelectedDistrict(districtName);
    setSelectedLocation('');

    const selected = data.find(d => d.name === districtName);
    setLocations(selected ? selected.locations : []);
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">📍 Location Selector</h2>

        <div className="mb-3">
          <label className="form-label">Select District</label>
          <select
            className="form-select"
            onChange={handleDistrictChange}
            value={selectedDistrict}
          >
            <option value="">-- Select District --</option>
            {data.map((district, index) => (
              <option key={index} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        {locations.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Select Location</label>
            <select
              className="form-select"
              onChange={(e) => setSelectedLocation(e.target.value)}
              value={selectedLocation}
            >
              <option value="">-- Select Location --</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedDistrict && selectedLocation && (
          <div className="alert alert-success mt-4 text-center">
            ✅ You selected: <strong>{selectedDistrict}</strong> → <strong>{selectedLocation}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
