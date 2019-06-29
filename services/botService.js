/**
 * @description Bot Service library.
 * @name botService.js
 * @version 1.1.2
 * @author Super-Sean1995
 */

'use strict';
// Import npm modules.
var Client = require('instagram-private-api').V1,
    path = require('path'),
    _ = require('lodash'),
    Promise = require('bluebird');

// Definition Bot Service module.
var BotService = {};

// Define BotService Sub Functions.
BotService.validateBot = validateBot;

/**
 * @description
 * Validate bot to create news with username and password using instagram api.
 * 
 * @param {STRING} name 
 * @param {STRING} password 
 * @param {OBJECT} cb 
 */
function validateBot(name, password, cb) {
    var cookieFileURL = '../cookies/' + name + '.json',
        storage = new Client.CookieFileStorage(path.join(__dirname, cookieFileURL)),
        device = new Client.Device(name);

    Client.Session.create(device, storage, name, password)
        .then(async function(session) {
            if(!session) {
                cb({
                    flag: false,
                    type: 'CreateError'
                })
            } else {
                cb({
                    flag: true,
                    type: 'Success',
                    session: session
                });
            }
        })
        .catch(function(reject) {
            cb({
                flag: false,
                type: reject.name
            });
        });
}

// Export BotService module.
module.exports = BotService;