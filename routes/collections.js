
const router = require ('express').Router();
const { ProductCategory, categoryValidation } = require('../models/product_category');
const { verify } = require('../middleware/jwt/jwt');

//get all collections
router.get('/collections', verify, async (req, res) => {

    await ProductCategory.findAndCountAll()
    .then(collections => res.json({ data : collections}))
    .catch(error => res.status(500).json({ error: error}) )

});

//get collection by name
router.get('/collection', verify, async (req,res) => {

    let collection = await ProductCategory.findOne({ where : { name : req.query.name}});

    if(!collection) {
        return res.status(400).send("Collection does not exist!");
    }

    await ProductCategory.findOne({where : { name : req.query.name}})
    .then( collection => res.status(200).json({ data : collection}))
    .catch( error => res.status(500).json({ error : error}))

});

//createcollection
router.post('/collection', verify, async (req,res) => {

    let {error} = categoryValidation(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    
    await ProductCategory.create({
        name : req.body.name,
        description : req.body.description,
        status : req.body.status
    }).then(response => res.status(200).json({ message : 'Collection added successfully'}))
    .catch(error => res.status(500).json({ error : error}))
    
});

//update collection
router.put('/collection/:id', verify, async (req,res) => {

    let collection = await ProductCategory.findByPk(req.params.id);

    if(!collection) {
        return res.status(400).send('The collection does not exist!');
    }

    await ProductCategory.update({
        name : req.body.name,
        description : req.body.description,
        status : req.body.status
    }, { returning : true, where : { id : req.params.id }})
    .then(response => res.status(200).json({ message : 'Collection updated successfully'}))
    .catch(error => res.status(500).json({ error : error}))

});

//delete collection
router.delete('/collection/:id', verify, async (req,res) => {

    let collection = await ProductCategory.findByPk(req.params.id);

    if(!collection) {
        return res.status(400).send('The collection does not exist!');
    }

    collection.destroy().then(response => res.status(200).json({ message : 'Collection deleted successfully'}))
    .catch(error => res.status(500).json({ error : error}))

});

module.exports = router;