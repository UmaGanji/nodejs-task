const pool = require("../config/db");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into employee(name, job_title, department, location, age, salary) 
                      values(?,?,?,?,?)`,
            [
              data.name,
              data.job_title,
              data.department,
              data.location,
              data.age,
              data.salary
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              return callBack(null, results);
            }
          );
    }
}
