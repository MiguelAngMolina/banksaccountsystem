
import axios from 'axios';


const adminService = axios.create(
    {baseURL: 'http://localhost:8081'}
)

export const adminLogin = async (body) => {
    const response = await adminService.post(`/admin/`, body);
    return response;
};

// registerAdmin
export const registerAdmin = async (body) => {
    const response = await adminService.post(`/admin/create`, body);
    return response;
};

export const getAllCustomerAccount = async ()=> {
    const response = await adminService.get(`/account/`);
    return response;
};

export const getAllBranch = async ()=> {
    const response = await adminService.get(`/branch/`);
    return response;
};

export const deleteCustomerAccount = async (id) => {
    const response = await adminService.delete(`/account/${id}`);
    return response;
};

export const deleteBranch = async (id) => {
    const response = await adminService.delete(`/branch/${id}`);
    return response;
};

export const createBranch = async (body) => {
    const response = await adminService.post(`/branch/`,body);
    return response;
};

export const createAccount = async (id, body) => {
    const response = await adminService.post(`/account/${id}`, body);
    return response;
};



// DUMMY DATA
// const dummyCustomers=[
//     {
//     "AccountNo":"C001",
//     "customerNo":"1234",
//     "branchId":"b001",
//     "balance":"6000",
//     "openingDate":"2022-7-11"
//     },
//     {
//         "AccountNo":"C001",
//     "customerNo":"1234",
//     "branchId":"b001",
//     "balance":"6000",
//     "openingDate":"2022-7-11"
//     }
// ];
// const dummyBranch=[
//     {
//     "BranchId":"b001",
//     "BranchName":"Asif Ali Road",
//     "BranchAddress":"Delhi",
//     },
//     {
//       "BranchId":"b001",
//       "BranchName":"Asif Ali Road",
//       "BranchAddress":"Delhi",
//       }
   
// ];