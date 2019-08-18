const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const phonebookRouter = require('../routes/phonebook');
const isAuth = require('../middleware/isAuth');
const checkURI = require('../middleware/checkURI');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:userId', userController.getUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

router.use('/:userId/phonebooks', isAuth, checkURI, phonebookRouter);

module.exports = router;