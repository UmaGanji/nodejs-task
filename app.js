require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const registerRoute = require('./routes/register');
const userRouter = require('./routes/user.router');

app.use(express.json())
// app.use('/register', registerRoute);

app.use('/api/users', userRouter)

// Test API
app.get('/test', (req, res) => {
    res.send({
        'msg': 'Sample API'
    })
});

app.listen(5000, () => console.log("server started on port 5000"));