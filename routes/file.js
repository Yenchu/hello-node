var fs = require('fs');

exports.upload = function(req, res, next) {
    var path = req.params.path;
    console.log('upload path: ' + path);
    path = '/home/andrew/Uploads/' + path;
    var writable = fs.createWriteStream(path);
    req.pipe(writable, {end: false});
    req.on('end', function() {
        console.log('finish writing file to ' + path);
        res.send({'ok':true});
    });
};

