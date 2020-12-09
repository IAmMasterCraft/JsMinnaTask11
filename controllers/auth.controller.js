const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");

const utils = require("../utils/utils");

exports.signup = async(request, response) => {
    try {
        const saltRounds = await bcrypt.genSalt();
        //get data
        const { fullname, email, mobile_number, address, gender, password } = request.body;
        if (fullname && email && password) {
            bcrypt.hash(password, saltRounds, async(error, hashedPassword) => {
                if (error) {
                    console.log(error);
                    response.status(500).json(error);
                } else {
                    const newCustomer = new Customer({
                        fullname,
                        email,
                        mobile_number,
                        address,
                        gender,
                        password: hashedPassword,
                    });
                    const myCustomer = await newCustomer.save();
                    response.status(201).json({
                        success: true,
                        fullname,
                        email,
                        mobile_number,
                        address,
                        gender,
                        token: utils.generateToken(myCustomer),
                    });
                }
            });

        }
    } catch (error) {
        response.status(500).json(error);
    }


}

exports.login = async(request, response) => {
    try {
        const { email, password } = request.body;
        const myCustomer = await Customer.findOne({ email: email });
        if (!myCustomer) response.status(404).json({ error: "no customer with that email" });
        else {
            bcrypt.compare(password, myCustomer.password, (error, match) => {
                if (error) response.status(500).json(error);
                else if (match) {
                    myCustomer.password = null;
                    const responseData = {
                        dateGenerated: customer.dateGenerated,
                        _id: customer._id,
                        fullname: customer.fullname,
                        email: customer.email,
                        mobile_number: customer.mobile_number,
                        address: customer.address,
                        gender: customer.gender,
                        token: utils.generateToken(myCustomer)
                    };
                    response.status(201).json(responseData);
                } else response.status(403).json({ error: "passwords do not match" });
            })
        }
    } catch (error) {
        response.status(500).json(error);
    }
}