const router = require('express').Router();
const {User, loginValidation, registrationValidation} = require('../models/users');
const { Role } = require('../models/roles');
const bcrypt = require('bcryptjs');
const { verify } = require('../middleware/jwt/jwt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
 
    let { error } = registrationValidation(req.body);

    if(error) {

        return res.status(400).send(error.details[0].message);

    }

    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(req.body.password, salt);

    await User.create({
        first_name : req.body.first_name, 
        middle_name : req.body.middle_name,
        last_name : req.body.last_name,
        email : req.body.email,
        phone_number : req.body.phone_number,
        role_id : req.body.role_id,
        status : req.body.status,
        password : hashPwd
    })
    .then(user => res.status(201).json({ message : "User created successfully"}))
    .catch(error => res.status(500).json({ error : error}));

});

router.post('/login', async (req,res) => {

    let { error } = loginValidation(req.body);

    if(error) {

        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ where : { phone_number: req.body.phone_number} });

    if(!user) return res.status(400).send('Phone number does not exsist');

    if (!user.status) {
        return res.status(400).json({message: "User is Inactive in the System"});
    }

    //check if password is correct
    const validPwd = await bcrypt.compare(req.body.password, user.password);

    if(!validPwd) return res.status(400).send('Invalid Password');

    let role_name = await Role.findOne({ where : { id : user.role_id}, attributes : ['name'] });

    //create and assign token
    const token = jwt.sign({id: user.id, phone_number: user.phone_number, email: user.email, role_id: user.role_id, role_name: role_name.name, first_name: user.first_name, last_name: user.last_name}, process.env.SECRET_KEY);
    res.header('Authorization').send(token);

});

router.get('/user', verify, (req, res) => {
    
    if(req.user) {
        return res.status(200).json(req.user);
    } else {
        return res.status(400).json({ error : 'An error occured'});
    }
})

module.exports = router;