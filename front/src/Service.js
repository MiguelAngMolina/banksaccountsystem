
import axios from 'axios';


const adminService = axios.create(
    {baseURL: 'http://localhost:8081'}
)


// Admins
export const adminLogin = async (body) => {
    const response = await adminService.post(`/admin/`, body);
    return response;
};

export const registerAdmin = async (body) => {
    const response = await adminService.post(`/admin/create`, body);
    return response;
};
export const getAllAdmin = async ()=> {
    const response = await adminService.get(`/admin/`);
    return response;
}




// Cuentas
export const getAllCustomerAccount = async ()=> {
    const response = await adminService.get(`/cuentas/`);
    return response;
};

export const getCustomerAccountById = async (id) => {
    const response = await adminService.get(`/cuentas/${id}`);
    return response;
}

export const deleteCustomerAccount = async (id) => {
    const response = await adminService.delete(`/cuentas/${id}`);
    return response;
};

export const createAccount = async (accountData) => {
    const response = await adminService.post(`/cuentas/`, accountData);
    return response;
};

export const updateAccount = async (id, body) => {
    const response = await adminService.put(`/cuentas/${id}`, body);
    return response;
}



//Usuarios

// method get all customers
export const getAllCustomer = async ()=> {
    const response = await adminService.get(`/usuarios/`);
    return response;
};

export const getCustomerById = async (id) => {
    const response = await adminService.get(`/usuarios/${id}`);
    return response;
};

// create customer
export const createCustomer = async (body) => {
    const response = await adminService.post(`/usuarios/`, body);
    return response;
};

//delete customer
export const deleteCustomer = async (id) => {
    const response = await adminService.delete(`/usuarios/${id}`);
    return response;
};

//update customer
export const updateCustomer = async (id, body) => {
    const response = await adminService.put(`/usuarios/${id}`, body);
    return response;
};


//Transacciones
export const getAllTransactions = async ()=> {
    const response = await adminService.get(`/transacciones/`);
    return response;
};

export const getTransactionById = async (id) => {
    const response = await adminService.get(`/transacciones/${id}`);
    return response;
};

export const createTransaction = async (body) => {
    const response = await adminService.post(`/transacciones/`, body);
    return response;
};

export const deleteTransaction = async (id) => {
    const response = await adminService.delete(`/transacciones/${id}`);
    return response;
};
     

