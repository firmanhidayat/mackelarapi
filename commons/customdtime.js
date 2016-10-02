/* 
    File   : customdtime.js
    Name   : Custom Get Moment Timezone    
    Author : Firman Hidayat 
    CDate  : 2016-09-24 10:10:59 PM

*/
var moment = require('moment-timezone');
module.exports.getDateTimeLocal = function() {
	var dtISOString = convertDateToISOString(new Date())
	// console.log(dtISOString);
    var currentMoment = moment.tz(dtISOString,"Asia/Jakarta").utc().format();
    return currentMoment;
};
module.exports.getDateTimeLocal2 = function() {
    var stMySQLFormat = convertDateToISOString(new Date())
    // console.log(stMySQLFormat);
    var currentMoment2 = moment.tz(stMySQLFormat,"Asia/Jakarta").utc().format("YYYY-MM-DD HH:mm:ss");
    return currentMoment2;
    //console.log(currentMoment2);
    // return convertDateToMySQLFormat(currentMoment2);
};
function addZero(x,n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}
function convertDateToISOString(dtPars) {
    //@ReturnValue : YYYY-MM-DDThh:mm:ss.mssZ
    var d = dtPars;
    var Y = addZero(d.getFullYear(),4);
    var M = addZero(d.getMonth()+1, 2);
        var D = addZero(d.getDate(), 2);
    var h = addZero(d.getHours(), 2);
    var m = addZero(d.getMinutes(), 2);
    var s = addZero(d.getSeconds(), 2);
    var ms = addZero(d.getMilliseconds(), 3);
    return Y+"-"+M+"-"+D+"T"+h + ":" + m + ":" + s + "." + ms +"Z";
}
function convertDateToMySQLFormat(dtPars) {
	//@ReturnValue : YYYY-MM-DD hh:mm:ss 
    var d = dtPars;
    var Y = addZero(d.getFullYear(),4);
    var M = addZero(d.getMonth()+1, 2);
		var D = addZero(d.getDate(), 2);
    var h = addZero(d.getHours(), 2);
    var m = addZero(d.getMinutes(), 2);
    var s = addZero(d.getSeconds(), 2);
    return Y+"-"+M+"-"+D + " " + h + ":" + m + ":" + s;
}
