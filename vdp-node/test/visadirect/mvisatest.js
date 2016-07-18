var request = require('request');
var fs = require('fs');
var config = require('../../config/configuration.json');
var expect = require('chai').expect;
var randomstring = require('randomstring');

var req = request.defaults();
var userId = config.userId ;
var password = config.password;
var keyFile = config.key;
var certificateFile = config.cert;

describe('Visa Direct M Visa Test', function() {
	var strDate = new Date().toISOString().replace(/Z/, '').replace(/\..+/, '');
	var mVisaTransactionRequest = JSON.stringify({
		  "acquirerCountryCode": "643",
		  "acquiringBin": "400171",
		  "amount": "124.05",
		  "businessApplicationId": "CI",
		  "cardAcceptor": {
		    "address": {
		      "city": "Bangalore",
		      "country": "IND"
		    },
		    "idCode": "ID-Code123",
		    "name": "Card Accpector ABC"
		  },
		  "localTransactionDateTime": strDate,
		  "merchantCategoryCode": "4829",
		  "recipientPrimaryAccountNumber": "4123640062698797",
		  "retrievalReferenceNumber": "430000367618",
		  "senderAccountNumber": "4541237895236",
		  "senderName": "Mohammed Qasim",
		  "senderReference": "1234",
		  "systemsTraceAuditNumber": "313042",
		  "transactionCurrencyCode": "USD",
		  "transactionIdentifier": "381228649430015"
		});
	
	it('M Visa Transaction Test',function(done) {
		this.timeout(10000);
		console.log("Request Body : " + JSON.stringify(JSON.parse(mVisaTransactionRequest),null,4));
		var baseUri = 'visadirect/';
		var resourcePath = 'mvisa/v1/cashinpushpayments';
		console.log("URL : " + config.visaUrl + baseUri + resourcePath);
		req.post({
			uri : config.visaUrl + baseUri + resourcePath,
			key: fs.readFileSync(keyFile),  
			cert: fs.readFileSync(certificateFile),
			headers: {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
				'Authorization' : 'Basic ' + new Buffer(userId + ':' + password).toString('base64'),
				'x-correlation-id' : randomstring.generate({length:12, charset: 'alphanumeric'}) + '_SC'
			},
			body: mVisaTransactionRequest
		}, function(error, response, body) {
			if (!error) {
				console.log("Response Code: " + response.statusCode);
				console.log("Headers:");
				for(var item in response.headers) {
					console.log(item + ": " + response.headers[item]);
				}
				console.log("Body: "+ JSON.stringify(JSON.parse(body),null,4));
				assert.equal(response.statusCode, 200);
			} else {
				console.log(error);
				assert(false);
			}
			done();
		}
		);
	});
});