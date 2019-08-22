const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const phonebookRouter = require('../routes/phonebook');
const blacklistRouter = require('../routes/blacklist');

const isAuth = require('../middleware/isAuth');
const checkURI = require('../middleware/checkURI');

router.get('/', isAuth, userController.getUsers);
router.post('/', userController.createUser);
router.get('/:userId', checkURI, isAuth, userController.getUser);
router.put('/:userId', checkURI, isAuth, userController.updateUser);
router.delete('/:userId', checkURI, isAuth, userController.deleteUser);
router.use('/:userId/phonebooks', checkURI, isAuth, phonebookRouter);
router.use('/:userId/blacklists', checkURI, isAuth, blacklistRouter);

module.exports = router;