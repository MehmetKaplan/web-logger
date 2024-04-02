// server-parameters.js
module.exports = {
	httpsKeys: {
		keyPath: process.env.TLS_KEYPATH, // modify this if https is to be used
		certPath: process.env.TLS_CERTPATH, // modify this if https is to be used
	},
	port: process.env.WEB_LOGGER_PORT || 3000
}
