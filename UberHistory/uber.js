'use strict';

const HTTPS = require('https');

module.exports = {
	getHistory: function(token) {
		return new Promise((resolve, reject) => {
			var records = [];
			var limit = 50;
			var count = 0;

			for(let offset = 0; offset <= count; offset += limit) {
				
				let options = {
					method: 'GET',
					hostname: 'api.uber.com',
					path: '/v1.2/history?offset=' + offset + '&limit=' + limit,
					headers: {
						'Authorization' : 'Bearer ' + token,
	    				'Cache-Control' : 'no-cache',
						'Content-Type' : 'application/json',
					},
					json:true
				};
				
				var request = HTTPS.request(options, function (response) {
					let buffer ='';
					let result = {};
	
	    			console.log('STATUS: ' + response.statusCode);
	    			console.log('HEADERS: ' + JSON.stringify(response.headers));
	
				    response.setEncoding('utf8');
				    
					response.on("data", function (chunk) {
	    				buffer += chunk;
					});
	
					response.on("end", function () {
	    				result = JSON.parse(buffer.join(''));
						for (ndx in result.history) {
							item = result.history[ndx];
							console.info(item);
							records.add(item);
				   	 	}
					});
				
				request.on('error', function(e) {
				    console.log('problem with request: ' + e.message);
				});			
				
				request.end();
				
				});
			}

	   		if (resolve && typeof resolve == 'function') resolve(records);
		});
	}
};
