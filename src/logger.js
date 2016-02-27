
var fs = require('fs');


/**
 * Simple logging system.
 * @param {String} logfile Path to log file.
 */
var Logger = function (logfile) {

	var stream = fs.createWriteStream(logfile, {

	});

	stream.on('error', function (err) {
		throw 'Surly logger error: ' + err;
	});
};

Logger.prototype.write = function (msg) {
	stream.write(msg + '\n', 'utf8');
};

module.exports = Logger;
