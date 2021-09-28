const router = require('express').Router();
const {Op} = require("sequelize");
const { Role, roleValidation} = require("../models/roles")
const { verify } = require('../middleware/jwt/jwt');

//get all roles
router.get('/roles', verify, async (req,res) => {

    await Role.findAndCountAll()
    .then(roles => res.status(200).json({ success: true, message : roles}))
    .catch(error => res.status(500).json({ error : error}))
})

//get role by id
router.get('/role/:id', verify, async (req, res) => {

    await Role.findByPk(req.params.id)
    .then(role => res.status(200).json({ success: true, message : role}))
    .catch(error => res.status(500).json({ error : error}))
})

//get role by name
router.get('/role', verify, async (req, res) => {

    await Role.findOne({ where : { name : { [Op.iLike]: '%' + req.query.name.toLowerCase() + '%' } }})
    .then(role => res.status(200).json({ success: true, message : role}))
    .catch(error => res.status(500).json({ error : error}))
})

//add new role
router.post('/role', verify, async (req, res) => {

    let {error} = roleValidation(req.body);

    if(error) {
        return res.status(500).json({ error : error.details[0].message})
    }

    await Role.create({
        name : req.body.name,
        status : req.body.status
    }).then(response => res.status(200).json({ success: true, message : 'Role added successfully.'}))
    .catch(error => res.status(500).json({ error : error}))

})

//update role
router.put('/role/:id', verify, async (req,res) => {

    let role = await Role.findByPk(req.params.id);

    if(role) {

        await Role.update({
            name : req.body.name,
            status : req.body.status
        }, { returning : true, where : { id : req.params.id }})
        .then(response => res.status(200).json({ success: true, message : 'Role updated successfully! '}))
        .catch(error => res.status(500).json({ error : error}))

    } else {

        return res.status(500).json({ error : "Role does not exist! "})
    }

})

//delete role
router.delete('/role/:id', verify, async (req,res) => {

    let role = await Role.findByPk(req.params.id);

    if(role) {

        role.destroy()
        .then(response => res.status(200).json({ success: true, message : 'Role deleted successfully!' }))
        .catch(error => res.status(400).json({ error : error}))

    } else {
        return res.status(400).json({ error : 'Role does not exist!' })
    }
})

module.exports = router;