const LeasingAPI = require('../api/leasing')

module.exports = {

    'search': (res, req) => {

      var criteria = {}

      if(req.body.complexId) {
          criteria['complexId'] = req.body.complexId;
      }

      if(req.body.aptBedroomAmount) {
          criteria['aptBedroomAmount'] = req.body.aptBedroomAmount;
      }

      if(req.body.aptBathroomAmount) {
          criteria['aptBathroomAmount'] = req.body.aptBathroomAmount;
      }

      if(req.body.startDate) {
          criteria['startDate'] = req.body.startDate;
      }

      if(req.body.endDate) {
          criteria['endDate'] = req.body.endDate;
      }

      if(req.body.genderReq) {
          criteria['genderReq'] = req.body.genderReq;
      }

      if(req.body.facility) {
          criteria['facility'] = req.body.facility;
      }

      if(req.body.roomAvail) {
          criteria['roomAvail'] = req.body.roomAvail;
      }

      LeasingAPI.findByCriteria(criteria, (leasings) => {
        res.success(leasings);
      }, (err) => {
        res.error(1, "not found");
      })
    }

    /**
     * ajax/leasing?action=update
     * body:
     *   leasing_id: string
     *   field: string
     *   value: any
     * cookies:
     *   session_id: string
     */
    'update': (req, res) => {

          const { field, value } = req.body;
          const criteria = { [field]: value };

    }
}
