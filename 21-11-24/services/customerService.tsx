import axios from 'axios';

const BASE_URL:string|undefined = process.env.REACT_APP_CUSTOMER_URL;

if (!BASE_URL) {
    throw new Error("API URL is not defined in the environment variables.");
  }

  export interface Customer{
    customerId:number;
    name:string;
    city:string;
    contactNumber:string;
    year:number;
    photo:string;
    totalPurchasesPerYear:number | null;
} 

// Read All Customers

export const getAllCustomers=async():Promise<Customer[]> =>{
    try{
        const response = await axios.get<Customer[]>(`${BASE_URL}?_sort=customerId`);
        return response.data;
    }catch(error){
        console.log("Error fetching customers:", error);
        throw error;
    }
};

//Get a customer by ID

export const getCustomersById=async(id:number):Promise<Customer> =>{  //check whether customerId has to be passed....
    try{
        const response = await axios.get<Customer>(`${BASE_URL}/${id}`);
        return response.data;
    }catch(error){
        console.log("Error fetching customer id:", error);
        throw error;
    }
};

//Create new customer

export const createCustomer=async(customer:Customer):Promise<Customer> =>{
    try{
        const response = await axios.post<Customer>(`${BASE_URL}`,customer);
        return response.data;
    }catch(error){
        console.log("Error creating customer:", error);
        throw error;
    }
};

//Update customer

export const updateCustomer=async(customer:Customer):Promise<Customer> =>{
    try{
        const response = await axios.put<Customer>(`${BASE_URL}/${customer.customerId}`,customer);
        return response.data;
    }catch(error){
        console.log("Error updating customer:", error);
        throw error;
    }
};

//Delete customer

export const deleteCustomer=async(customerId:number):Promise<void> =>{
    try{
        const response = await axios.delete(`${BASE_URL}/${customerId}`);
    }catch(error){
        console.log(`Error deleting customer ${customerId}:`, error);
        throw error;
    }
};


export const customerService = {
    getAllCustomers,
    getCustomersById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};