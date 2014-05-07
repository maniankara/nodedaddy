require('./nodedaddy.conf')
var dnode = require('dnode');
var shell = require('shelljs')


// common functions
	function runOnNode(port, cb) {		
		var d = dnode.connect(port);
		d.on('remote', function (remote) {
			cb(remote)
		});	
		d.on('fail', function (fail) {
			console.log('Failed: '+fail)
		})		
		d.on('error', function (error) {
			console.log('Error: '+error)
		})		
	}



if (process.argv[2] !== "server") {

	var slave = dnode({
	    executeShell : function (cmd, cb) {
	    	console.log('Executing request from server: '+ cmd)
	    	shell.exec(cmd, function (exit_code, output) {
	    		cb(exit_code, output)
	    	})
	    },
	    respondHeartBeat : function (log) {
	    	console.log(log)
	    }

	});
	console.log('Slave listening on ' + SLAVE_PORT)
	slave.listen(SLAVE_PORT);	
} else {
// I am the master here
	// definitions for functions within (slave, internals)


	function heartBeat() {
		console.log('Checking Heartbeat...')
		runOnNode(SLAVE_PORT, function(remote){
			try {
				remote.respondHeartBeat('Live')	
			} catch (e) {
				console.log('Slave ' + SLAVE_PORT + ' not reachable')
			}
			
		})
		setTimeout(heartBeat, 10000); // repeat at 10 seconds intervals
	}
	var server = dnode({
	    shell_cmd : function (cmd) {
	    	console.log('Executing request from user: '+ cmd)
	    	runOnNode(SLAVE_PORT, function(remote){
		    	remote.executeShell(cmd, function (exit_code, output) {
		        	console.log('Exit code' + exit_code)
		        	console.log('Output' + output)
		    	});	    		
	    	})
	    }
	});


	// definitions for functions called from externals

	function slaves_list() {

	}

	console.log('Server started on ' + SERVER_PORT)
	server.listen(SERVER_PORT)
	heartBeat();
}


