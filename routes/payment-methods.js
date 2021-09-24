const router = require('express').Router();
const {Op} = require("sequelize");
const { PaymentMethod, paymentMethodValidation} = require("../models/payment_methods")

//get all payment methods
router.get('/payment-methods', async (req,res) => {

    await PaymentMethod.findAndCountAll()
    .then(response => res.status(200).json({ success: true, message: response}))
    .catch(error => res.status(500).json({ error : error}))
})

//get payment methods by id
router.get('/payment-method/:id', async (req, res) => {

    await PaymentMethod.findByPk(req.params.id)
    .then(response => res.status(200).json({ success: true, message: response}))
    .catch(error => res.status(500).json({ error : error}))
})

//get payment methods by name
router.get('/payment-method', async (req, res) => {

    await PaymentMethod.findOne({ where : { name : { [Op.iLike]: '%' + req.query.name.toLowerCase() + '%' } }})
    .then(response => res.status(200).json({ success: true, message: response}))
    .catch(error => res.status(500).json({ error : error}))
})

//add new payment methods
router.post('/payment-method', async (req, res) => {

    let {error} = paymentMethodValidation(req.body);

    if(error) {
        return res.status(500).json({ error : error.details[0].message})
    }

    await PaymentMethod.create({
        name : req.body.name,
        status : req.body.status
    }).then(response => res.status(200).json({ success: true, message: 'Payment method added successfully.'}))
    .catch(error => res.status(500).json({ error : error}))

})

//update payment methods
router.put('/payment-method/:id', async (req,res) => {

    let role = await PaymentMethod.findByPk(req.params.id);

    if(role) {

        await PaymentMethod.update({
            name : req.body.name,
            status : req.body.status
        }, { returning : true, where : { id : req.params.id }})
        .then(response => res.status(200).json({ success: true, message: 'Payment method updated successfully! '}))
        .catch(error => res.status(500).json({ error : error}))

    } else {

        return res.status(500).json({ error : "Payment method does not exist! "})
    }

})

//delete payment method
router.delete('/payment-method/:id', async (req,res) => {

    let method = await PaymentMethod.findByPk(req.params.id);

    if(method) {

        method.destroy()
        .then(response => res.status(200).json({ success: true, message: 'Payment method deleted successfully!' }))
        .catch(error => res.status(400).json({ error : error}))

    } else {
        return res.status(400).json({ error : 'Payment method does not exist!' })
    }
})

module.exports = router;