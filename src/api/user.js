const Mongo = require('keeling-js/lib/mongo')
const User = Mongo.db.collection('user')
const ObjectId = require('mongodb').ObjectId

function isValidPassword (pwd) {
  var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return re.test(String(pwd))
}

function isValidEmail (email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

module.exports = {
  // TODO: emmmmmmmmmm
  // so many need to do
}
