var DB             = require('../commons/config').DB;
var DTTimeZone     = require('../commons/customdtime');
var Category       = require('./Category').model;

module.exports.model = Product = DB.Model.extend({
   tableName: 'Product', 
   idAttribute: 'id', 
   uuid: true,
   category: function(){
   	return this.belongsTo(Category,'Category','CategoryID','id')
   }
});

module.exports.list = function(req, res){
	new Product().fetchAll()
		.then(function(product){
			res.json({Product: product});
		})
		.catch(function (err) {
	    res.status(500).json({error: true, data: {message: err.message}});
	  });
};

module.exports.get = function(req, res){
	var _id = req.params._id;
	new Product({id: _id}).fetch({withRelated: 'category'})
		.then(function(product){
			console.log("Category : " + this.related('category') );
			res.json({Product: product});
		})
		.catch(function (err) {
	    res.status(500).json({error: true, data: {message: err.message}});
	  });
};

module.exports.add = function(req, res){
	var objectBody  = req.body;
	var objectToAdd = Product.forge({
		ProductName: objectBody.ProductName,
		Description: objectBody.Description,
		CategoryID: objectBody.CategoryID,
		DT_Created: DTTimeZone.getDateTimeLocal2(),
		WH_Created: "admin"
	});
	objectToAdd.save()
	  .then(function(product){
		  res.json({Product: product});
	  })
	  .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
};

module.exports.edit = function(req, res){
	var _id = req.params._id
	var objectBody  = req.body;
  Product
  	.where('id', _id)
  	.fetch()
  	.then(function(product){
  		product.save({
  			ProductName: objectBody.ProductName || product.get('ProductName'),
  			Description: objectBody.Description || product.get('Description'),
  			Description: objectBody.CategoryID || product.get('CategoryID'),
  			DT_Created: product.get('DT_Created'),
				WH_Created: product.get('WH_Created'),
  			DT_Modified: DTTimeZone.getDateTimeLocal2(),
  			WH_Modified: "admin"
  		})
  		.then(function () {
      	res.json({error: false, data: {message: 'Product details updated'}});
    	})
    	.catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
  	})
};

module.exports.delete = function(req, res){
	var _id = req.params._id
	Category
  	.forge({ id: _id })
  	.fetch({require: true})
  	.then(function(product){
  		product.destroy()
  		.then(function () {
      	res.json({error: false, data: {message: 'Product deleted'}});
    	})
    	.catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
  	})
};