import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { registerAdmin } from '../../Service';
import './Create.css';

const Create = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            Swal.fire({
                title: "Passwords do not match",
                icon: "error",
                confirmButtonText: 'Ok'
            });
            return;
        }
        
        const adminData = {
            userId,
            password,
        };
        
        try {
            const { status } = await registerAdmin(adminData); // Asume que esta función envía la solicitud al backend
            if (status === 200) {
                Swal.fire({
                    title: "Admin created successfully",
                    icon: "success",
                    confirmButtonText: 'Ok'
                });
                navigate('/login'); // O redirigir a donde consideres apropiado
            }
        } catch (err) {
            Swal.fire({
                title: "Failed to create admin",
                icon: "error",
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <div className="create-admin-form">
            <div className="create">
                <h1>Create New Admin</h1>
                <form onSubmit={handleCreateAdmin}>
                    <div className="form-group">
                        <label htmlFor="userId">User Id</label>
                        <input
                            type="text"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Admin</button>
                </form>
            </div>
        </div>
    );
};

export default Create;
