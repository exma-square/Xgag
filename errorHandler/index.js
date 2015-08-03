module.exports = function(app) {

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('common/error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('common/error', {
      message: err.message,
      error: {}
    });
  });
};