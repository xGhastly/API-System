exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user
  next();
};

exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }
  next()
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash('errors', 'Você precisa fazer login')
    req.session.save( () => res.redirect('/login'))
    return;
  }

  next()
}

exports.requireRoleAdmin = (req,res,next) => {
  if (!req.session.user.role == 'admin') {
    req.flash('errors', 'Você não tem permissão para acessar esta página');
    req.session.save(() => res.redirect('back'));
    return
  }
  next()
}

exports.requireRoleManager = (req,res,next) => {
  if (!req.session.user.role == 'manager' || !req.session.user.role == 'admin') {
    req.flash('errors', 'Você não tem permissão para acessar esta página');
    req.session.save(() => res.redirect('back'));
    return
  }
  next()
}
