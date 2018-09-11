const user = require('./user');


/**
 * if the user token exists user obj set to res.user 
 * @param {string[]} roles 
 * @param {string} redirectTo 
 * @param {function} getToken 
 */
function authRequiered(roles, redirectTo, getToken = false) {

  return function auth(req, res, next) {
    let token = '';
    if(getToken) {
      token = getToken(req, res);
    }
    token = req.body.token;
    
    let authUser = user.getUserByToken(token);
    if(
      !authUser ||
      !roles.includes(authUser.role)
    ) {
      if(redirectTo) {
        res.redirect(redirectTo);
      } else {
        res.status(403);
        res.send('Forbitten');
      }
      return;
    }

    res.user = authUser;

    next();
  }
}

module.exports = authRequiered;