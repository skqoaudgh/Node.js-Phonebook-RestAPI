const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

module.exports = {

    createUser: async (req, res, next) => {
        try {
            if(!req.body.id || !req.body.password || !req.body.id.trim() || !req.body.password.trim() || !req.body.nickname) {
                return res.status(400).json({error: {
                    "status": 400,
                    "error": 'InvalidJsonNodeValue',
                    "message": 'The value provided for the JSON nodes in the request body was not in the correct format.'
                }});
            }

            const searchedUser = await User.find({$or: [{ID: req.body.id}, {Nickname: req.body.nickname}]});
            if(searchedUser && searchedUser.length > 0) {
                return res.status(409).json({error: {
                    "status": 409,
                    "error": 'AccountAlreadyExists',
                    "message": 'The specified account or nickname already exists.'
                }});
            }

            const hashedPassword = await bcrypt.hashSync(req.body.password);
            const inputUser = new User({
                ID: req.body.id.trim(),
                Password: hashedPassword,
                Nickname: req.body.nickname,
                Comment: req.body.comment
            });
            const savedUser = await inputUser.save();
            res.status(201).json(savedUser);
        }
        catch(err) {
            console.error(err);
            res.status(500).json({error: {
                "status": 500,
                "error": 'InternalError',
                "message": 'The server encountered an internal error. Please retry the request.'
            }}); 
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const users = await User.find().select('-Password');
            if(users && users.length == 0) {
                return res.status(404).json({error: {
                    "status": 404,
                    "error": 'UserNotFound',
                    "message": 'The user does not exist.'
                }});
            }

            res.status(200).json(users);
        }
        catch(err) {
            console.error(err);     
            res.status(500).json({error: {
                "status": 500,
                "error": 'InternalError',
                "message": 'The server encountered an internal error. Please retry the request.'
            }}); 
        }
    },

    getUser: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.userId).select('-Password');
            if(!user) {
                return res.status(404).json({error: {
                    "status": 404,
                    "error": 'UserNotFound',
                    "message": 'The user does not exist.'
                }});
            }

            res.status(200).json(user);
        }
        catch(err) {
            console.error(err);     
            return res.status(500).json({error: {
                "status": 500,
                "error": 'InternalError',
                "message": 'The server encountered an internal error. Please retry the request.'
            }});            
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.userId);
            if(!user) {
                return res.status(404).json({error: {
                    "status": 404,
                    "error": 'UserNotFound',
                    "message": 'The user does not exist.'
                }});
            }

            const searchedUser = await User.find({
                $and: [
                    { $or: [{ID: req.body.id}, {Nickname: req.body.nickname}] },
                    { _id: {$ne: user._id} }
                ]});
            if(searchedUser && searchedUser.length > 0) {
                return res.status(409).json({error: {
                    "status": 409,
                    "error": 'AccountAlreadyExists',
                    "message": 'The specified account or nickname already exists.'
                }});
            }

            const hashedPassword = await bcrypt.hashSync(req.body.password);
            if(req.body.password && req.body.password.trim())
                user.Password = hashedPassword;
            if(req.body.nickname)
                user.Nickname = req.body.nickname;
            if(req.body.comment)
                user.Comment = req.body.comment;

            try {
                const updatedUser = await user.save();
                res.status(200).json(updatedUser);
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
        catch(err) {
            console.error(err);
            res.status(500).json({error: {
                "status": 500,
                "error": 'InternalError',
                "message": 'The server encountered an internal error. Please retry the request.'
            }}); 
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const deletedUser = await User.findOneAndDelete({_id: req.params.userId}).select('-Password');
            if(!deletedUser) {
                return res.status(404).json({error: {
                    "status": 404,
                    "error": 'UserNotFound',
                    "message": 'The user does not exist.'
                }});
            }

            res.status(404).json(deletedUser);
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