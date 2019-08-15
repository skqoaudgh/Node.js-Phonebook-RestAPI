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
    },

    createUser: async (req, res, next) => {
        try {
            if(!req.body.id || !req.body.password || !req.body.id.trim() || !req.body.password.trim() || !req.body.nickname) {
                return res.status(400).json({error: 'Unexpected JSON input'});
            }

            if(req.body.id.trim().length < 4) {
                return res.status(403).json({error: 'ID is too short'});
            }
            if(req.body.id.trim().length > 20) {
                return res.status(403).json({error: 'ID is too long'});
            }

            if(req.body.nickname.length < 4) {
                return res.status(403).json({error: 'Nickname is too short'});
            }
            if(req.body.nickname.length > 20) {
                return res.status(403).json({error: 'Nickname is too long'});
            }

            if(req.body.password.trim().length < 4) {
                return res.status(403).json({error: 'Password is too short'});
            }
            if(req.body.password.trim().length > 20) {
                return res.status(403).json({error: 'Password is too long'});
            }

            const searchedUser = await User.find({$or: [{ID: req.body.id}, {Nickname: req.body.nickname}]});
            if(searchedUser.length) {
                return res.status(409).json({error: 'ID or Nickname is already exist'});
            }

            const inputUser = new User({
                ID: req.body.id.trim(),
                Password: req.body.password.trim(),
                Nickname: req.body.nickname,
                Comment: req.body.comment
            });
            const savedUser = await inputUser.save();
            if(inputUser == savedUser) {
                return res.status(200).json(savedUser);
            }
            else {
                return res.status(204).json({error: 'Not expected value is found'});
            }
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});
        }
    },

    getUserById: async (req, res, next) => {
        try {
            if(!req.isAuth) {
                return res.status(401).json({error: 'Unauthenticated'});
            }

            const id = req.params.id;
            const user = await User.findOne({ID: id});
            if(user) {
                return res.status(200).json(user);
            }
            else {
                return res.status(404).json({error: 'No user to serve'});
            }
        }
        catch(err) {
            console.error(err);         
            return res.status(500).json({error: 'Internal server error'});
        }
    },

    getUserByNickname: async (req, res, next) => {
        try {
            if(!req.isAuth) {
                return res.status(401).json({error: 'Unauthenticated'});
            }

            const nickname = req.params.nickname;
            const user = await User.findOne({Nickname: nickname});
            if(user) {
                return res.status(200).json(user);
            }
            else {
                return res.status(404).json({error: 'No user to serve'});
            }
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});   
        }
    },

    getUserExceptionHandler: (req, res, next) => {
        return res.status(400).json({error: 'URI format is not available'});
    },

    getUsers: async (req, res, next) => {
        try {
            if(!req.isAuth) {
                return res.status(401).json({error: 'Unauthenticated'});
            }
            
            const users = await User.find();
            if(users) {
                return res.status(200).json(users);
            }
            else {
                return res.status(404).json({error: 'No users to serve'});
            }
        }
        catch(err) {
            console.error(err);     
            return res.status(500).json({error: 'Internal server error'});  
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            if(!req.isAuth) {
                return res.status(401).json({error: 'Unauthenticated'});
            }

            const id = req.params.id;
            const user = await User.findOne({ID: id});
            if(user) {
                const searchedUser = await User.find({
                    $and: [
                        { $or: [{ID: req.body.id}, {Nickname: req.body.nickname}] },
                        { _id: {$ne: user._id} }
                    ]});
                if(searchedUser.length) {
                    return res.status(409).json({error: 'ID or Nickname is already exist'});
                }

                if(req.body.password && req.body.password.trim())
                    user.Password = req.body.password.trim();
                if(req.body.nickname)
                    user.Nickname = req.body.nickname;
                if(req.body.comment)
                    user.Comment = req.body.comment;

                try {
                    const updatedUser = await user.save();
                    return res.status(200).json(updatedUser);
                }
                catch(err) {
                    console.error(err);
                    return res.status(500).json({error: 'Internal server error'});                  
                }
            }
            else {
                return res.status(404).json({error: 'No user to update'});
            }
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});
        }
    },

    updateUserByNickname: async (req, res, next) => {
        try {
            if(!req.isAuth) {
                return res.status(401).json({error: 'Unauthenticated'});
            }

            const nickname = req.params.nickname;
            const user = await User.findOne({Nickname: nickname});
            if(user) {
                const searchedUser = await User.find({
                    $and: [
                        { $or: [{ID: req.body.id}, {Nickname: req.body.nickname}] },
                        { _id: {$ne: user._id} }
                    ]});
                if(searchedUser.length) {
                    return res.status(409).json({error: 'ID or Nickname is already exist'});
                }

                user.Password = req.body.password.trim();
                user.Nickname = req.body.nickname;
                user.Comment = req.body.comment;

                try {
                    const updatedUser = await user.save();
                    return res.status(200).json(updatedUser);
                }
                catch(err) {
                    console.error(err);
                    return res.status(500).json({error: 'Internal server error'});                  
                }
            }
            else {
                return res.status(404).json({error: 'No user to update'});
            }
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            if(!req.isAuth) {
                return res.status(401).json({error: 'Unauthenticated'});
            }

            const id = req.params.id;
            const deletedUser = await User.findOneAndDelete({ID: id});
            if(deletedUser) {
                return res.status(404).json(deletedUser);
            }
            else {
                return res.status(404).json({error: 'No user to delete'});
            }
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});           
        }
    },

    deleteUserByNickname: async (req, res, next) => {
        try {
            if(!req.isAuth) {
                return res.status(401).json({error: 'Unauthenticated'});
            }

            const nickname = req.params.nickname;
            const deletedUser = await User.findOneAndDelete({Nickname: nickname});
            if(deletedUser) {
                return res.status(404).json(deletedUser);
            }
            else {
                return res.status(404).json({error: 'No user to delete'});
            }
        }
        catch(err) {
            console.error(err);
            return res.status(500).json({error: 'Internal server error'});           
        }
    },
}