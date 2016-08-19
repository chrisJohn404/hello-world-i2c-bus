console.log('Hello World!');

var async = require('async'),
  i2c = require('i2c-bus'),
  i2c1;
 
// var atl_sci_ph_addr = 0x48,
var atl_sci_ph_addr = 0x63,
  CMD_ACCESS_CONFIG = 0xac,
  CMD_READ_TEMP = 0xaa,
  CMD_START_CONVERT = 0xee;

var commands = {
	// 'deviceInformation': '1?l,PH,1.0\0',
	// 'deviceInformation': '1?l,PH,1.0\0',
	'deviceInformation': {
		'cmd': 'I',
		'delay': 300,
	}
}
// Get data!
function startApp() {
	var curDevInfoCmd = undefined;
	var curDevInfoVal = undefined;
	var curDevInfoDelay = 0;

  async.series([
    function (cb) {
      i2c1 = i2c.open(1, cb);
    },
    function (cb) {
      devInfoCmd = commands.deviceInformation.cmd;
      devInfoVal = devInfoCmd.charCodeAt(0);

      curDevInfoCmd = devInfoCmd;
			curDevInfoVal = devInfoVal;
			curDevInfoDelay = commands.deviceInformation.delay;
    //   // var cmdBuffer = new Buffer(devInfoCmd);
    //   // i2c1.writeI2cBlock(atl_sci_ph_addr,)
    //   // Enter one shot mode (this is a non volatile setting) 
    //   // i2c1.writeByte(atl_sci_ph_addr, devInfoVal, 0x01, cb);
      i2c1.sendByte(atl_sci_ph_addr, devInfoVal, cb);
    },
    function(cb) {
    	setTimeout(cb, curDevInfoDelay);
    },
    function (cb) {
    	var readBuffer = new Buffer(32);
    	var devInfoCmd = commands.deviceInformation;
      var devInfoVal = devInfoCmd.charCodeAt(0);
      // i2c1.readI2cBlock(atl_sci_ph_addr, devInfoVal,10, readBuffer, function(data) {
      	i2c1.i2cRead(atl_sci_ph_addr, 32, readBuffer, function(data) {
      		console.log('I am here!!', readBuffer.toString('ascii', 1));
	      	// var bufLen = readBuffer.length;
	      	// for(var i = 0; i < bufLen; i++) {
	      	// 	var charVal = readBuffer.read
	      	// }
	      	cb();
      });
    },
    function (cb) {
      i2c1.close(cb);
    }
  ], function (err) {
    if (err) throw err;
  });
}

startApp();