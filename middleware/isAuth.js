module.exports = (req, res, next) => {
    if(!req.isAuth) {
        return res.status(401).json({error: 'Unauthenticated'});
    }
    else {
        req.userId = req.params.userId;
        if(req.id != req.userId) {
            return res.status(401).json({error: 'Unauthenticated'});
        }
        next();
    }
}