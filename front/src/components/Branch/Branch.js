import React,{useEffect, useState} from "react";
import Select from "react-select";
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom"
import { createBranch, getAllBranch } from "../../Service";
import "./branch.css"
import Home from "../Home/Home";


const Branch=props =>
{

    const[branchId,setBranchId]=useState('');
    const[branchName,setBranchName]=useState('')
    const[branchAddress,setBranchAddress]=useState('')
    const [options, setOptions] = useState([]);
    const[err,setError]=useState('')
    const navigate=useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);
    
   

    const handleChange=(selectedOption) =>
    {
        setBranchAddress(selectedOption)
            console.log("handleChange",selectedOption);
    }

    const init=async()=>{

        if(localStorage.getItem('token-info')!=null)
        {
          setIsLoggedin(true)
        }
        try{

          //using set to avoid duplicates
          let {data}= await getAllBranch();
          let tempCity = new Set();
          data.map(branch => {
            tempCity.add(branch.branchCity);
          });
        
          //creating option for dropdown
          let tempOptions = [];
          [...tempCity].map(city => {
            tempOptions.push({
              "value": city,
              "label": city
            });
          })
          console.log(tempOptions)
          setOptions(Array.from(tempOptions));
        }
        catch(err)
        {
          setError(err)
        }
      }

    useEffect(() => {
      init();
    }, []);

    
    const addBranch = async(e) => {

        e.preventDefault();

        const branchData = {
          branchId: parseInt(branchId),
          branchName,
          branchCity: branchAddress.value
        };
        console.log(branchData);
        
        try{
            let {status} = await createBranch(branchData);
            if(status === 201) {
              Swal.fire({
                title: "Branch Details created successfully!",
                type: "success", 
                confirmButtonText: 'Ok'
              }).then((result) => {  if (result.isConfirmed) { navigate("/dashboard")}});
              setBranchId('');
              setBranchName('');
              setBranchAddress('');
            }
            
          }
          catch(err)
          {
            Swal.fire({
              title: err.response.data,
              type: "success", 
              confirmButtonText: 'Ok'
            }).then((result) => {  if (result.isConfirmed) { navigate("/add-branch")}});
          }
        }
    
    return(

      <>
      {isLoggedin?
        (
        <div class="login-form">
        <div class="login">
    
        <h1 class="text-center">Branch Details</h1>
        
        <form class="needs-validation was-validated"  >
            <div class="form-group">
                <label class="form-label" for="branchId">BranchId</label>
                <input class="form-control" type="text" id="branchId" 
                onChange={(e) => setBranchId(e.target.value)}
                value={branchId}
                placeholder="branchId"
                required />
            </div>
            <div class="form-group ">
                <label class="form-label" for="branchName">BranchName</label>
                <input class="form-control" type="text" id="branchName" 
                onChange={(e) => setBranchName(e.target.value)}
                value={branchName}
                placeholder="branchName"
                required />
            </div>

            <div class="form-group">
                <label class="form-label" for="branchAddress">Branch Address</label>
                <Select options={options}  onChange={handleChange}></Select>
            </div>
            <input class="btn btn-success w-100" type="submit" onClick={addBranch} value="SUBMIT" />
        </form>
        </div>
    </div>):(<Home />)
    }
    </>


    )
}
export default Branch;