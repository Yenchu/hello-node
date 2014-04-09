var http = require('http')
    , path = require('path')
    , express = require('express')
    , hbs = require('express-hbs')
    , mongoose = require('mongoose')
    , logger = require('./logger')
    , routes = require('./routes')
    , auth = require('./routes/auth')
    , user = require('./routes/user')
    , file = require('./routes/file');

var log = logger.getLogger(__filename);

var app = express();
app.configure(function() {
    app.set('port', process.env.PORT || 3000);

    app.engine('html', hbs.express3({
        defaultLayout: __dirname + '/views/layouts/baseLayout.html',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    }));
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    
    app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.favicon()); 
    app.use(express.compress());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});
app.configure('development', function() {
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});
app.configure('production', function() {
    app.use(errorHandler);
    function errorHandler(err, req, res, next) {
    	log.error(err.stack);
        res.send(500, {error:err});
    }
});

//as a preprocessor for demo
app.all('*', function(req, res, next) {
    var token = req.get('x-auth-token');
    log.debug('reqPath=' + req.path + ' token=' + token);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});
app.get('/', routes.index);
app.post('/login', auth.login);
app.get('/users', user.list);
app.get('/users/:id', user.get);
app.put('/users/:id', user.update);
app.post('/users', user.create);
app.delete('/users/:id', user.remove);
app.post('/upload/:path', file.upload);
app.all('*', function(req, res) {
    res.end("404 - Page Not Found!");
});

var mongodbUrl = 'mongodb://localhost:27017/mydb';
mongoose.connect(mongodbUrl, function (err, res) {
    if (err) {
    	log.error('Error connecting to ' + mongodbUrl + ': ' + err);
    } else {
    	log.info('Succeeded connected to ' + mongodbUrl);
    }
});

http.createServer(app).listen(app.get('port'), function() {
    log.info('NodeJS server listening on port ' + app.get('port'));
});
