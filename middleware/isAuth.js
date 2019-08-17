module.exports = (req, res, next) => {
    if(!req.isAuth) {
        return res.status(401).json({error: 'Unauthenticated'});
    }
    else {
        req.userId = req.params.userId;
        next();
    }
}