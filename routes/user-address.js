const router = require('express').Router();
const { UserAddress, userAddressValidation } = require("../models/user_address")
const { Op } = require('sequelize');

//get all user addresses
router.post('/user-addresses', async (req,res) => {

    await UserAddress.findAndCountAll({ where : {user_id : req.body.user_id}})
    .then(response => res.status(200).json({ success: true, message: response}))
    .catch( error => res.status(500).json({ error : error}) )
})

//create new address method
router.post('/user-address', async (req,res) => {

    let { error} = userAddressValidation(req.body);

    if(error) {
        return res.status(400).json({ error : error.details[0].message})
    }

    await UserAddress.create({
        user_id : req.body.user_id,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        name: req.body.name,
        default: req.body.default
    }).then( response => res.status(201).json({ success: true, message: 'User address created successfully'}))
    .catch(error => res.status(500).json({ error: error}) )
})

//update address from what already exists
//pass id of previous address method
router.put('/user-address/:id', async (req,res) => {

    let user_address = await UserAddress.findByPk(req.params.id);

    if(!user_address) {
        return res.status(400).json({ error : 'User address does not exist!' })
    }

    await UserAddress.update({
        user_id : req.body.user_id,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        name: req.body.name,
        default: req.body.default
    }, { returning: true, where: { [Op.and] : [{id: req.params.id}, {user_id: req.body.user_id}] }})
    .then( response => res.status(200).json({ success: true, message: 'User address updated successfully'}))
    .catch(error => res.status(500).json({ error: error}) )
})

//pass id of user address to delete
router.delete('/user-address/:id', async (req,res) => {

    let user_address = await UserAddress.findByPk(req.params.id);

    if(!user_address) {
        return res.status(400).json({ error : 'User address does not exist!' })
    }

    user_address.destroy().then(response => res.status(200).json({ success: true, message : 'User addesss deleted successfully' }))
    .catch(error => res.status(500).json({ error : error}))

})

module.exports = router;