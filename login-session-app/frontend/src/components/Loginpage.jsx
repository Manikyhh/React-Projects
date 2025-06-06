import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.withCredentials = true;

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });
            if (response.data.success) {
                setLoggedIn(true);
            }
        } catch (err) {
            alert('Login failed!');
        }
    };

    const checkSession = async () => {
        const res = await axios.get('http://localhost:5000/session');
        if (res.data.loggedIn) {
            setLoggedIn(true);
        }
    };

    const handleLogout = async () => {
        await axios.post('http://localhost:5000/logout');
        setLoggedIn(false);
    };

    useEffect(() => {
        checkSession();
    }, []);

    if (loggedIn) {
        return (
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="card p-5 shadow-lg text-center" style={{ maxWidth: '500px', width: '100%', borderRadius: '15px' }}>
                    <div className="mb-4">
                        <div className="bg-primary text-white rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', fontSize: '36px' }}>
                            👋
                        </div>
                    </div>
                    <h2 className="mb-3">Welcome, <span className="text-primary">{username || 'User'}!</span></h2>
                    <p className="text-muted mb-4">You are successfully logged in.</p>
                    <button className="btn btn-danger btn-lg px-4 py-2" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

        );
    }
    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="card p-5 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Login</h2>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" value={username} placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="btn btn-primary btn-sm w-50 mx-auto d-block" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
