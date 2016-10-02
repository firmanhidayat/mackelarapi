var express   = require('express');
var router    = express.Router();

var CategoryModel = require('../models/Category');

/* Category Index */
/* Routes     = category 
              = category/list
              = category/:_id
              = category/add
              = category/edit/:_id
*/
var title     = "Mackelar API - Category"

router.get('/', function(req, res, next) {
  res.render('category', { title: title });
});

router.get('/list',CategoryModel.list);
router.get('/:_id',CategoryModel.get);
router.post('/add',CategoryModel.add);
router.put('/edit/:_id',CategoryModel.edit);
router.delete('/delete/:_id',CategoryModel.delete);

module.exports = router;