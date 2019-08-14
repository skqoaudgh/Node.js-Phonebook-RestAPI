const express = require('express');
const router = express.Router();
const routerS = express.Router();

const userController = require('../controllers/user');

// /user
router.post('/', userController.createUser);
router.get('/id/:id', userController.getUserById);
router.get('/nickname/:nickname', userController.getUserByNickname);
router.get('/', userController.getUserExceptionHandler);

// /users
routerS.get('/', userController.getUsers);

module.exports = {
    user: router,
    users: routerS
};