import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Read() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <div className="w-50 bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Details of User</h1>
        <div className="mb-2">
          <strong>Name:</strong> {data.name}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {data.email}
        </div>
        <div className="mb-2">
          <strong>Phone:</strong> {data.phone}
        </div>
        <div>
          <Link to={`/update/${id}`} className='btn btn-success me-2'>Edit</Link>
          <Link to='/' className='btn btn-primary'>Back</Link>
        </div>
      </div>
    </div>
  );
}

export default Read;
