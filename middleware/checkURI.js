const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(422).json({error: 'Invalid user ID'});
    }
    else {
        next();
    }
}