const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            if(!req.body.id || !req.body.password || !req.body.id.trim() || !req.body.password.trim()) {
                return res.status(400).json({error: {
                    "status": 400,
                    "error": 'InvalidJsonNodeValue',
                    "message": 'The value provided for the JSON nodes in the request body was not in the correct format.'
                }});
            }

            const id = req.body.id;
            const pw = req.body.password;
            const user = await User.findOne({ID: id});
            if(!user) {
                return res.status(404).json({error: {
                    "status": 404,
                    "error": 'UserNotFound',
                    "message": 'The user does not exist.'
                }});
            }
            
            if(!await bcrypt.compareSync(pw, user.Password)) {
                return res.status(401).json({error: {
                    "status": 401,
                    "error": 'Unauthorized',
                    "message": 'The ID and password you provided for the JSON nodes in the request body did not match.'
                }});
            }

            const token = jwt.sign({
                id: user._id
            },
            'BaeMyunghoCadaWord',{
                expiresIn: '1h'
            });
                res.status(200).json({token: token});
        }
        catch(err) {
            console.error(err);
            res.status(500).json({error: {
                "status": 500,
                "error": 'InternalError',
                "message": 'The server encountered an internal error. Please retry the request.'
            }});           
        }
    }
}