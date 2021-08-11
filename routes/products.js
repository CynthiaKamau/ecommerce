const router = require ('express').Router();
const { Product, productValidation } = require('../models/products');
const { ProductCategory } = require('../models/product_category');

//get all products
router.get('/products', async (req, res) => {

    await Product.findAndCountAll({ limit : 100 })
    .then(products => res.status(200).json({ data : products}))
    .catch(error => res.status(500).json({ error: error}))
});

//create new product
router.post('/product', async (req,res) => {

    let { error } = productValidation(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    await Product.create({
        SKU : req.body.SKU,
        name : req.body.name,
        description : req.body.description,
        unit_price : req.body.unit_price,
        discount_id : req.body.discount_id,
        size : req.body.size,
        color : req.body.color,
        weight : req.body.weight,
        category_id : req.body.category_id,
        stock_id : req.body.stock_id,
        status : req.body.status

    })
    .then(product => res.status(201).json({ message : 'Product created successfuly'}))
    .catch(error => res.status(500).json({ error : error}) )

});

// //get product by id
router.get('/products/:id', async (req,res) => {

    let product = await Product.findOne({ where : {id : req.params.id}} );

    if(!product) {
        return res.status(400).send("The product does not exist!");
    }    

    await Product.findOne({ where : {id : req.params.id}} )
    .then(product => res.status(200).json({ data : product}) )
    .catch(error => res.status(400).json({error : error}))

});

// //get product by id
router.get('/products/collection/:name', async (req,res) => {

    await Product.findAndCountAll({ 
        include: [{ model: ProductCategory,
            required : true,
            where : {name : req.params.name }
        }]
    })
    .then(product => res.status(200).json({ data : product}) )
    .catch(error => res.status(400).json({error : error}))

});

//get product by name
router.get('/product/:name', async (req,res) => {

    let product = await Product.findOne({ where : {name : req.params.name}} );

    if(!product) {
        return res.status(400).send("The product does not exist!");
    }

    await Product.findOne({ where : {name : req.params.name}} )
    .then(product => res.status(200).json({ data : product}) )
    .catch(error => res.status(400).json({error : error}))
    
});

//update product
router.put('/product/:id', async (req,res) => {

    let { error } = productValidation(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let product = await Product.findByPk(req.params.id);

    if(!product) {
        return res.status(400).send('The product does not exist!');
    }

    await Product.update({
        SKU : req.body.SKU,
        name : req.body.name,
        description : req.body.description,
        unit_price : req.body.unit_price,
        discount_id : req.body.discount_id,
        size : req.body.size,
        color : req.body.color,
        weight : req.body.weight,
        category_id : req.body.category_id,
        stock_id : req.body.stock_id,
        status : req.body.status

    }, { returning : true, where : {id : req.params.id}} )
    .then(product => res.status(200).json({ message : 'Product updated successfuly'}))
    .catch(error => res.status(500).json({ error : error}) )

});

//delete product
router.delete('/product/:id', async (req,res) => {

    let product = await Product.findByPk(req.params.id);

    if(!product) {
        return res.status(400).send("The product does not exist!");
    }

    product.destroy().then(response => res.status(200).json({ message : 'Product deleted successfully'}))
    .catch(error => res.status(500).json({error : error}) )
 
});

module.exports = router;