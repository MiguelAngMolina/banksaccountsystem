import React from 'react';
import "./home.css";
import { useNavigate } from "react-router-dom";


function Home(props) {


    const navigate = useNavigate();
    return (
        <div className="homepage">
      <h1>Welcome!</h1>
      <p>Global Bank Admin Management</p>
      <button  type="button" class="btn btn-success"
        onClick={() => {
          navigate("/login");
        }}
      >Login</button>
    </div>
    );
}

export default Home;