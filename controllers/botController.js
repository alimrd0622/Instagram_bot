/**
 * @description Bot Controller library.
 * @name botController.js
 * @version 1.1.2
 * @author Super-Sean1995
 */
'use strict';
// Import project modules.
var BotService = require('../services/botService');

// Define Bot controller.
var BotController = {};

/**
 * @description 
 * Validate Bot function before create new bot.
 * 
 * @param {OBJECT} req
 * @param {OBJECT} res
 */
BotController.validateBot = function(req, res) {
    BotService.validateBot(req.body.userName, req.body.password, function(cb) {
        if(cb.flag == false) {
            switch(cb.type) {
                case 'CheckpointError':
                    res.status(404).json({
                        flag: false,
                        message: 'You need to login your user'
                    });

                    break;
                case 'AuthenticationError':
                    res.status(404).json({
                        flag: false,
                        message: 'Authentication Error, Please retype your user detail.'
                    });
                    
                    break;
                case 'CreateError':
                    res.status(404).json({
                        flag: false,
                        message: 'Creating Session Error.'
                    });

                    break;
            }
        } else {
            var newBotData = {
                user_id: req.session.user.id,
                botname: botName,
                name: name,
                password: password,
                delay: delay,
                status: 0
            }

            console.log(newBotData);
        }
    });
}

// Export BotController.
module.exports = BotController;