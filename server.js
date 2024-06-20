const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer.js');

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    // await runQueries();
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit();
};

/*-------------------------------------------------------------*/

const createCustomer = async () => {
    const customerData = {
        name: ,
        age: ,
    };

    const customer = await Customer.create(customerData);
    console.log("New customer:", customer);
};

const findCustomer = async () => {
    const customers = await Customer.find({});
    console.log("All customers:", customers);
};

const updateCustomer = async () => {
    const id = '66743649932aa84415920816';
    const updatedCustomer = await Customer.findByIdAndUpdate(
        id, 
        {
            name: ,
            age: ,
        }
    );
    console.log("Updated customer:", updatedCustomer);
};

const deleteCustomer = async () => {
    const id = '66743649932aa84415920816';
    const removedCustomer = await Customer.findByIdAndDelete(id);
    console.log('Removed customer:', removedCustomer)
}

/*-------------------------------------------------------------*/

connect();