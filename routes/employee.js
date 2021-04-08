const { createEmployee } = require('../controllers/employee');
const router = require('express').Router();
const { checkToken } = require('../auth/token_validation')

router.post('/', checkToken, createEmployee);

module.exports = router;

