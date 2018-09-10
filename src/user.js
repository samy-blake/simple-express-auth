const fs = require('fs');

const config = require('./config');

/**
 * return the user list, or false if no userFile Exsits
 * @param {any} username 
 */
function getUser(username = false) {
  const userFile = fs.readFileSync(config.userFilePath);
  if(!userFile) {
    return false;
  }

  let result = false;
  try {
    result = JSON.parse(userFile);
    
    if(username) {
      result = result[username];
    }
  } catch(e) {
    console.error(e);
    result = false;
  }

  return result;
}

/**
 * add a new user or overwrite existing user data 
 * @param {any} data 
 * @param {'new' | 'update'} type 
 */
function addUser(data, type = 'new') {
  let fileData = getUser(path);
  if(!fileData) {
    fileData = {};
  }

  if(fileData[data.username] && type === 'new') {
    return false;
  }
  fileData[data.username] = data;

  fs.writeFileSync(config.userFilePath, JSON.stringify(fileData));
}

function addToken(username, token) {
  let user = getUser(username);
  user.token = token;
  addUser(user, 'update');
}

function getToken(username) {
  let user = getUser(username);
  return user.token || false;
}

function getUserByToken(token) {
  const userList = getUser();
  if(!userList) {
    console.error('no user file!!');
    return false;
  }
  for(let user of userList) {
    if(user.token && user.token === token) {
      return user;
    }
  }

  return false;
}


module.exports = {
  get: getUser,
  set: addUser,
  setToken: addToken,
  getToken: getToken,
  getUserByToken: getUserByToken
}