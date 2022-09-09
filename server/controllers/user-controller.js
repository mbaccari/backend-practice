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
            const salt = await bcrypt.genSalt(3)
            const hashedPass = await bcrypt.hash(req.body.password, salt)

            const newUser = User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPass
            });
            
            const send = newUser.save();
            res.status(200).json(send)
        }
    },

    async login(req, res) {
        const user = await User.findOne({ email: req.body.email })
        if(!user) {
            res.status(404).json({ message:'No user found with this email'})
            return;
        }
        console.log(req.body.password)
        console.log(user.password)
        console.log(await user.isCorrectPassword(req.body.password))

        // User.findOne({ email: req.body.email })
        // .select('.__v')
        // .then((user) => {
        //     if (!user) {
        //         res.status(404).json({ message: 'No user found with this id' });
        //         return;
        //     }
        //     user.isCorrectPassword(req.body.password)
        //     console.log(correctPw)
        // }).catch((err) => res.status(500).send(err))
            
            
        //     if(!correctPw) {
        //         res.status(401).json({ message: 'Incorrect password or email'})
        //     }

        //     const token = signToken(user);

        //     res.send(token)

        //     req.session.token = token;
            
        //     return res.status(200).send(user);
        // })
        // .catch((err) => res.status(500).json(err));
        res.status(400).json({ message: 'ooga'})
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