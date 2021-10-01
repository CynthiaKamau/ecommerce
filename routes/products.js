const router = require ('express').Router();
const { Product, productValidation } = require('../models/products');
const { ProductCategory } = require('../models/product_category');
const { verify } = require('../middleware/jwt/jwt');

//get all products
router.get('/products', verify, async (req, res) => {

    try {
        let products = await Product.findAndCountAll({ limit : 100 })
        res.json({ success: true, data : products});
    } catch (error) {
        res.status(500).json({ success: false, error: error});
    }
    
});

//create new product
router.post('/product', verify, async (req,res) => {

    let { error } = productValidation(req.body);

    if(error) {
        return res.status(400).json({ success: false, error: error.details[0].message});
    }

    try {
        let product = await Product.create({
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
        res.status(201).json({ success: true,
            message : 'Product created successfuly',
            product: product})
        
    } catch (error) {
        res.status(500).json({ success: false, error : error})
    }
    
});

// //get product by id
router.get('/products/:id', verify, async (req,res) => {

    let product = await Product.findOne({ where : {id : req.params.id}} );

    if(!product) {
        return res.status(400).json({ success: false, error: "The product does not exist!"});
    }  
    
    try {
        let product =   await Product.findOne({ where : {id : req.params.id}} )
        res.json({ success: true, data : product})  
    } catch (error) {
        res.status(400).json({ success: false, error : error})
    }

});

// //get product by id
router.post('/products/collection', verify, async (req,res) => {

    try {

        let product = await Product.findAndCountAll({ 
            include: [{ model: ProductCategory,
                required : true,
                where : { name : { [Op.iLike]: '%' + req.query.name.toLowerCase() + '%' } }
            }]
        })
        res.json({ success: true, data : product})
        
    } catch (error) {
        res.status(400).json({ success: false, error : error})
    }

});

//get product by name
router.post('/product', verify, async (req,res) => {

    let product = await Product.findOne({ where : { name : { [Op.iLike]: '%' + req.query.name.toLowerCase() + '%' }}})


    if(!product) {
        return res.status(400).json({ success: false, error: "The product does not exist!"});
    }

    try {

        let product = await Product.findOne({ where : {name : req.params.name}} )
        res.json({ success: true, data : product})
        
    } catch (error) {
        res.status(400).json({ success: false, error : error}) 
    }
    
});

//update product
router.put('/product/:id', verify, async (req,res) => {

    let { error } = productValidation(req.body);

    if(error) {
        return res.status(400).json({ success: false, error :error.details[0].message});
    }

    let product = await Product.findByPk(req.params.id);

    if(!product) {
        return res.status(400).json({ success: false, error :'The product does not exist!'});
    }

    try {
        let product = await Product.update({
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
    
        }, { returning : true, plain: true, where : {id : req.params.id}} )
        res.json({ success: true,
                   message : 'Product updated successfuly',
                   product: product[1]})
    } catch (error) {
        res.status(500).json({ success: false, error : error})
    }

});

//delete product
router.delete('/product/:id', verify, async (req,res) => {

    let product = await Product.findByPk(req.params.id);

    if(!product) {
        return res.status(400).json({ success: false, error :"The product does not exist!"});
    }

    product.destroy().then(response => res.status(200).json({ success: true, message : 'Product deleted successfully'}))
    .catch(error => res.status(500).json({ success: false, error : error}) )
 
});

module.exports = router;