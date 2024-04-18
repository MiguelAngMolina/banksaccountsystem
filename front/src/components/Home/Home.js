import React from 'react';
import "./home.css";
import { useNavigate } from "react-router-dom";


function Home(props) {


    const navigate = useNavigate();
    return (
        <div className="homepage">
      <div className='homeprincipal'>
      <h1>¿Aún no eres parte de la tripulación?</h1>
      <p>Sistema de cuentas bancarias</p>
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