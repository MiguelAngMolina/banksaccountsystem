import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getAllCustomer, createAccount } from '../../Service'; // Asegúrate de que estos servicios están implementados correctamente

const CreateAccountForm = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [accountNumber, setAccountNumber] = useState('');
    const [openingBalance, setOpeningBalance] = useState('');
    const [openingDate, setOpeningDate] = useState('');
    const [accountType, setAccountType] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await getAllCustomer();
                setCustomers(response.data.map(customer => ({
                    value: customer.customerNumber,
                    label: `${customer.customerNumber} - ${customer.firstName} ${customer.lastName}`
                })));
            } catch (error) {
                console.error('Failed to fetch customers', error);
            }
        };
        fetchCustomers();
    }, []);

    const handleCustomerChange = selectedOption => {
        setSelectedCustomer(selectedOption);
    };

    const handleAccountTypeChange = selectedOption => {
        setAccountType(selectedOption);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCustomer || !accountNumber || !openingBalance || !openingDate || !accountType) {
            Swal.fire('Please fill all fields', '', 'warning');
            return;
        }

        const accountData = {
            accountNumber,
            openingBalance,
            accountOpeningDate: openingDate,
            accountType: accountType.value,
            accountStatus: 'Active', // Asumiendo que quieres que la cuenta esté activa al crearse
            customer: {
                customerNumber: selectedCustomer.value
            }
        };

        try {
            await createAccount(accountData);
            Swal.fire('Account created successfully!', '', 'success');
            navigate('/customers');
        } catch (error) {
            Swal.fire('Failed to create account', error.message, 'error');
        }
    };
    return (
        <div className="customer-form">
            <div className="customer">
                <h1 className="text-center">Create Account</h1>
                <form onSubmit={handleSubmit} className="needs-validation was-validated">
                    <div className="form-group">
                        <label className="form-label">Account Number:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={accountNumber}
                            onChange={e => setAccountNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                    <label className="form-label">Customer Number:</label>
                    <Select
                        options={customers}
                        onChange={handleCustomerChange}
                        value={selectedCustomer}
                        getOptionValue={(option) => option.value}
                        getOptionLabel={(option) => option.label}
                        isSearchable
                        isClearable
                    />
                </div>
                    <div className="form-group">
                        <label className="form-label">Opening Balance:</label>
                        <input
                            className="form-control"
                            type="number"
                            value={openingBalance}
                            onChange={e => setOpeningBalance(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Opening Date:</label>
                        <input
                            className="form-control"
                            type="date"
                            value={openingDate}
                            onChange={e => setOpeningDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Account Type:</label>
                        <Select
                            classNamePrefix="select"
                            options={[
                                { value: 'savings', label: 'Ahorros' },
                                { value: 'current', label: 'Corriente' }
                            ]}
                            onChange={handleAccountTypeChange}
                            value={accountType}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Create Account</button>
                </form>
            </div>
        </div>
    );
};

export default CreateAccountForm;
