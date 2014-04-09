var request = require('request')
    , qs = require('querystring')
    , logger = require('../logger');

var log = logger.getLogger(__filename);

exports.login = function(req, res, next) {
	var domain = req.body.domain;
    var username = req.body.username;
    var password = req.body.password;
    log.debug('login: ' + username + ':' + password + '@' + domain);
    
    var auth = {
        auth: {
            identity: {
            	methods: ['password'],
            	password: {
            		user: {
            			domain: {name: domain},
            			name: username,
            			password: password
            		}
            	}
            },
            scope: {
            	project: {
            		domain: {name: domain},
            		name: username
            	}
            }
        }
    };
    var authJson = JSON.stringify(auth);
    
    var requestOptions = {
        url: 'http://127.0.0.1:35357/v3/auth/tokens',
	    headers: {'content-type': 'application/json'},
	    body: authJson
	};
    
    function responseHandler(reqErr, reqRes, reqBody) {
    	if (reqErr) {
            log.error('got error: ' + reqErr);
            return next(reqErr);
        }
    	
    	var statusCode = reqRes.statusCode;
    	log.debug('statusCode: ' + statusCode);
    	var tokenJson = JSON.parse(reqBody);
    	if (statusCode < 300) {
	    	var tokenId = reqRes.headers['x-subject-token'];
	    	log.debug('tokenId: ' + tokenId);
	    	tokenJson['tokenId'] = tokenId;
    	}
        res.json(statusCode, tokenJson);
    }
    
    request.post(requestOptions, responseHandler);
};