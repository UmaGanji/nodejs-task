const { create } = require('../services/employee');

module.exports = {
    createUser : (req, res) => {
        console.log("request ...",req)
        const body = req.body;
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
    }
}

