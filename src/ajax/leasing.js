const LeasingAPI = require('../api/leasing')
// const UserAPI = require('../api/user')
const Debug = require('keeling-js/lib/debug')

module.exports = {
  'fetchall': (req, res, next) => {
    LeasingAPI.fetchAll((result) => {
      res.send(result)
    }, (error) => {
      res.send(error)
    })
  },
  'insert': (req, res) => {
    var data = req.body

    const {
      apt_bedroom_amount = 1,
      apt_bathroom_amount = 1,
      gender_req = 1,
      start_date = 1,
      end_date = 1,
      user_id = 1,
      room_avail = [{ price: 111 }, { price: 111 }],
      user_description = 1,
      facility = 1,
      notice = 1,
      location = 1,
      status = 1,
      img_url = 1,
      complex_id = 1
    } = data

    data = {
      ...data,
      apt_bedroom_amount,
      apt_bathroom_amount,
      gender_req,
      start_date,
      end_date,
      user_id,
      room_avail,
      user_description,
      facility,
      notice,
      location,
      status,
      img_url,
      complex_id
    }
    // if (data.apt_bedroom_amoun &&
    //     data.apt_bathroom_amount &&
    //     data.gender_req &&
    //     data.start_date &&
    //     data.end_date &&
    //     data.user_id &&
    //     data.room_avail) {
      LeasingAPI.insert(data,
        (data) => {
          res.success(data)
        },
        (err) => {
          Debug.error(err)
        })
    // } else {
    //   Debug.error('Missing fields')
    // }
  }
  /**
   * ajax/leasing?action=fetchall
   * body:
   *   leasing_id: string
   *   field: string
   *   value: any
   * cookies:
   *   session_id: string
   */

  // 'search': (req, res) => {
  //   var criteria = {}

  //   if (req.body.complexId) {
  //     criteria['complexId'] = req.body.complexId
  //   }

  //   if (req.body.aptBedroomAmount) {
  //     criteria['aptBedroomAmount'] = req.body.aptBedroomAmount
  //   }

  //   if (req.body.aptBathroomAmount) {
  //     criteria['aptBathroomAmount'] = req.body.aptBathroomAmount
  //   }

  //   if (req.body.startDate) {
  //     criteria['startDate'] = req.body.startDate
  //   }

  //   if (req.body.endDate) {
  //     criteria['endDate'] = req.body.endDate
  //   }

  //   if (req.body.genderReq) {
  //     criteria['genderReq'] = req.body.genderReq
  //   }

  //   if (req.body.facility) {
  //     criteria['facility'] = req.body.facility
  //   }

  //   if (req.body.roomAvail) {
  //     criteria['roomAvail'] = req.body.roomAvail
  //   }

  //   LeasingAPI.findByCriteria(criteria, (leasings) => {
  //     res.success(leasings)
  //   }, (err) => {
  //     console.error(err)
  //     res.error(3, 'not found')
  //   })
  // },

  /**
   * ajax/leasing?action=update
   * body:
   *   leasing_id: string
   *   field: string
   *   value: any
   * cookies:
   *   session_id: string
   */
  // 'update': (req, res) => {
  //   const { field, value } = req.body
  //   const criteria = { [field]: value }
  // }
}
