const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer.js');
const prompt = require('prompt-sync')();

const connect = async (func) => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await func;
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit();
};

// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}`);

console.log(
    `Welcome to the CRM \n
What would you like to do? \n
    1. Create a customer \n
    2. View all customers \n
    3. Update a customer \n
    4. Delete a customer \n
    5. Quit \n
    \n
Number of action to run`
);

const action = prompt();

const createCustomer = async (customerName, customerAge) => {
    const customerData = {
        name: customerName,
        age: customerAge,
    };

    const customer = await Customer.create(customerData);
    console.log('New customer:', customer);
};

const findCustomer = async () => {
    const customers = await Customer.find({});
    console.log("All customers:", customers);
};

const updateCustomer = async (id, customerNameChange, customerAgeChange) => {
    const updatedCustomer = await Customer.findByIdAndUpdate(
        id, 
        {
            name: customerNameChange,
            age: customerAgeChange,
        }
    );
    console.log("Updated customer:", updatedCustomer);
};

const deleteCustomer = async (id) => {
    const removedCustomer = await Customer.findByIdAndDelete(id);
    console.log('Removed customer:', removedCustomer)
};

switch (action) {
    case '1':
        const customerName = prompt('Customer name: ');
        const customerAge = prompt('Customer age: ');
        connect(createCustomer(customerName, customerAge));
        break;
    case '2':
        connect(findCustomer());
        break;
    case '3':
        const customerID = prompt('Customer ID: ');
        const customerNameChange = prompt('Customer name: ');
        const customerAgeChange = prompt('Customer age: ');
        connect(updateCustomer(customerID, customerNameChange, customerAgeChange));
        break;
    case '4':
        const id = prompt('Customer ID: ');
        connect(deleteCustomer(id));
        break;
    case '5':
        mongoose.connection.close();
        console.log('Closed database connection');
        break;
    default:
        console.log('Invalid action');
}