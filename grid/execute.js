require('./nodedaddy.conf')
var dnode = require('dnode');

var d = dnode.connect(SERVER_PORT);
d.on('remote', function (remote) {
    remote.shell_cmd('ls')
    d.end();
});