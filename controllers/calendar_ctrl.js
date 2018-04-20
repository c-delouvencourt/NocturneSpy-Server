var Calendar = require('../models/calendar')

module.exports = function(io) {
  return {
    create: function(req, res) {
      Calendar.create(req.body)
        .then(function(dbContact) {
          io.to('/admin').emit('contact:created', dbContact)
          res.status(201).send()
        })
        .catch(function(err) {
          res.status(500).send()
        })
    },
    getCalendar: function(req, res) {
      var uid = req.params.uid
      Calendar.findAll({
          where: {
            uid: uid
          }
        })
        .then(function(dbContacts) {
          res.json(dbContacts)
        })
        .catch(function(err) {
          res.status(500).send(err)
        })
    },
    clear: function(req, res) {
        Calendar.destroy({
          where: {
            uid: req.params.uid
          }
        })
        .then(function() {
          res.status(200).send()
        })
        .catch(function() {
          res.status(500).send()
        })
    }
  }
}
