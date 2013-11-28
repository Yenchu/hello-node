var express = require('express')
    , hbs = require('express-hbs')
    , http = require('http')
    , path = require('path')
    , routes = require('./routes')
    , user = require('./routes/user')
    , mongoose = require('mongoose');

var app = express();
app.configure(function(){
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
        console.error(err.stack);
        res.send(500, {error:err});
    }
});

app.get('/', routes.index);
app.get('/users', user.find);
app.get('/users/:id', user.get);
app.put('/users/:id', user.update);
app.post('/users', user.create);
app.delete('/users/:id', user.remove);
app.all('*', function(req, res) {
    res.end("404 - Page Not Found!");
});

var mongodbUrl = 'mongodb://localhost:27017/mydb';
mongoose.connect(mongodbUrl, function (err, res) {
    if (err) { 
        console.log ('Error connecting to ' + mongodbUrl + ': ' + err);
    } else {
        console.log ('Succeeded connected to ' + mongodbUrl);
    }
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('NodeJS server listening on port ' + app.get('port'));
});
