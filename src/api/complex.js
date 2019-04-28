// TODO: Turn APIs into NO RES REQ function calls!

const Mongo = require('keeling-js/lib/mongo')
const ObjectId = require('mongodb').ObjectId
const Complex = Mongo.db.collection('complex')

module.exports = {
  get (complexId, callback, error) {
    console.log(complexId)
    Complex.find({ '_id': ObjectId(complexId) }).toArray((err, result) => {
      if (err) {
        error(err)
      }
      callback(result[0])
      // const leasing = result[0]
      // const { notice, user_id, _id } = leasing
      // callback([{ notice, user_id, _id }])
    })
  }


  // 'insert': function (
  //   userId, complexId, aptBedroomAmount, aptBathroomAmount, callback, error
  // ) {
  //   // TODO: WUT DA FUC IS THIS!!!!
  //   if (Leasing.findOne({ 'user_id': userId, 'complex_id': complexId }, function () {})) {
  //     // If find
  //   } else if (aptBedroomAmount < 0 || aptBathroomAmount < 0) {
  //     error(new Error('room amount invalid'))
  //   } else {
  //     Leasing.insertOne({
  //       'user_id': userId,
  //       'complex_id': complexId,
  //       'apt_bedroom_amount': aptBedroomAmount,
  //       'apt_bathroom_amount': aptBathroomAmount
  //     }, function (err, res) {
  //       if (err) {
  //         error(new Error('Error adding new house ' + userId + ': ' + err))
  //       } else {
  //         callback(res['insertedId'])
  //       }
  //     })
  //   }
  // }

  /**
     * req.body.username,
     * req.body.password
     */
  /*
    "add_one": function (req, res) {
        var userId = req.body.userId;
        var start_date = req.body.start_date;
        var end_date = req.body.end_date;
        var complex_id = req.body.complex_id;
        var apt_bedroom_amount = req.body.apt_bedroom_amount;
        var apt_bathroom_amount = req.body.apt_bathroom_amount;
        var room_avail = req.body.room_avail;
        var gender_req = req.body.gender_req;
        var user_description = req.body.user_description;
        var facility = req.body.facility;
        var notice = req.body.notice;
        var location = req.body.location;
        var status = req.body.status;
        var img_url = req.body.img_url;
        if(apt_bedroom_amount < 0 || apt_bathroom_amount < 0) {
            res.error(1, "room amount invalid");
        }
        else{
            Leasing.insertOne({
                "userId": userId,
                "start_date": start_date,
                "end_date": end_date,
                "complex_id": complex_id,
                "apt_bedroom_amount": apt_bedroom_amount,
                "apt_bathroom_amount": apt_bathroom_amount,
                "room_avail": room_avail,
                "gender_req": gender_req,
                "user_description": user_description,
                "facility": facility,
                "notice": notice,
                "location": location,
                "status": status,
                "img_url": img_url
            }, function (err, response) {
                if (err) {
                    res.error(1, err);
                }
                else {
                    res.success(response.ops[0]);
                }
            });
        }
    }, */
  /*
  'get_one': function (req, res) {
    var id = req.body['id']
    if (req.body['id']) {
      Leasing.aggregate([
        {
          $match: {
            '_id': ObjectId(id)
          }
        },
        {
          $lookup: {
            from: 'complex',
            localField: 'complex_id',
            foreignField: '_id',
            as: 'complex'
          }
        }
      ]).toArray(function (err, result) {
        if (err) {
          res.error(2, err)
        } else {
          if (result === 0) {
            res.error(3, 'Leasing not found')
          } else {
            res.success(result)
          }
        }
      })
    } else {
      res.error(1, 'No id')
    }
  },
  'update_one': function (req, res) {
    var start_date = req.body.start_date
    var end_date = req.body.end_date
    var complex_id = req.body.complex_id
    var apt_bedroom_amount = req.body.apt_bedroom_amount
    var apt_bathroom_amount = req.body.apt_bathroom_amount
    var room_avail = req.body.room_avail
    var gender_req = req.body.gender_req
    var user_description = req.body.user_description
    var facility = req.body.facility
    var notice = req.body.notice
    var location = req.body.location
    var status = req.body.status
    var img_url = req.body.img_url
    if (apt_bedroom_amount < 0 || apt_bathroom_amount < 0) {
      res.error(1, 'room amount invalid')
    } else {
      console.log(status)
      Leasing.updateOne({
        '_id': ObjectId(req.body._id)
      }, {
        $set: {
          'start_date': start_date,
          'end_date': end_date,
          'complex_id': complex_id,
          'apt_bedroom_amount': apt_bedroom_amount,
          'apt_bathroom_amount': apt_bathroom_amount,
          'room_avail': room_avail,
          'gender_req': gender_req,
          'user_description': user_description,
          'facility': facility,
          'notice': notice,
          'location': location,
          'status': status,
          'img_url': img_url
        }
      }, function (err, result) {
        if (err) {
          res.error(200)
        } else {
          res.success(result)
        }
      })
    }
  },
  /**
     * req.body.id,
     * req.body.status
     */
  /*
  'change_status_leasing': function (req, res) {
    Leasing.updateOne({
      '_id': req.body._id
    }, {
      $set: {
        'status': req.body.status
      }
    }, function (err) {
      if (err) {
        res.error(200)
      } else {
        res.success({})
      }
    })
  },
  'remove_all_leasing': function (req, res) {
    if (Leasing.drop()) {
      res.success('drop success')
    } else {
      res.error(1, 'collection does not exist')
    }
  } */
}