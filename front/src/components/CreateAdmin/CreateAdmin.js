import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { registerAdmin } from '../../Service';
import './Create.css';

const CreateAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            Swal.fire({
                title: "Contraseñas no coinciden",
                icon: "error",
                confirmButtonText: 'Ok'
            });
            return;
        }
        
        const adminData = {
            username,
            password,
        };
        
        try {
            const { status } = await registerAdmin(adminData); // Funcion que envia la solicitud al backend
            if (status === 200) {
                Swal.fire({
                    title: "Admin creado exitosamente",
                    icon: "success",
                    confirmButtonText: 'Ok'
                });
                navigate('/login'); // O redirigir al login
            }
        } catch (err) {
            Swal.fire({
                title: "Error al creer el admin",
                icon: "error",
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
    <div className='create-admin-container'>
        

        <div className="create-admin-form">
            <div className="create">
                <h1>Crear nuevo administrador</h1>
                <form onSubmit={handleCreateAdmin}>
                    <div className="form-group">
                        
                        <input
                            type="text"
                            id="userId"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Usuario'
                            required
                        />
                    </div>
                    <div className="form-group">
                        
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Contraseña'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Confirmar contraseña'
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Agregar administrador</button>
                </form>
            </div>
        </div>
        <div className='create-admin-image'>
        </div>
    </div>
    );
};

export default CreateAdmin;
