const express = require('express');
const router = express.Router();

const blacklistController = require('../controllers/blacklist');

router.post('/', blacklistController.createBlacklist);

module.exports = router;