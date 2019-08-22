const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(422).json({error: {
            "status": 422,
            "error": 'InvalidQueryParameterValue',
            "message": 'An invalid value was specified for userId of the query parameters in the request URI.'
        }});
    }
    else {
        next();
    }
}