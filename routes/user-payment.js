const router = require('express').Router();
const { UserPayment, userPaymentValidation } = require("../models/user_payment")
const { PaymentMethod} = require("../models/payment_methods");
const { Op } = require('sequelize');
const { verify } = require('../middleware/jwt/jwt');

//get all user payments
router.post('/user-payments', verify, async (req,res) => {

    try {
        let payment = await UserPayment.findAndCountAll({ where : {user_id : req.body.user_id}})
        res.json({ success: true, message: payment})
    } catch (error) {
        res.status(500).json({ success: false, error : error})
    }
})

//create payment from what already exists
router.post('/user-payment', verify, async (req,res) => {

    let {error} = userPaymentValidation(req.body);

    if(error) {
        return res.status(400).json({ success: false, error : error.details[0].message})
    }

    let payment_method = PaymentMethod.findByPk(req.body.payment_id);

    if(!payment_method) return res.status(500).json({ success: false, error : 'Payment method does not exist! '})

    try {
        let payment = await UserPayment.create({
            user_id : req.body.user_id,
            payment_id: req.body.payment_id,
            provider: req.body.provider,
            account_no: req.body.account_no,
            expiry: req.body.expiry,
            status: req.body.status
        })
        res.status(201).json({ success: true, message: 'User payment method created successfully', PaymentMethod : payment})
    } catch (error) {
        res.status(500).json({ success: false, error: error})
    }
})

//update payment from what already exists
//pass id of previous payment method
router.put('/user-payment/:id', verify, async (req,res) => {

    let payment_method = PaymentMethod.findByPk(req.body.payment_id);

    if(!payment_method) return res.status(500).json({ success: false, error : 'Payment method does not exist! '})

    try {
        //pass previous payment id in url 
    let payment = await UserPayment.update({
        user_id : req.body.user_id,
        payment_id: req.body.payment_id,
        provider: req.body.provider,
        account_no: req.body.account_number,
        expiry: req.body.expiry,
        status: req.body.status
    }, { returning: true, plain: true, where : { [Op.and] : [{payment_id: req.params.id}, { user_id: req.body.user_id}] }})
    res.status(201).json({ success: true, message: 'User payment method updated successfully', PaymentMethod: payment[1]})
        
    } catch (error) {
       res.status(500).json({ success: false, error: error})
    }
})

//update payment from what already exists
//pass id of user payment method to be deleted
router.delete('/user-payment/:id', verify, async (req,res) => {

    let payment_method = await UserPayment.findByPk(req.params.id);

    if(!payment_method) return res.status(500).json({ error : 'Payment method does not exist! '});

    payment_method.destroy()
    .then(response => res.status(200).json({ success: true, message : 'User payment method deleted successfully.'}))
    .catch(400).json({ error: error})

})

module.exports = router;