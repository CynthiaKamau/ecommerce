const router = require('express').Router();
const { UserAddress, userAddressValidation } = require("../models/user_address")
const { Op } = require('sequelize');
const { verify } = require('../middleware/jwt/jwt');

//get all user addresses
router.post('/user-addresses', verify, async (req,res) => {

    try {
        let address = await UserAddress.findAndCountAll({ where : {user_id : req.body.user_id}})
        res.json({ success: true, message: address})
    } catch (error) {
        res.status(500).json({ success: false, error : error})
    }
})

//create new address method
router.post('/user-address', verify, async (req,res) => {

    let { error} = userAddressValidation(req.body);

    if(error) {
        return res.status(400).json({ success: false, error : error.details[0].message})
    }

    try {

        let addesss = await UserAddress.create({
            user_id : req.body.user_id,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            name: req.body.name,
            default: req.body.default
        })
        res.status(201).json({ success: true, message: 'User address created successfully', addesss : addesss})
        
    } catch (error) {
        res.status(500).json({ success: false, error: error}) 
    }
 
})

//update address from what already exists
//pass id of previous address method
router.put('/user-address/:id', verify, async (req,res) => {

    let user_address = await UserAddress.findByPk(req.params.id);

    if(!user_address) {
        return res.status(400).json({ success: false, error : 'User address does not exist!' })
    }

    try {

        let address = await UserAddress.update({
            user_id : req.body.user_id,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            name: req.body.name,
            default: req.body.default
        }, { returning: true, plain : true, where: { [Op.and] : [{id: req.params.id}, {user_id: req.body.user_id}] }})
        res.json({ success: true, message: 'User address updated successfully', address: address[1]})
        
    } catch (error) {
        res.status(500).json({ success: false, error: error})
    }
})

//pass id of user address to delete
router.delete('/user-address/:id', verify, async (req,res) => {

    let user_address = await UserAddress.findByPk(req.params.id);

    if(!user_address) {
        return res.status(400).json({ success: false, error : 'User address does not exist!' })
    }

    user_address.destroy().then(response => res.status(200).json({ success: true, message : 'User addesss deleted successfully' }))
    .catch(error => res.status(500).json({ success: false, error : error}))

})

module.exports = router;