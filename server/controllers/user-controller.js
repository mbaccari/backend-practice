const { User } = require('../models');

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const { signToken } = require('../utils/auth')


module.exports = {
    getUsers(req, res) {
        User.find()
        .then((user) => res.send(user))
        .catch((err) => res.status(500).json(err));
    },

    getUserById(req, res) {
        console.log(req.params.id)
        User.findOne({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                res.status(404);
                return;
            }
            res.json(user).send(user)
        })
        .catch((err) => res.status(500));
    },

    async signUp(req, res) {
        
        const usedEmail = await User.findOne({ email: req.body.email })
            
        if (usedEmail) {
            res.status(404).json({ message: 'Email currently in use' });
            return;
        } else {
            try{
                User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                }).then((user) => {
                    user.save()
                    const token = signToken(user);
                    res.send(token)
                }).catch((e) => {
                    res.send('aaaaa')
                })
            }
            catch{
                (err) => {
                    res.send(err)
                }
            }
            
        }
    },

    async login(req, res) {
        console.log(req.body)
        try{
            const user = await User.findOne({ email: req.body.email })
            if(!user) {
                res.send('No user found with this email')
            }
            const correctPw = await user.isCorrectPassword(req.body.password);
            if(!correctPw) {
                res.send('Incorrect password or email')
            }
            const token = signToken(user);
            console.log('ooo')
            res.send(token)
        } 
        catch{ 
            (err) => {
                console.log('oooooooo')
                res.send(err)
            }
        }
    },

    editUser(req, res) {
        console.log(req.body);
        User.updateOne(
            { _id: req.body.id },
            {$set: {[req.body.edit]: req.body.payload}}
        ).then((user) => {
            console.log(`new user ${req.body.edit}`)
            res.send('hello')
        }).catch ((err) => res.status(500).json(err))
    }

    
}