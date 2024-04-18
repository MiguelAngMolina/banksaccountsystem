import React, { useState } from 'react';
import "./login.css";
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { adminLogin } from '../../Service'; // Solo adminLogin es necesario aquí

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const userData = {
            username,
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
        <div className="login-container">
            <div className="login-image">
                <img src='/public/home-cover.jpg' alt="Imagen del banco" />
            </div>
            <div className="login-form">
                <div className="login">
                    <h1 className="text-center">Acceso a la administración del banco</h1>
                    <form className="needs-validation was-validated" onSubmit={login}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Usuario</label>
                            <input
                                className="form-control"
                                type="text"
                                id="email"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                placeholder="username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Contraseña</label>
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
                        <button className="btn btn-success w-100" type="submit">Iniciar sesión</button>
                    </form>
                    <div className="mt-3">
                        <Link to="/create" className="btn btn-secondary">Crear nuevo admin</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
