import {BrowserRouter as Router, Routes, Route} from  "react-router-dom"

import BranchDetails from "./components/BranchDetails/BranchDetails";
import Customer from "./components/CustomerDetails/Customer";
import Home from "./components/Home/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Branch from "./components/Branch/Branch";
import CustomerAccount from "./components/CustomerAccount/CustomerAccount";
import Dashboard from "./components/Dashboard/Dashboard";
import Create from "./components/Create/Create";


function App() {
  return (
    <div className="App">

     
    
       
       <Router>
     
      <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/branchs" element={<BranchDetails />} />
      <Route path="/customers" element={<Customer />} />
      <Route path="/add-account" element={<CustomerAccount />} />
      <Route path="/add-branch" element={<Branch />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/create" element={<Create/>} />

      </Routes>
     
      </Router> 
     
    
    </div>
  
  
    
  );
}

export default App;
