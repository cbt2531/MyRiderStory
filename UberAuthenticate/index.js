'use strict';

var AWS = require('aws-sdk');
var UBER = require('uber.js');

exports.handler = async (event) => {

    let results = await UBER.getAccessToken(event.code);

    const response = {
        statusCode: results.statusCode,
        statusMessage: results.statusMessage
    };
    return response;
};
