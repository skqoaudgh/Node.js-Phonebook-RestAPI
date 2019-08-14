const express = require('express');
const router = express.Router();
const routerS = express.Router();

const userController = require('../controllers/user');

// /user
router.post('/', userController.createUser);
router.get('/id/:id', userController.getUserById);
router.get('/nickname/:nickname', userController.getUserByNickname);
router.put('/id/:id', userController.updateUserById);
router.put('/nickname/:nickname', userController.updateUserByNickname);
router.delete('/id/:id', userController.deleteUserById);
router.delete('/nickname/:nickname', userController.deleteUserByNickname);
router.get('/', userController.getUserExceptionHandler);

// /users
routerS.get('/', userController.getUsers);

module.exports = {
    user: router,
    users: routerS
};