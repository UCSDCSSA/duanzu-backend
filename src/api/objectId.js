const ObjectId = require('mongodb').ObjectId

module.exports = function (id) {
  if (typeof id === 'string') {
    return ObjectId(id)
  } else {
    return id
  }
}
