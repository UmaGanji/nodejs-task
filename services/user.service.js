const pool = require("../config/db");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into registration(firstName, lastName, gender, email, password, number) 
                      values(?,?,?,?,?)`,
            [
              data.first_name,
              data.last_name,
              data.email,
              data.password,
              data.number
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    },

    getUsers: callBack => {
        pool.query(`select id,first_name,last_name, email, password, number from registration`,
        [],
        (error, results, fields) => {
            if(error){
                callBack(error)
            }
            return callBack(null, results[0])
        });
    }, 

    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * from registartion where email = ?`,
            [email],
            (error, results, fields) => {
                if (error){
                    callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    }
}
