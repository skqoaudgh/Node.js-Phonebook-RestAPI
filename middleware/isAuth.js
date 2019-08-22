module.exports = (req, res, next) => {
    if(!req.isAuth) {
        return res.status(403).json({error: {
            "status": 403,
            "error": 'AuthenticationFailed',
            "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
        }});
    }
    else {
        req.userId = req.params.userId;
        if(req.userId && req.id != req.userId) {
            return res.status(401).json({error: {
                "status": 403,
                "error": 'AuthenticationFailed',
                "message": 'Server failed to authenticate the request. Make sure the value of the Authorization header is formed correctly including the signature.'
            }});
        }
        next();
    }
}