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
    const data = req.body
    if (data.apt_bedroom_amoun &&
        data.apt_bathroom_amount &&
        data.gender_req &&
        data.start_date &&
        data.end_date &&
        data.user_id &&
        data.room_avail) {
      LeasingAPI.insert(data,
        (data) => {
          res.success(data)
        },
        (err) => {
          Debug.error(err)
        })
    } else {
      Debug.error('Missing fields')
    }
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
