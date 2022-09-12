const { User } = require('../models');

const bcrypt = require('bcrypt')

const { signToken } = require('../utils/auth')


module.exports = {
    getUsers(req, res) {
        User.find()
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    getUserById(req, res) {
        console.log(req.params.id)
        User.findOne({ _id: req.params.id })
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(user).send(user)
        })
        .catch((err) => res.status(500).json(err));
    },

    async signUp(req, res) {
        
        const usedEmail = await User.findOne({ email: req.body.email })
            
        if (usedEmail) {
            res.status(404).json({ message: 'Email currently in use' });
            return;
        } else {

            User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }).then((user) => {
                user.save()
                res.status(200).json({ message: user.password})
            })
        }
    },

    async login(req, res) {
        try{
            const user = await User.findOne({ email: req.body.email })
        console.log(user)
        if(!user) {
            res.status(404).json({ message:'No user found with this email'})
            return;
        }
        const correctPw = await user.isCorrectPassword(req.body.password);
            
            
            if(!correctPw) {
                res.status(401).json({ message: 'Incorrect password or email'})
            } else {
                console.log('correct pw')
            }

            const token = signToken(user);

            res.status(200).send(token)
        } catch{ 
            (err) => res.send(err)
        }
        
    },

    getStatic(req, res) {
        // const newUser = User({
        //     username: 'bingy',
        //     email: 'bigboi@gaymail.com',
        //     password: "eebly"
        // });

        // const user = newUser.save();

        // res.send(user)

        User.create({
            username: 'bingy',
            email: 'bigboi@gaymail.com',
            password: "eebly"
        }).then((user) => {
            user.save();
            res.send(user)
        }).catch((err) => res.status(500).json(err))

    }
}