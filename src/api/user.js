const Mongo = require('keeling-js/lib/mongo')
const ObjectId = require('mongodb').ObjectId
const User = Mongo.db.collection('user')

module.exports = {

  get (userId, callback, error) {
    User.findOne({
      '_id': userId
    }).toArray(function (err, result) {
      if (err) {
        error(err)
      } else {
        if (result.length === 0) {
          error(new Error(`No user with id ${userId}`))
        } else {
          callback(result[0])
        }
      }
    })
  },

  getByEmail (email, callback, error) {
    User.findOne({
      'email': email
    }).toArray(function (err, result) {
      if (err) {
        error(err)
      } else {
        if (result.length === 0) {
          error(new Error(`No user with email ${email}`))
        } else {
          callback(result[0])
        }
      }
    })
  },

  checkUserNameExist (username, callback, error) {
    User.findOne({
      'username': username
    }).toArray(function (err, result) {
      if (err) {
        error(err)
      } else {
        callback(result.length)
      }
    })
  },

  checkEmailExist (email, callback, error) {
    User.findOne({
      'email': email
    }).toArray(function (err, result) {
      if (err) {
        error(err)
      } else {
        callback(result.length)
      }
    })
  },

  getByUserName (username, callback, error) {
    User.findOne({
      'username': username
    }).toArray(function (err, result) {
      if (err) {
        error(err)
      } else {
        if (result.length === 0) {
          error(new Error(`No user with username ${username}`))
        } else {
          callback(result[0])
        }
      }
    })
  },

  updateSessionId (userId, callback, error) {
    const sessionId = ObjectId()
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
  },

  updatePassword (userId, hashNewPassword, callback, error) {
    User.updateOne({
      '_id': userId
    }, {
      $set: {
        'password': hashNewPassword
      }
    }, (err, result) => {
      if (err) {
        error(new Error('No password changed'))
      } else {
        callback(result)
      }
    })
  },

  createUser (username, email, hashNewPassword, callback, error) {
    User.insertOne({
      'username': username,
      'email': email,
      'password': hashNewPassword
    }, function (err, result) {
      if (err) {
        error(new Error('No user has been created'))
      } else {
        callback(result.ops[0])
      }
    })
  },
  getUserBySessionId (sessionId, callback, error) {
    User.findOne({
      'session_id': sessionId
    }).toArray(function (err, result) {
      if (err) {
        error(err)
      } else {
        if (result.length === 0) {
          error(new Error(`No user with sessionId ${sessionId}`))
        } else {
          callback(result[0])
        }
      }
    })
  }
}
