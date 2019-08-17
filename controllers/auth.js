const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            if(!req.body.id || !req.body.password || !req.body.id.trim() || !req.body.password.trim()) {
                return res.status(400).json({error: 'Unexpected JSON input'});
            }

            const id = req.body.id;
            const pw = req.body.password;
            const user = await User.findOne({ID: id});
            if(user) {
                if(pw == user.Password) {
                    const token = jwt.sign({
                        id: user._id
                    },
                    'BaeMyunghoCadaWord',{
                        expiresIn: '1h'
                    });

                    return res.status(200).json({token: token});
                }
                else {
                    return res.status(401).json({error: 'Password is incorrect'});
                }
            }
            else {
                return res.status(404).json({error: 'No user data to get key'});
            }
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});           
        }
    }
}