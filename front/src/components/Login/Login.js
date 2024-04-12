import React, { useState } from 'react';
import "./login.css";
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { adminLogin } from '../../Service'; // Solo adminLogin es necesario aquí

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const userData = {
            userId,
            password,
        };
        try {
            const { status } = await adminLogin(userData);
            if (status === 200) {
                // Logica de éxito
                localStorage.setItem('token-info', JSON.stringify(userData));
                navigate("/customerlist");
            }
        } catch (err) {
            // Logica de error
            Swal.fire({
                title: "Bad Credentials, Please try again!",
                icon: "error",
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <div className="login-form">
            <div className="login">
                <h1 className="text-center">Bank Admin Login</h1>
                <form className="needs-validation was-validated" onSubmit={login}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">UserId</label>
                        <input
                            className="form-control"
                            type="text"
                            id="email"
                            onChange={(e) => setUserId(e.target.value)}
                            value={userId}
                            placeholder="userId"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button className="btn btn-success w-100" type="submit">SIGN IN</button>
                </form>
                <div className="mt-3">
                    <Link to="/create" className="btn btn-primary">Create New Admin</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
