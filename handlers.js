const tickLog = require('tick-log');

const webLogger = (body) => {
	const webLogFormat = body?.webLogFormat || 'JSON';
	if (webLogFormat === 'JSON') {
		tickLog.info(`${Date()}${body?.webLogHeader ? ` - \x1b[0;34m${body.webLogHeader}\x1b[0m` : ''}: ${JSON.stringify(body)}`);
	}
	if (webLogFormat === 'PRETTY-JSON') {
		tickLog.info(`${Date()}${body?.webLogHeader ? ` - \x1b[0;34m${body.webLogHeader}\x1b[0m` : ''}`);
		tickLog.info(`\t${JSON.stringify(body, null, 2)}`);
	}
	if (webLogFormat === 'INDENTED-TEXT') {
		tickLog.info(`\t${Date()}`);
		tickLog.info(`\t\t${body?.webLogHeader ? `\x1b[0;31m${body.webLogHeader}\x1b[0m` : ''}`);
		for (const key in body) {
			tickLog.info(`\t\t\t${key}: \x1b[1;33m${body[key]}\x1b[0m`);
		}
	}
}

module.exports = {
	webLogger
}
