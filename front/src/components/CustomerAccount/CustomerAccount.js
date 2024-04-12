import React, { useState,useEffect } from "react"
import Select from "react-select"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./customer-account.css"
import { createAccount } from "../../Service"
import Home from "../Home/Home";
import Dashboard from "../Dashboard/Dashboard";


const CustomerAccount=props=>
{

    const [accountNumber,setAccountNumber]=useState('');
    const [customerNumber,setCustomerNumber]=useState('');
    const [openingBalance,setOpeningBalance]=useState('');
    const [openingDate,setOpeningDate]=useState('');
    const [accountType,setAccountType]=useState('');
    const [accountStatus,setAccountStatus]=useState('');
    const [branchIdOptions, setBranchIdOptions] = useState([]);
    const [accountTypeOptions, setAccountTypeOptions] = useState([]);
    const [accountStatusOptions, setAccountStatusOptions] = useState([]);
    const[err,setError]=useState('')
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);//It is used to validate every component rendering
    
        
        const accountTypeHandler = (selectedOption) => {
            setAccountType(selectedOption.value);
            console.log("Account Type", selectedOption.value);
        };
        
        const StatusHandler=(selectedOption)=>{
            setAccountStatus(selectedOption.value);
            console.log("Acccount Status",selectedOption.value);
        }
        
        const init=async()=>{

            //setting option for dropdown
            const tempAccountType = [{
                    "value": "Current",
                    "label": "Current"
                }, {
                    "value": "Savings",
                    "label": "Savings"
                }];
            setAccountTypeOptions(tempAccountType);
            const tempAccountStatus = [{
                "value": "Active",
                "label": "Active"
            }, {
                "value": "Inactive",
                "label": "Inactive"
            }];
            setAccountStatusOptions(tempAccountStatus);
          }
    
        useEffect(() => {
            if(localStorage.getItem('token-info')!=null)
            {
              setIsLoggedin(true)
            }
            init();
        }, []);


        const Add = async (e) => {
            e.preventDefault();

            const accountData = {
                accountNumber: parseInt(accountNumber),
                openingBalance: parseInt(openingBalance),
                accountOpeningDate: openingDate,
                accountStatus,
                accountType
            };
            console.log(accountData);

        

        
        try{
            let {status} = await createAccount(customerNumber, accountData);
            if(status === 201) {
              Swal.fire({
                title: "Account Details created successfully!",
                type: "success", 
                confirmButtonText: 'Ok'
              }).then((result) => {  if (result.isConfirmed) { navigate("/dashboard")}});
              setAccountNumber('');
              setCustomerNumber('');
              setOpeningDate('');
              setOpeningBalance('');
            }  
          }
          catch(err)
          {
            if(err.response.status === 400) {
                Swal.fire({
                    title: err.response.data,
                    type: "success", 
                    confirmButtonText: 'Ok'
                  }).then((result) => {  if (result.isConfirmed) { navigate("/add-account")}});
            } else {
                Swal.fire({
                    title: "Bad Request! Make sure the values are not empty ",
                    type: "success", 
                    confirmButtonText: 'Ok'
                  }).then((result) => {  if (result.isConfirmed) { navigate("/add-account")}});
            }
          }
        };
                              
    return (
    <>
        {isLoggedin?
        (
            <div>
            <Dashboard/>  

        <div class="customer-form">
            
            <div class="customer">

                <h1 class="text-center">Add Account</h1>

                <form class="needs-validation was-validated">
                    <div class="form-group ">
                        <label class="form-label">Account Number</label>
                        <input class="form-control" type="text"
                            onChange={(e)=>setAccountNumber(e.target.value)}
                            value={accountNumber}
                            placeholder="Account Number"
                            required />
                    </div>
                    <div class="form-group ">
                        <label class="form-label">Customer Number</label>
                        <input class="form-control" type="text"
                            onChange={(e)=>setCustomerNumber(e.target.value)}
                            value={customerNumber}
                            placeholder="Customer Number"
                            required />
                    </div>
                    <div class="form-group ">
                        <label class="form-label">Opening Balance</label>
                        <input class="form-control" type="number" min="5000"
                              onChange={(e)=>setOpeningBalance(e.target.value)}
                              value={openingBalance}
                            placeholder="atleast 5000"
                            required />
                    </div>
                    <div class="form-group ">
                        <label class="form-label">Opening Date</label>
                        <input class="form-control" type="date"
                         onChange={(e)=>setOpeningDate(e.target.value)}
                         value={openingDate}
                            required />
                    </div>
                    <div class="form-group ">
                        <label class="form-label">Account Type</label>
                        <Select options={accountTypeOptions}  onChange={accountTypeHandler}></Select>
                    </div>
                    <div class="form-group ">
                        <label class="form-label">Account Status</label>
                        <Select options={accountStatusOptions}  onChange={StatusHandler}></Select>
                    </div>
                    <input class="btn btn-success w-100" type="submit" onClick={Add} value="Add"  />
                </form>
            </div>
        </div>
        </div>):(<Home />)
        }
    </>
    )
}
export default CustomerAccount;
