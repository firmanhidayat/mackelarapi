var DB = require('../commons/config').DB;
var DTTimeZone     = require('../commons/customdtime');

var User = DB.Model.extend({
   tableName: 'User',
   idAttribute: 'id', 
   uuid: true 
});

module.exports.list = function(req, res){
	new User().fetchAll()
	.then(function(User){
		res.json({User: User});
	});
};

module.exports.get = function(req, res){
	var _id = req.params._id;
	new User({id: _id}).fetch()
	.then(function(User){
		res.json({User: User});
	});
};