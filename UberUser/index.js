'use strict';

//var AWSXRay = require('aws-xray-sdk-core');
var AWS = require('aws-sdk');
var UBER = require('uber.js');

// Set the region 
AWS.config.update({region: 'us-east-2'});

//var s3Client = AWS.S3();
var dynamodb = new AWS.DynamoDB({region: 'us-east-2', apiVersion: '2012-08-10'});

exports.handler = async (event) => {

    let uber_user = await UBER.getUser(event.token);

    var params = {
        TableName: "user",
        Item: {
            'uuid': { S: uber_user.uuid },
            'rider_id': { S: uber_user.rider_id },
            'promo_code': { S: uber_user.promo_code },
            'picture': { S: uber_user.picture },
            'mobile_verified': { BOOL: uber_user.mobile_verified },
            'last_name': { S: uber_user.last_name },
            'first_name': { S: uber_user.first_name },
            'email': { S: uber_user.email }
        }
    };

	try {
        await dynamodb.putItem(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
        }).promise();
	} catch (e) {
		throw new Error('Could not write to DynamoDB: ' + e);
	}

    return 200;
};
