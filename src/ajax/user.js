const UserAPI = require('../api/user')
const Crypto = require('keeling-js/lib/crypto')
const Debug = require('keeling-js/lib/debug')

function isValidPassword (pwd) {
  var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return re.test(String(pwd))
}

function isValidEmail (email) {
  var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return re.test(String(email).toLowerCase())
}

module.exports = {

  /**
   * ajax/user?action=login
   * body:
   *   email: string
   *   password: string
   * return:
   *   code: int, 0 is success, !0 is error
   *   msg: string, error message
   *   content: {}
   */
  'login': function (req, res) {
    const { email, password } = req.body
    if (!email || !password) {
      res.error(1, 'Missing email or password')
    } else if (!isValidEmail(email) || !isValidPassword(password)) {
      res.error(10, 'Invalid email or passowrd')
    } else {
      UserAPI.getByEmail(email, (user) => {
        if (Crypto.match(password, user.password)) {
          UserAPI.updateSessionId(user['_id'], (sessionId) => {
            res.cookie('session_id', sessionId, {
              expires: new Date(Date.now() + 900000),
              httpOnly: true
            })
            res.success()
          }, (err) => {
            Debug.error(err)
            res.error(4, 'Unknown error')
          })
        } else {
          res.error(3, 'Incorrect password')
        }
      }, (err) => {
        Debug.error(err)
        res.error(2, 'Cannot find user')
      })
    }
  },
  'change_password': function (req, res) {
    const { username } = res.body
    var currentPassword = req.body['password']
    var newPassword = req.body['new_password']
    var confirmPassword = req.body['confirm_password']
    if (!currentPassword) {
      res.error(3, 'No current password')
    } else if (!newPassword) {
      res.error(4, 'No new password')
    } else if (!confirmPassword) {
      res.error(7, 'No confirm password')
    } else if (newPassword !== confirmPassword) {
      res.error(8, 'confirm password is not same as new password')
    } else if (!isValidPassword(newPassword)) {
      res.error(2, 'Invalid password')
    } else {
      UserAPI.getByUserName(username, (user) => {
        if (!Crypto.match(currentPassword, user.password)) {
          res.error(6, 'Password not match')
        } else if (!isValidPassword(newPassword)) {
          res.error(9, 'Minimum eight characters, at least one letter and one number')
        } else {
          var hashNewPassword = Crypto.genEncrypted(newPassword)
          UserAPI.updatePassword(user['_id'], hashNewPassword, () => {
            res.success()
          }, (err) => {
            Debug.error(err)
            res.error(7, err)
          })
        }
      }, (err) => {
        Debug.error(err)
        res.error(7, err)
      })
    }
  }
  // 'change_password': function (req, res) {
  //   var currentPassword = req.body['password']
  //   var newPassword = req.body['new_password']
  //   var confirmPassword = req.body['confirm_password']
  //   if (req.body['username'] && currentPassword && newPassword && confirmPassword) {
  //     if (newPassword != confirmPassword) {
  //       res.error(8, 'confirm password is not same as new password')
  //     } else {
  //       User.find({ 'username': req.body['username'] }).toArray(function (err, result) {
  //         if (err) {
  //           res.error(1, err)
  //         } else {
  //           if (result.length == 0) {
  //             res.error(5, 'User not found')
  //           } else {
  //             var user = result[0]
  //             if (!Crypto.match(currentPassword, user['password'])) {
  //               res.error(6, 'Password not match')
  //             } else {
  //               if (!isValidPassword(newPassword)) {
  //                 res.error(9, 'Minimum eight characters, at least one letter and one number')
  //               } else {
  //                 var hashNewPassword = Crypto.genEncrypted(newPassword)
  //                 User.update({
  //                   '_id': ObjectId(user['_id'])
  //                 }, {
  //                   '$set': {
  //                     'password': hashNewPassword
  //                   }
  //                 }, function (err, result) {
  //                   if (err) {
  //                     res.error(7, err)
  //                   } else {
  //                     res.success(result)
  //                   }
  //                 })
  //               }
  //             }
  //           }
  //         }
  //       })
  //     }
  //   } else if (!req.body['username']) {
  //     res.error(2, 'No username')
  //   } else if (!currentPassword) {
  //     res.error(3, 'No current password')
  //   } else if (!newPassword) {
  //     res.error(4, 'No new password')
  //   } else if (!confirmPassword) {
  //     res.error(7, 'No confirm password')
  //   }
  // },
  // 'register': function (req, res) {
  //   var username = req.body['username']
  //   var email = req.body['email']
  //   var password = req.body['password']
  //   if (username && email && password) {
  //     if (!isValidEmail(email)) {
  //       res.error(5, 'email invalid')
  //     } else if (!isValidPassword(password)) {
  //       res.error(6, 'Minimum eight characters, at least one letter and one number')
  //     } else {
  //       User.find({ 'username': username }).toArray(function (err, result) {
  //         if (err) {
  //           res.error(1, err)
  //         } else {
  //           if (result.length != 0) {
  //             res.error(7, 'Username has been used')
  //           } else {
  //             User.find({ 'email': email }).toArray(function (err, result) {
  //               if (err) {
  //                 res.error(1, err)
  //               } else {
  //                 if (result.length != 0) {
  //                   res.error(8, 'Email has been used')
  //                 } else {
  //                   User.insertOne({
  //                     'username': username,
  //                     'email': email,
  //                     'password': Crypto.genEncrypted(password)
  //                   }, function (err, response) {
  //                     if (err) {
  //                       res.error(1, err)
  //                     } else {
  //                       res.success(response.ops[0])
  //                     }
  //                   })
  //                 }
  //               }
  //             })
  //           }
  //         }
  //       })
  //     }
  //   } else if (!username) {
  //     res.error(2, 'No username')
  //   } else if (!email) {
  //     res.error(3, 'No email')
  //   } else if (!password) {
  //     res.error(4, 'No password')
  //   }
  // }
}
