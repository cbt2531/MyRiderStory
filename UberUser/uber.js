'use strict';

const HTTPS = require('https');

module.exports = {
	getUser: function(token) {
		return new Promise((resolve, reject) => {
			var data = {};

			let options = {
				method: 'GET',
				hostname: 'api.uber.com',
				path: '/v1.2/me',
				headers: {
					'Authorization' : 'Bearer ' + token,
    				'Cache-Control' : 'no-cache',
					'Content-Type' : 'application/json',
				},
				json:true
			};
			
			var request = HTTPS.request(options, function (response) {
				var buffer ='';

    			console.log('STATUS: ' + response.statusCode);
    			console.log('HEADERS: ' + JSON.stringify(response.headers));

			    response.setEncoding('utf8');
			    
				response.on("data", function (chunk) {
    				buffer += chunk;
				});

				response.on("end", function () {
    				data = JSON.parse(buffer);
        			console.log('RESPONSE: ', data);
			   		if (resolve && typeof resolve == 'function') {
			   			resolve(data);
			   		}
				});
			});
			
			request.on('error', function(e) {
			    console.log('problem with request: ' + e.message);
			});			
			
			request.end();
		});
	}
};
