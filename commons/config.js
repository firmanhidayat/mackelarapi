/* 

		File   : config.js
    Name   : Bookshelf included knex ORM, connection settings   
    Author : Firman Hidayat 
    CDate  : 2016-09-24 11:10:59 PM

*/
var knexConfig = require('knex')({
  client: 'mysql',
  connection: {
  	host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'mackelar',
    charset: 'UTF8_GENERAL_CI'
  },
  pool: { min: 0, max: 2 }
});
var DB = require('bookshelf')(knexConfig);
DB.plugin(require('bookshelf-uuid'));
DB.plugin('registry');
module.exports.DB = DB;