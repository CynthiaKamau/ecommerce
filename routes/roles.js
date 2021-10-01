const router = require('express').Router();
const {Op} = require("sequelize");
const { Role, roleValidation} = require("../models/roles")
const { verify } = require('../middleware/jwt/jwt');

//get all roles
router.get('/roles', verify, async (req,res) => {

    try {
       let roles = await Role.findAndCountAll()
       res.json({ success: true, message : roles})
    } catch (error) {
        res.status(500).json({ success: false, error : error})
    }
})

//get role by id
router.get('/role/:id', verify, async (req, res) => {

    try {
        let role = await Role.findByPk(req.params.id)
        res.json({ success: true, message : role})
    } catch (error) {
        res.status(500).json({ success: false, error : error})
    }
})

//get role by name
router.post('/role', verify, async (req, res) => {

    try {
        let role = await Role.findOne({ where : { name : { [Op.iLike]: '%' + req.query.name.toLowerCase() + '%' } }})
        res.json({ success: true, message : role})
    } catch (error) {
        res.status(500).json({ success: false, error : error})
    }
})

//add new role
router.post('/role', verify, async (req, res) => {

    let {error} = roleValidation(req.body);

    if(error) {
        return res.status(500).json({ success: false, error : error.details[0].message})
    }

    try {
      let role = await Role.create({
        name : req.body.name,
        status : req.body.status
      })
     res.json({ success: true, message : 'Role added successfully.', role: role})
    } catch (error) {
        res.status(500).json({ success: false, error : error})
    }
})

//update role
router.put('/role/:id', verify, async (req,res) => {

    let role = await Role.findByPk(req.params.id);

    if(role) {

        try {
         let role = await Role.update({
            name : req.body.name,
            status : req.body.status
        }, { returning : true, plain:true, where : { id : req.params.id }})
            res.json({ success: true, message : 'Role updated successfully! ', role: role[1]})
        } catch (error) {
            res.status(500).json({ success: false, error : error})
        }

    } else {
        return res.status(500).json({ success: false, error : "Role does not exist! "})
    }

})

//delete role
router.delete('/role/:id', verify, async (req,res) => {

    let role = await Role.findByPk(req.params.id);

    if(role) {

        role.destroy()
        .then(response => res.status(200).json({ success: true, message : 'Role deleted successfully!' }))
        .catch(error => res.status(400).json({ success:false, error : error}))

    } else {
        return res.status(400).json({ success: false, error : 'Role does not exist!' })
    }
})

module.exports = router;