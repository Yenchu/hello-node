var logger = require('../logger')
    , User = require('../models/user.js');

var log = logger.getLogger(__filename);

exports.list = function(req, res, next) {
	log.debug('list users.');
    User.find(findUsers);
    function findUsers(err, users) {
        if (err) {
        	log.error('got error: ' + err);
            return next(err);
        }
        var isGrid = req.query.grid;
        if (isGrid) {
        	res.json({'records': users});
        } else {
        	res.json(users);
        }
    }
};

exports.get = function(req, res, next) {
    var id = req.params.id;
    log.debug('get user: ' + id);
    User.findById(id, findUser);
    function findUser(err, user) {
        if (err) {
        	log.error('got error: ' + err);
            return next(err);
        }
        res.json(user);
    }
};

exports.create = function(req, res, next) {
    var name = req.body.name;
    var age = req.body.age;
    log.debug('create user ' + name);
    var user = new User({name:name, age:age});
    user.save(saveUser);
    function saveUser(err, user, numberAffected) {
        if (err) {
        	log.error('got error: ' + err);
            return next(err);
        }
        res.json(user);
    }
};

exports.update = function(req, res, next) {
    var id = req.params.id;
    var name = req.body.name;
    var age = req.body.age;
    log.debug('update user ' + name + ': ' + id);
    User.update({_id:id}, {name:name, age:age}, updateUser);
    function updateUser(err, user, numberAffected) {
        if (err) {
        	log.error('got error: ' + err);
            return next(err);
        }
        res.json(user);
    }
};

exports.remove = function(req, res, next) {
    var id = req.params.id;
    log.debug('remove user: ' + id);
    User.remove({_id:id}, removeUser);
    function removeUser(err) {
        if (err) {
        	log.error('got error: ' + err);
            return next(err);
        }
        res.send(200);
    }
};
