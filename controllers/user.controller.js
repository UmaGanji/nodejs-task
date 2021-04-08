const { create, getUsers, getUserByUserEmail } = require('../services/user.service.js');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');

module.exports = {
    createUser : (req, res) => {
        console.log("request ...",req)
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if(err){
                console.log("error ... ",err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    getUserByUserEmail: (req, res) => {
        const email = req.params.email;
        getUserByUserEmail(email, (err, results) => {
            if(err){
                console.log(error)
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    msg: 'User Not found'
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        })   
    },

    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if(err){
                console.log("error occured while fetching users by email.. ", err)
            }
            if(!results){
                return res.json({
                    success: 0,
                    msg: "UnAuthenticated user"
                })
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results. password = undefined;
                const jsontoken = sign({results: results}, process.env.JWT_KEY, {
                    expiresIn : '1h'
                }) 
                return res.json({
                    success: 1,
                    msg: "login successful",
                    token: jsontoken
                })
            }
            else{
                res.json({
                    success : 0,
                    msg: 'Invalid Authentication'
                })
            }
        })


    }
}