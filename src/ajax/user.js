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
      UserAPI.getByEmail(email, (err) => {
        Debug.error(err)
        res.error(2, 'Cannot find user')
      }, (user) => {
        if (Crypto.match(password, user.password)) {
          res.success(user)
        } else {
          res.error(3, 'Incorrect password')
        }
      })
    }
  },
  'change_password': function (req, res) {
    var username = req.body['username']
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
            res.success(user)
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
  },
  'register': function (req, res) {
    var username = req.body['username']
    var email = req.body['email']
    var password = req.body['password']
    var confirmPassword = req.body['confirm_password']
    if (!username) {
      res.error(2, 'No username')
    } else if (!email) {
      res.error(3, 'No email')
    } else if (!password) {
      res.error(4, 'No password')
    } else if (!isValidEmail(email)) {
      res.error(5, 'email invalid')
    } else if (!isValidPassword(password)) {
      res.error(6, 'Minimum eight characters, at least one letter and one number')
    } else if (password !== confirmPassword) {
      res.error(7, 'password does not match')
    } else {
      UserAPI.checkUserNameExist(username, (usernameNum) => {
        if (usernameNum !== 0) {
          res.error(7, 'Username has been used')
        } else {
          UserAPI.checkEmailExist(email, (emailNum) => {
            if (emailNum !== 0) {
              res.error(8, 'Email has been used')
            } else {
              UserAPI.createUser(username, email, Crypto.genEncrypted(password), (user) => {
                res.success(user)
              }, (err) => {
                Debug.error(err)
              })
            }
          }, (err) => {
            Debug.error(err)
          })
        }
      }, (err) => {
        Debug.error(err)
      })
    }
  }
}
