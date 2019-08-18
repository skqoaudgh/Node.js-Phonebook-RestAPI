const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            if(!req.body.id || !req.body.password || !req.body.id.trim() || !req.body.password.trim()) {
                return res.status(400).json({error: 'Invalid JSON format'});
            }

            const id = req.body.id;
            const pw = req.body.password;
            const user = await User.findOne({ID: id});
            if(!user) {
                return res.status(404).json({error: 'No user to serve'});
            }
            
            if(!await bcrypt.compareSync(pw, user.Password)) {
                return res.status(401).json({error: 'Invalid password'});
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
            res.status(500).json({error: 'Internal server error'});           
        }
    }
}