import React,{useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import { deleteBranch, getAllBranch } from '../../Service';
import Dashboard from '../Dashboard/Dashboard';
import Home from '../Home/Home';
import './branch-details.css'

const BranchDetails = props => {
   
  const[branchDetails,setBranchDetails]=useState([]);
  const[err,setError]=useState('');
  const [loadFlag, setLoadFlag] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const loadData = async()=>{

    if(localStorage.getItem('token-info')!=null)
    {
      setIsLoggedin(true)
    }

    try{
      let {status, data} =await getAllBranch();
      if(status === 200)
        setBranchDetails(data);
    }
    catch(err)
    {
      setError(err)
    }
  }

  useEffect(() => {
    if(loadFlag) {
      loadData();
      setLoadFlag(false);
    }
  }, [loadFlag]);

const deleteBranchHandler = async (id) => {
  console.log(id);
  const {status, data} = await deleteBranch(id);
  if(status === 200) {
    setLoadFlag(true);
  }
  else {
    alert(data);
  }
};

    
    return (
      <>
      {isLoggedin?
        (
        <>
      <Dashboard/>
      <div className="container">
      <div className="py-4">
        <h1>Branch Details</h1>
        <table class="table border shadow table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col">BranchId</th>
              <th scope="col">Branch Name</th>
              <th scope="col">Branch Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {branchDetails.map((branch) => (
              <tr>
                <td>{branch.branchId}</td>
                <td>{branch.branchName}</td>
                <td>{branch.branchCity}</td>
                
                <td>
                 
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteBranchHandler(branch.branchId)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
       
      </div>
    </div>
      </>):(<Home />)
    }
    </>
          
    );
};

;

export default BranchDetails;

