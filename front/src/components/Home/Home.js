import React from 'react';
import "./home.css";
import { useNavigate } from "react-router-dom";


function Home(props) {


    const navigate = useNavigate();
    return (
        <div className="homepage">
      <div className='homeprincipal'>
      <h1>Sistema de cuentas bancarias</h1>

      <p>¡Toma el control de las finanzas con nuestra herramienta web!</p>
      </div>
      <button  type="button" className="buttonHome"
        onClick={() => {
          navigate("/login");
        }}
      >Acceso al inicio de sesión</button>
    </div>
    );
}

export default Home;