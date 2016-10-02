var express   = require('express');
var router    = express.Router();

var CategoryModel = require('../models/Category');



/* Home Page Index */
/* Routes     = index 
              = index/login
              = index/logout
              = index/dashboard
*/
var title     = "Mackelar API"

router.get('/', function(req, res, next) {
  res.render('index', { title: title });
});

router.get('/category/list',CategoryModel.list);
router.get('/category/:_id',CategoryModel.get);

router.get('/login', function(req, res, next) {
  res.render('login', { title: title + " - Login" });
});

module.exports = router;