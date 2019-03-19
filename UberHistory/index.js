'use strict';

//var AWSXRay = require('aws-xray-sdk-core');
var AWS = require('aws-sdk');
var UBER = require('uber.js');

// Set the region 
AWS.config.update({region: 'us-east-2'});

//var s3Client = AWS.S3();
var dynamodb = new AWS.DynamoDB({region: 'us-east-2', apiVersion: '2012-08-10'});

exports.handler = async (event) => {

    let uber_history = await UBER.getHistory(event.token);

//    uber_history = JSON.parse(sample_history);
//    uber_history.foreach((item) => {
        var params = {
            TableName: "history",
            Item: {
                'uuid': { S: event.uuid },
                'status': "completed",
                'distance': 1.929251369,
                "product_id": "1af06fdf-eab1-46a5-ae2b-d361e530ac42",
                "start_time": 1514341373,
                "start_city": {
                    "latitude": 30.332,
                    "display_name": "Jacksonville",
                    "longitude": -81.655
                },
                "end_time": 1514341676,
                "request_id": "fdc87702-3837-442c-be73-09f2e36f2e4b",
                "request_time": 1514341092
            }
        };
    
    	try {
            dynamodb.putItem(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else     console.log(data);           // successful response
            }).promise();
    	} catch (e) {
    		throw new Error('Could not write to DynamoDB: ' + e);
    	}
  //  });

    return 200;
};
