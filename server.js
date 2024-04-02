const path = require('path');

const tes = require('tamed-express-server');

const {httpsKeys, port} = require('./server-parameters.js');


const startServer = async () => {
	// httpsKeys, p_port, handlerFile, functionsWhitelist, testFunctionsWhitelist
	let whitelist =['webLogger'];
	tes.expressServer(undefined, port, '/home/ubuntu/web-logger/handlers.js', whitelist, undefined);
}

startServer();