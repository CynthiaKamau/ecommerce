
const router = require ('express').Router();
const { Role, roleValidation } = require('../models/roles');

//get all roles
router.get('/roles', async (req, res) => {

    await Role.findAndCountAll()
    .then(roles => res.json({ data : roles}))
    .catch(error => res.status(500).json({ error: error}) )

});

//get role by name
router.get('/role/:id', async (req,res) => {

    let role = await Role.findOne({ where : { id : req.params.id }});

    if(!role) {
        return res.status(400).send("Role does not exist!");
    }

    await Role.findOne({where : { id : req.params.id }})
    .then( role => res.status(200).json({ data : role}))
    .catch( error => res.status(500).json({ error : error}))

});

//createrole
router.post('/role', async (req,res) => {

    let {error} = roleValidation(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    
    await Role.create({
        name : req.body.name,
        status : req.body.status
    }).then(response => res.status(200).json({ message : 'Role added successfully'}))
    .catch(error => res.status(500).json({ error : error}))
    
});

//update role
router.put('/role/:id', async (req,res) => {

    let role = await Role.findByPk(req.params.id);

    if(!role) {
        return res.status(400).send('The role does not exist!');
    }

    await Role.update({
        name : req.body.name,
        status : req.body.status
    }, { returning : true, where : { id : req.params.id }})
    .then(response => res.status(200).json({ message : 'Role updated successfully'}))
    .catch(error => res.status(500).json({ error : error}))

});

//delete role
router.delete('/role/:id', async (req,res) => {

    let role = await Role.findByPk(req.params.id);

    if(!role) {
        return res.status(400).send('The Role does not exist!');
    }

    role.destroy().then(response => res.status(200).json({ message : 'Role deleted successfully'}))
    .catch(error => res.status(500).json({ error : error}))

});

module.exports = router;