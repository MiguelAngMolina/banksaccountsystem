import React, { useState } from 'react';
import "./login.css";
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { adminLogin } from '../../Service'; 
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
                title: "Credenciales incorrectas, por favor inténtelo de nuevo.",
                icon: "error",
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <div className="login-container">
            <div className="login-image">
                
            </div>
            <div className="login-form">
                <div className="login">
                    <h1 className="text-center">Acceso a la administración del banco</h1>
                    <form className="needs-validation was-validated" onSubmit={login}>
                        <div className="form-group">
                            
                            <input
                                className="form-control"
                                type="text"
                                id="email"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                placeholder="Usuario"
                                required
                            />
                        </div>
                        <div className="form-group">
                           
                            <input
                                className="form-control"
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="Contraseña"
                                required
                            />
                        </div>
                        <button className="bottonLogin w-100" type="submit">Iniciar sesión</button>
                    </form>
                    <div className="">
                        <Link to="/create" className="bottonAdd w-100">Crear nuevo admin</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
