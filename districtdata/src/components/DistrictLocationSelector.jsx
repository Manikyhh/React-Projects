import React, { useEffect, useState } from 'react';

const DistrictLocationSelector = () => {
  const [data, setData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    fetch('/districts.json') // Generic file name in public folder
      .then(response => response.json())
      .then(json => {
        setData(json.districts); // Assumes structure: { districts: [...] }
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
    <div>
      <h2>Select District</h2>
      <select onChange={handleDistrictChange} value={selectedDistrict}>
        <option value="">-- Select District --</option>
        {data.map((district, index) => (
          <option key={index} value={district.name}>
            {district.name}
          </option>
        ))}
      </select>

      {locations.length > 0 && (
        <>
          <h3>Select Location</h3>
          <select onChange={(e) => setSelectedLocation(e.target.value)} value={selectedLocation}>
            <option value="">-- Select Location --</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </>
      )}

      {selectedDistrict && selectedLocation && (
        <p>
          ✅ You selected: <strong>{selectedDistrict}</strong> → <strong>{selectedLocation}</strong>
        </p>
      )}
    </div>
  );
};

export default DistrictLocationSelector;
