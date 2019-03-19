'use strict';

const HTTPS = require('https');
const querystring = require('querystring');



module.exports = {
    getAccessToken: function(code) {
		return new Promise((resolve, reject) => {

			var body = querystring.stringify({
				client_id: '0uoNzH1Xcrcn11ICNG7jkVv1PF061xW5',
				client_secret: '1S9AdsHcIUe5ZyBFA0_r6dbbHxffzkR4oPw657px',
				grant_type: 'authorization_code',
				redirect_uri: 'https://open24hoursdaily.com/authorized',
				code: code
			});

			var options = {
				method: 'POST',
				port: 443,
				hostname: 'login.uber.com',
				path: '/oauth/v2/token',
				headers: {
 					'Content-Type': 'application/x-www-form-urlencoded',
    				'Cache-Control': 'no-cache'
					// 'Content-Length': data.length
				}
			};
			
			console.info('options => ' + JSON.stringify(options));
			console.info('body => ' + body);
			
			var request = HTTPS.request(options, function (response) {

			    response.setEncoding('utf8');

				if (response.statusCode < 200 || response.statusCode > 299) {
					var e = new Error('Failed on call to resource token : status code = ' + response.statusCode + ', status message = ' + response.statusMessage);
				//	console.log(e);	
				//	console.info(buffer);
					reject(e);
				}

			    var buffer = [];
				response.on("data", function (chunk) {
    				buffer.push(chunk);
					console.info('response.on("data" (' + buffer + ')');
				});

				response.on("end", function () {
			   		if (resolve && typeof resolve == 'function') { resolve(JSON.parse(buffer)) }
				});
			});
			
			request.on('error', function(e) {
			    console.log('problem with request: ' + e.message);
			});

			request.write(body);
			request.end();
		});
    }
};
