var bunyan = require('bunyan')
    , bsyslog = require('bunyan-syslog');

var logger = bunyan.createLogger({
    name: 'manage_portal',
    src: true,
    streams: [
        {
            level: process.env.LOG_LEVEL || 'info',
            type: 'raw',
            stream: bsyslog.createBunyanStream({
                type: 'sys',
                facility: bsyslog.local0,
                host: '127.0.0.1',
                port: 514
            })
        },
        {
            level: 'debug',
            stream: process.stdout,
        }
    ]
});

exports.getLogger = function(name) {
	return logger.child({component: name});
};
