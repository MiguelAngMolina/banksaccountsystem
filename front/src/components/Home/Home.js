import React from 'react';
import "./home.css";
import { useNavigate } from "react-router-dom";

function Home(props) {
    const navigate = useNavigate();

    return (
        <div className="homepage">
            <div className="card">
                <h1>Bienvenido!</h1>
                <p>Sistema de cuentas bancarias</p>
                <button className='button' onClick={() => navigate("/login")}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Home;
