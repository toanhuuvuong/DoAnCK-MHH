require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var MongoStore = require('connect-mongo')(session);

var homeRouter = require('./routes/web/home');
var shoesStallRouter = require('./routes/web/shoes-stall')
var singleProductRouter = require('./routes/web/single-product');
var checkoutRouter = require('./routes/web/checkout');
var cartRouter = require('./routes/web/cart');
var confirmationRouter = require('./routes/web/confirmation');
var loginRouter = require('./routes/web/login');
var forgotPasswordRouter = require('./routes/web/forgot-password');
var renewPasswordRouter = require('./routes/web/renew-password');
var registrationRouter = require('./routes/web/registration');
var trackingRouter = require('./routes/web/tracking');
var contactRouter = require('./routes/web/contact');
var updateAccountInfoRouter = require('./routes/web/update-account-info');
var updateAccountPasswordRouter = require('./routes/web/update-account-password');
var searchRouter = require('./routes/web/search');

var adminHomeRouter = require('./routes/admin/home');
var adminAccountListRouter = require('./routes/admin/account-list');
var adminAccountEditRouter = require('./routes/admin/account-edit');
var adminStallListRouter = require('./routes/admin/stall-list');
var adminStallEditRouter = require('./routes/admin/stall-edit');
var adminStallAddRouter = require('./routes/admin/stall-add');
var adminBrandListRouter = require('./routes/admin/brand-list');
var adminBrandEditRouter = require('./routes/admin/brand-edit');
var adminBrandAddRouter = require('./routes/admin/brand-add');
var adminProductListRouter = require('./routes/admin/product-list');
var adminProductEditRouter = require('./routes/admin/product-edit');
var adminProductAddRouter = require('./routes/admin/product-add');
var adminTop10ProductRouter = require('./routes/admin/top-10-product');
var adminTop10ProductOfShopRouter = require('./routes/admin/top-10-product-of-shop');
var adminTop10ProductOfStallRouter = require('./routes/admin/top-10-product-of-stall');
var adminOrderListRouter = require('./routes/admin/order-list');
var adminOrderEditRouter = require('./routes/admin/order-edit');
var adminRevenueRouter = require('./routes/admin/revenue');
var adminRevenueStatisticsRouter = require('./routes/admin/revenue-statistics');
var adminLoginRouter = require('./routes/admin/login');
var adminRegistrationRouter = require('./routes/admin/registration');
var adminUpdateAdminInfoRouter = require('./routes/admin/update-admin-info');

var logoutRouter = require('./routes/logout');

var app = express();

// passport config
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express session
var oneDay = 24 * 60 * 60 * 1000;
app.use(session(
{
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	store: new MongoStore(
	{ 
		url: 'mongodb+srv://toanhuuvuong:'+process.env.CONNECT_PASSWORD+'@toandb-lttzl.azure.mongodb.net/test?retryWrites=true&w=1/' }
	),
	cookie: { maxAge: oneDay, expires: new Date(Date.now() + oneDay) }
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// global variables
app.use(function(req, res, next) 
{
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.discount = req.flash('discount');
	res.locals.session = req.session;
	next();
});

// routers
app.use('/', homeRouter);
app.use('/home.html', homeRouter);
app.use('/shoes-stall.html', shoesStallRouter);
app.use('/single-product.html', singleProductRouter);
app.use('/checkout.html', checkoutRouter);
app.use('/cart.html', cartRouter);
app.use('/confirmation.html', confirmationRouter);
app.use('/login.html', loginRouter);
app.use('/forgot-password.html', forgotPasswordRouter);
app.use('/renew-password.html', renewPasswordRouter);
app.use('/registration.html', registrationRouter);
app.use('/tracking.html', trackingRouter);
app.use('/contact.html', contactRouter);
app.use('/update-account-info.html', updateAccountInfoRouter);
app.use('/update-account-password.html', updateAccountPasswordRouter);
app.use('/search.html', searchRouter);

app.use('/admin-home.html', adminHomeRouter);
app.use('/admin-account-list.html', adminAccountListRouter);
app.use('/admin-account-edit.html', adminAccountEditRouter);
app.use('/admin-stall-list.html', adminStallListRouter);
app.use('/admin-stall-edit.html', adminStallEditRouter);
app.use('/admin-stall-add.html', adminStallAddRouter);
app.use('/admin-brand-list.html', adminBrandListRouter);
app.use('/admin-brand-edit.html', adminBrandEditRouter);
app.use('/admin-brand-add.html', adminBrandAddRouter);
app.use('/admin-product-list.html', adminProductListRouter);
app.use('/admin-product-edit.html', adminProductEditRouter);
app.use('/admin-product-add.html', adminProductAddRouter);
app.use('/admin-top-10-product.html', adminTop10ProductRouter);
app.use('/admin-top-10-product-of-shop.html', adminTop10ProductOfShopRouter);
app.use('/admin-top-10-product-of-stall.html', adminTop10ProductOfStallRouter);
app.use('/admin-order-list.html', adminOrderListRouter);
app.use('/admin-order-edit.html', adminOrderEditRouter);
app.use('/admin-revenue.html', adminRevenueRouter);
app.use('/admin-revenue-statistics.html', adminRevenueStatisticsRouter);
app.use('/admin-login.html', adminLoginRouter);
app.use('/admin-registration.html', adminRegistrationRouter);
app.use('/admin-update-admin-info.html', adminUpdateAdminInfoRouter);

app.use('/logout.html', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
