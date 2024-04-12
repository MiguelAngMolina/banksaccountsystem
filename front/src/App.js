import {BrowserRouter as Router, Routes, Route} from  "react-router-dom"
import Customer from "./components/CustomerDetails/Customer";
import Home from "./components/Home/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import CustomerAccount from "./components/CustomerAccount/CustomerAccount";
import Dashboard from "./components/Dashboard/Dashboard";
import Create from "./components/Create/Create";
// import customerlist
import CustomersList from "./components/CustomerList/CustomerList";




function App() {
  return (
    <div className="App">

     
    
       
       <Router>
     
      <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/customers" element={<Customer />} />
      <Route path="/add-account" element={<CustomerAccount />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/create" element={<Create/>} />
      <Route path="/customerlist" element={<CustomersList/>} />

      </Routes>
     
      </Router> 
     
    
    </div>
  
  
    
  );
}

export default App;
