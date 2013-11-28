var User = require('../models/user.js');

exports.find = function(req, res, next) {
    console.log('find users.');
    User.find(findUsers);
    function findUsers(err, users) {
        if (err) {
            console.error('got error: ' + err);
            return next(err);
        }
        res.json(users);
    }
};

exports.get = function(req, res, next) {
    var id = req.params.id;
    console.log('find user: ' + id);
    User.findById(id, findUser);
    function findUser(err, user) {
        if (err) {
            console.error('got error: ' + err);
            return next(err);
        }
        res.json(user);
    }
};

exports.create = function(req, res, next) {
    var name = req.body.name;
    var age = req.body.age;
    console.log('create user ' + name);
    var user = new User({name:name, age:age});
    user.save(saveUser);
    function saveUser(err, user, numberAffected) {
        if (err) {
            console.error('got error: ' + err);
            return next(err);
        }
        res.json(user);
    }
};

exports.update = function(req, res, next) {
    var id = req.params.id;
    var name = req.body.name;
    var age = req.body.age;
    console.log('update user ' + name + ': ' + id);
    User.update({_id:id}, {name:name, age:age}, updateUser);
    function updateUser(err, user, numberAffected) {
        if (err) {
            console.error('got error: ' + err);
            return next(err);
        }
        res.json(user);
    }
};

exports.remove = function(req, res, next) {
    var id = req.params.id;
    console.log('remove user: ' + id);
    User.remove({_id:id}, removeUser);
    function removeUser(err) {
        if (err) {
            console.error('got error: ' + err);
            return next(err);
        }
        res.send(200);
    }
};
