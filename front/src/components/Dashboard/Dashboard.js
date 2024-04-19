import React from "react";

import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";
const Dashboard = (props) => {
  const navigate = useNavigate();

  //To clear the current session
  const logout = () => {
    console.log("log out user");
    localStorage.removeItem("token-info");
    navigate("/");
  };
  return (
    <div className="general">
      <ul>
      <li>
          <Link to="/customerlist">All Clients</Link>
        </li>
        <li>
          <Link to="/accounts">Accounts</Link>
        </li>
        <li>
          <Link to="/transactionslist">Transactions</Link>
        </li>
        
        
        <li class="logout">
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
