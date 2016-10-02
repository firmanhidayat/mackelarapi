var DB             = require('../commons/config').DB;
var DTTimeZone     = require('../commons/customdtime');
var Product        = require('./Product').model;

module.exports.model = Category = DB.Model.extend({
   tableName: 'Category', 
   idAttribute: 'id', 
   uuid: true,
   products: function() {
    return this.hasMany(Product,'Product','CategoryID');
   }
});

module.exports.list = function(req, res){
	new Category().fetchAll()
	.then(function(category){
		res.json({Category: category});
	})
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
};

module.exports.get = function(req, res){
	var _id = req.params._id;
	new Category({id: _id}).fetch()
  	.then(function(category){
  		// console.log(category.get("CategoryName"));
      console.log("Products : " + JSON.stringify(category.related('products')));
  		res.json({Category: category});
  	})
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
};

module.exports.add = function(req, res){
	var objectBody  = req.body;
	var objectToAdd = Category.forge({
		CategoryName: objectBody.CategoryName,
		CategoryDescription: objectBody.CategoryDescription,
		DT_Created: DTTimeZone.getDateTimeLocal2(),
		WH_Created: "admin"
	});
	objectToAdd.save()
    .then(function(category){
		  res.json({Category: category});
	  })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
};

module.exports.edit = function(req, res){
	var _id = req.params._id
	var objectBody  = req.body;
  Category
  	.where('id', _id)
  	.fetch()
  	.then(function(category){
  		category.save({
  			CategoryName: objectBody.CategoryName || category.get('CategoryName'),
  			CategoryDescription: objectBody.CategoryDescription || category.get('CategoryDescription'),
  			DT_Created: category.get('DT_Created'),
				WH_Created: category.get('WH_Created'),
  			DT_Modified: DTTimeZone.getDateTimeLocal2(),
  			WH_Modified: "admin"
  		})
  		.then(function () {
      	res.json({error: false, data: {message: 'Category details updated'}});
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
  	.then(function(category){
  		category.destroy()
  		.then(function () {
      	res.json({error: false, data: {message: 'Category deleted'}});
    	})
    	.catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
  	})
};