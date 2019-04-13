const Mongo = require('keeling-js/lib/mongo')
const User = Mongo.db.collection('user')
const ObjectId = require('./objectId')

function isValidEmail (email) {
  var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return re.test(String(email).toLowerCase())
}

function getUserBySessionId (sessionId, callback, error) {
  User.find({
    'session_id': sessionId
  }).toArray((err, result) => {
    if (err) {
      error(err.code, { msg: err.errmsg })
    } else {
      if (result.length === 0) {
        error(1, { msg: `No user with sessionId ${sessionId}` })
      } else {
        callback(result)
      }
    }
  })
}

function getVisible (user) {
  var visibleInfo = {
    username: user.username,
    email: user.email,
    real_name: user.real_name,
    qr_code: user.qr_code
  }
  return user // TODO should set to visible info later
}

function get (userId, sessionId, callback, error) {
  getUserBySessionId(sessionId, foundUser => {
    if (foundUser['_id'] === ObjectId(userId)) {
      callback(foundUser)
    } else {
      callback(getVisible(foundUser))
    }
  }, foundError => {
    error(foundError)
  })
}

function getByEmail (email, sessionId, callback, error) {
  if (!email || !isValidEmail(email)) {
    error(3, { msg: `Email ${email} is invalid` })
  } else {
    User.find({
      'email': email
    }).toArray((err, result) => {
      if (err) {
        error(err.code, { msg: err.errmsg })
      } else {
        if (result.length === 0) {
          error(1, { msg: `No user with email ${email}` })
        } else {
          callback(getVisible(result))
        }
      }
    })
  }
}

function getByUserName (username, callback, error) {
  User.find({
    'username': username
  }).toArray((err, result) => {
    if (err) {
      error(err.code, { msg: err.errmsg })
    } else {
      if (result.length === 0) {
        error(1, { msg: `No user with username ${username}` })
      } else {
        callback(getVisible(result))
      }
    }
  })
}

function getByRealName (realName, callback, error) {
  User.find({
    'real_name': realName
  }).toArray((err, result) => {
    if (err) {
      error(err.code, { msg: err.errmsg })
    } else {
      if (result.length === 0) {
        error(1, { msg: `No user with Name ${realName}` })
      } else {
        var userList = []
        for (var user in result) {
          userList.push(getVisible(user))
        }
        callback(userList)
      }
    }
  })
}

function checkUserNameExist (username, callback, error) {
  User.find({
    'username': username
  }).toArray((err, result) => {
    if (err) {
      error(err.code, { msg: err.errmsg })
    } else {
      callback(result.length)
    }
  })
}

function checkEmailExist (email, callback, error) {
  if (!isValidEmail(email)) {
    error(3, { msg: `Email ${email} is invalid` })
  } else {
    User.find({
      'email': email
    }).toArray((err, result) => {
      if (err) {
        error(err.code, { msg: err.errmsg })
      } else {
        callback(result.length)
      }
    })
  }
}

function updateSessionId (userId, callback, error) {
  const sessionId = 0 // TODO - need to change session
  User.updateOne({
    '_id': userId
  }, {
    $set: {
      'session_id': sessionId
    }
  }, (err, result) => {
    if (err) {
      error(err)
    } else {
      if (result.result.nModified !== 1) {
        error(new Error('No user updated'))
      } else {
        callback(sessionId)
      }
    }
  })
}

function updatePassword (userId, hashNewPassword, callback, error) {
  User.updateOne({
    '_id': userId
  }, {
    $set: {
      'password': hashNewPassword
    }
  }, (err, result) => {
    if (err) {
      error(4, { msg: 'No password changed' })
    } else {
      callback(result)
    }
  })
}

function createUser (username, email, hashNewPassword, callback, error) {
  User.insertOne({
    'username': username,
    'email': email,
    'password': hashNewPassword
  }, function (err, result) {
    if (err) {
      error(5, { msg: 'No user has been created' })
    } else {
      callback(result.ops[0])
    }
  })
}

module.exports = {
  get,
  getByEmail,
  getByUserName,
  getByRealName,
  checkUserNameExist,
  checkEmailExist,
  updateSessionId,
  updatePassword,
  createUser
}
