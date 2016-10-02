var express   = require('express');
var router    = express.Router();

var ProductModel = require('../models/Product');

/* Product Index */
/* Routes     = product 
              = product/list
              = product/:_id
              = product/add
              = product/edit/:_id
*/
var title     = "Mackelar API - Product"

router.get('/', function(req, res, next) {
  res.render('product', { title: title });
});

router.get('/list',ProductModel.list);
router.get('/:_id',ProductModel.get);
router.post('/add',ProductModel.add);
router.put('/edit/:_id',ProductModel.edit);
router.delete('/delete/:_id',ProductModel.delete);

module.exports = router;