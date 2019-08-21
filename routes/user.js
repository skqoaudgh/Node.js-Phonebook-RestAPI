const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const phonebookRouter = require('../routes/phonebook');
const blacklistRouter = require('../routes/blacklist');

const isAuth = require('../middleware/isAuth');
const checkURI = require('../middleware/checkURI');

router.get('/', isAuth, userController.getUsers);
router.post('/', userController.createUser);
router.get('/:userId', isAuth, checkURI, userController.getUser);
router.put('/:userId', isAuth, checkURI, userController.updateUser);
router.delete('/:userId', isAuth, checkURI, userController.deleteUser);

router.use('/:userId/phonebooks', isAuth, checkURI, phonebookRouter);
router.use('/:userId/blacklists', isAuth, checkURI, blacklistRouter);

module.exports = router;