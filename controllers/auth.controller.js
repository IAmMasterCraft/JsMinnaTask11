const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");

const utils = require("../utils/utils");

exports.signup = async(request, response) => {
    const saltRounds = await bcrypt.genSalt();
    //get data
    const fullname = request.body.fullname;
    const email = request.body.email;
    const mobile_number = request.body.mobile_number;
    const address = request.body.address;
    const gender = request.body.gender;
    const password = request.body.password;
    if (fullname && email && password) {
        bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
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
                newCustomer
                    .save()
                    .then(customer => {
                        response.status(201).json({
                            success: true,
                            fullname,
                            email,
                            mobile_number,
                            address,
                            gender,
                            token: utils.generateToken(customer),
                        });
                    })
                    .catch(error => {
                        response.status(500).json(error);
                    });
            }
        });

    }
}

exports.login = (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    Customer
        .findOne({ email: email })
        .then(customer => {
            if (!customer) response.status(404).json({ error: "no customer with that email" });
            else {
                bcrypt.compare(password, customer.password, (error, match) => {
                    if (error) response.status(500).json(error);
                    else if (match) {
                        customer.password = null;
                        const responseData = {
                            dateGenerated: customer.dateGenerated,
                            _id: customer._id,
                            fullname: customer.fullname,
                            email: customer.email,
                            mobile_number: customer.mobile_number,
                            address: customer.address,
                            gender: customer.gender,
                            token: utils.generateToken(customer)
                        };
                        response.status(201).json(responseData);
                    } else response.status(403).json({ error: "passwords do not match" });
                })
            }
        })
        .catch();
}