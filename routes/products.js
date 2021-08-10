const router = require ('express').Router();
const { Product } = require('../models/products');

router.get('/products', async (req, res) => {

    await Product.findAndCountAll()
    .then(products => res.status(200).json({ items : products}))
    .catch(error => res.status(500).json({ error: error}))
});

module.exports = router;