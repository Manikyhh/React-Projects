import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Create() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/users', values)
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex w-100 vh-75 justify-content-center align-items-center pt-5'>
      <div className="w-50 border bg-white px-5 pt-3 pb-5 rounded">
        <h1>Add User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              id="name"
              maxLength={50}
              onChange={e => setValues({ ...values, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              id="email"
              maxLength={50}
              onChange={e => setValues({ ...values, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phno" className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter Phone Number"
              id="phno"
              maxLength={10}
              minLength={10}
              pattern="[0-9]{10}"
              onChange={e => setValues({ ...values, phone: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-success me-2">Submit</button>
          <Link to="/" className="btn btn-primary">Back</Link>
        </form>
      </div>
    </div>
  );
}

export default Create;
