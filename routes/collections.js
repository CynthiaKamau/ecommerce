
const router = require ('express').Router();
const { ProductCategory, categoryValidation } = require('../models/product_category');
const { verify } = require('../middleware/jwt/jwt');

//get all collections
router.get('/collections', verify, async (req, res) => {

    try {
      let collections = await ProductCategory.findAndCountAll()
      res.json({ success: true, data : collections}) 
    } catch (error) {
        res.status(500).json({ success: false, error: error})
    }
});

//get collection by name
router.post('/collection', verify, async (req,res) => {

    let collection = await ProductCategory.findOne({ where : { name : req.query.name}});

    if(!collection) {
        return res.status(400).json({ success: false, message : "Collection does not exist!"});
    }

    try {
        let collection = await ProductCategory.findOne({ where : { name : { [Op.iLike]: '%' + req.query.name.toLowerCase() + '%' }}})
        res.json({ success : true, data : collection})
    } catch (error) {
        res.status(500).json({ success: false, error : error})
    }
});

//createcollection
router.post('/collection', verify, async (req,res) => {

    let {error} = categoryValidation(req.body);

    if(error) {
        return res.status(400).json({ success : false , error :error.details[0].message});
    }

    try {
        let category = await ProductCategory.create({
            name : req.body.name,
            description : req.body.description,
            status : req.body.status
        })

        res.status(200).json({ success: true,
            message : 'Collection added successfully',
            category: category});
    } catch (error) {
        res.status(500).json({ success: false, error : error})
    }
        
});

//update collection
router.put('/collection/:id', verify, async (req,res) => {

    let collection = await ProductCategory.findByPk(req.params.id);

    if(!collection) {
        return res.status(400).json({ success: false, error :'The collection does not exist!'});
    }

    try {

        let collection = await ProductCategory.update({
            name : req.body.name,
            description : req.body.description,
            status : req.body.status
        }, { returning : true, plain: true, where : { id : req.params.id }})
        res.json({ success: true,
            message : 'Collection updated successfully',
            collection: collection[1] 
        })
    } catch (error) {
        res.status(500).json({ success: false, error : error}) 
    }

});

//delete collection
router.delete('/collection/:id', verify, async (req,res) => {

    let collection = await ProductCategory.findByPk(req.params.id);

    if(!collection) {
        return res.status(400).json({ success: false, error :'The collection does not exist!'});
    }

    collection.destroy().then(response => res.status(200).json({ success: true, message : 'Collection deleted successfully'}))
    .catch(error => res.status(500).json({ success: false, error : error}))

});

module.exports = router;