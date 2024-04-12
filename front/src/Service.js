
import axios from 'axios';


const adminService = axios.create(
    {baseURL: 'http://localhost:8081'}
)

export const adminLogin = async (body) => {
    const response = await adminService.post(`/admin/`, body);
    return response;
};

export const registerAdmin = async (body) => {
    const response = await adminService.post(`/admin/create`, body);
    return response;
};




export const getAllCustomerAccount = async ()=> {
    const response = await adminService.get(`/account/`);
    return response;
};


export const deleteCustomerAccount = async (id) => {
    const response = await adminService.delete(`/account/${id}`);
    return response;
};


export const createAccount = async (id, body) => {
    const response = await adminService.post(`/account/${id}`, body);
    return response;
};



// method get all customers
export const getAllCustomer = async ()=> {
    const response = await adminService.get(`/customer/`);
    return response;
};

// method get customer by id
export const getCustomerById = async (id) => {
    const response = await adminService.get(`/customer/${id}`);
    return response;
};

// create customer
export const createCustomer = async (body) => {
    const response = await adminService.post(`/customer/create`, body);
    return response;
};

//delete customer
export const deleteCustomer = async (id) => {
    const response = await adminService.delete(`/customer/${id}`);
    return response;
};

//update customer
export const updateCustomer = async (id, body) => {
    const response = await adminService.put(`/customer/${id}`, body);
    return response;
};
