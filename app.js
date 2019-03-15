const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./models/index');
const app = express();
const paymentRouter = require('./routes/payment');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dataRouter = require('./routes/data');
const passportEngine = require('./module/passport');
const cors = require('cors');
const adminRouter = require('./routes/admin');
const user = require('./module/user');
const formData = require('express-form-data');
const os = require('os');
const compression = require('compression');
const nocache = require('nocache')
const bodyParser = require('body-parser');
require('body-parser-xml-json')(bodyParser);
module.exports.dirname = __dirname;


//run passport
passportEngine.start();
user.createAdmin();

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};

//datebase
connectDB.connect()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(function(req, res, next){
    if (req.is('text/*')) {
        req.text = '';
        req.setEncoding('utf8');
        req.on('data', function(chunk){ req.text += chunk });
        req.on('end', function(){ req.body = JSON.parse(req.text); next() });
    } else {
        next();
    }
});
app.use(bodyParser.json());
app.use(bodyParser.xml());
app.use(express.static(path.join(__dirname, 'aclient')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'admin')));
app.use(cors());
app.use(compression());
app.use(nocache())
// parse data with connect-multiparty.
app.use(formData.parse(options));
// clear from the request and delete all empty files (size == 0)
app.use(formData.format());
// change file objects to stream.Readable
app.use(formData.stream());
// union body and files
app.use(formData.union());
app.set('trust proxy', true)
app.use(/^\/(faq|about|logo|cashboxes|offer|return|delivery|contacts|vacancies|halls|profile|historycinema|historyevent|events|search|hall\/[\s\S]+|event\/[\s\S]+|selectplace\/[\s\S]+|cinema|movie\/[\s\S]+)?/, indexRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/data', dataRouter);
app.use('/payment', paymentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
