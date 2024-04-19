import {BrowserRouter as Router, Routes, Route} from  "react-router-dom"
import Home from "./components/Home/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateAdmin from "./components/CreateAdmin/CreateAdmin";
import CustomersList from "./components/CustomerList/CustomerList";
import CreateCustomer from "./components/CreateCustomer/CreateCustomer";
import EditCustomer from "./components/EditCustomer/EditCustomer";
import AccountsList from "./components/CustomerDetails/Account";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import EditAccount from "./components/EditAccount/EditAccount";

function App() {
  return (
    <div className="App">
   
       <Router>
     
      <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/accounts" element={<AccountsList />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/create" element={<CreateAdmin/>} />
      <Route path="/customerlist" element={<CustomersList/>} />
      <Route path="/createcustomer" element={<CreateCustomer/>} />
      <Route path="/editcustomer/:customerNumber" element={<EditCustomer/>} />
      <Route path="/createaccount" element={<CreateAccount/>} />
      <Route path="/editaccount/:accountId" element={<EditAccount/>} />
      


      </Routes>
     
      </Router> 
     
    
    </div>
  
  
    
  );
}

export default App;
