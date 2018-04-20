var AppsLog = require('../models/apps_log')

module.exports = function (io) {
    return {
        create: function (req, res, next) {
            var attrs = {
                uid: req.body.uid,
                package: req.body.package,
                icon: req.body.icon
            }

            AppsLog.create(attrs)
                .then(function (dbCallLog) {
                    io.to('/admin').emit('apps_log:created', dbCallLog)
                    res.json(dbCallLog)
                })
                .catch(function (err) {
                    res.status(500).send(err)
                })

        },

        showLogs: function (req, res, next) {
            AppsLog.findAll()
                .then(function (dbCallLogs) {
                    res.json(dbCallLogs)
                })
                .catch(function (err) {
                    res.status(500).send(err)
                })
        },
        clear: function (req, res, next) {
            var uid = req.params.uid
            AppsLog.destroy()
                .then(function () {
                    io.to('/admin').emit('apps_log:cleared')
                    res.status(200).send()
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
    }
}
