const router = require('express').Router();
const {Op} = require("sequelize");
const { PaymentMethod, paymentMethodValidation} = require("../models/payment_methods")
const { verify } = require('../middleware/jwt/jwt');

//get all payment methods
router.get('/payment-methods', verify, async (req,res) => {

    try {
        let methods = await PaymentMethod.findAndCountAll()
        res.json({ success: true, message: methods})
    } catch (error) {
        res.status(500).json({ success: false, error : error})
    }
})

//get payment methods by id
router.get('/payment-method/:id', verify, async (req, res) => {

    try {
        let method = await PaymentMethod.findByPk(req.params.id)
        res.json({ success: true, message: method})
    } catch (error) {
        res.status(500).json({ success: false, error : error})  
    }
})

//get payment methods by name
router.post('/payment-method', verify, async (req, res) => {

    try {
        let method = await PaymentMethod.findOne({ where : { name : { [Op.iLike]: '%' + req.query.name.toLowerCase() + '%' } }})
        res.json({ success: true, message: method})
    } catch (error) {
        res.status(500).json({ success: false, error : error})
    }
})

//add new payment methods
router.post('/payment-method', verify, async (req, res) => {

    let {error} = paymentMethodValidation(req.body);

    if(error) {
        return res.status(500).json({ success: false, error : error.details[0].message})
    }

    try {

        let method = await PaymentMethod.create({
            name : req.body.name,
            status : req.body.status})
        res.status(201).json({ success: true,
            message: 'Payment method added successfully.',
            paymentMethod : method
        })
    } catch (error) {
        res.status(500).json({ success: false,error : error})
    }

})

//update payment methods
router.put('/payment-method/:id', verify, async (req,res) => {

    let role = await PaymentMethod.findByPk(req.params.id);

    if(role) {

        try {

            let method = await PaymentMethod.update({
                name : req.body.name,
                status : req.body.status
            }, { returning : true, plain: true, where : { id : req.params.id }})
            res.json({ success: true,
                message: 'Payment method updated successfully! ',
                paymentMethod: method[1]})
            
        } catch (error) {
            res.status(500).json({ success: false, error : error})
        }

    } else {

        return res.status(500).json({ success: false, error : "Payment method does not exist! "})
    }

})

//delete payment method
router.delete('/payment-method/:id', verify, async (req,res) => {

    let method = await PaymentMethod.findByPk(req.params.id);

    if(method) {

        method.destroy()
        .then(response => res.status(200).json({ success: true, message: 'Payment method deleted successfully!' }))
        .catch(error => res.status(400).json({ success: false, error : error}))

    } else {
        return res.status(400).json({ success: false, error : 'Payment method does not exist!' })
    }
})

module.exports = router;