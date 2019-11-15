var express = require('express');
var url = require('url');
var https = require('https');
var request = require('request');

var app = express();
var google_key = 'AIzaSyAMYlNkLLZKZtG1lrpLOZBFSfxQR4F_Ozg'
var darksky_key = 'da17781f45552e437387c0ebfff1948f'
var engine_id = '008478731404640897187:l9cztm9foix'


app.get('/autocomplete', function (req, res){
	res.setHeader("Access-Control-Allow-Origin","*");
  	var city = req.query.city
  	var url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='
  	 			 + encodeURIComponent(city)
  	 			 + '&types=(cities)&language=en&key=' + google_key
  	
  	request(url, function(error, response, body) {
  		if (!error && response.statusCode == 200) {
        	res.send(JSON.parse(body)); 
    	} else {
    		console.log("There was an error: ") + response.statusCode;
            console.log(body);
    	}
    });
  	console.log("auto GET")
  }
);
 
app.get('/geo', function (req, res){
	res.setHeader("Access-Control-Allow-Origin","*");
  	var params = req.query
  	var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
  				 + encodeURIComponent(params.street) + ','
  	 			 + encodeURIComponent(params.city) + ','
  	 			 + encodeURIComponent(params.state) + ','
  	 			 + '&key=' + google_key
  	request(url, function(error, response, body) {
  		if (!error && response.statusCode == 200) {
        	res.send(JSON.parse(body)); 
    	} else {
    		console.log("There was an error: ") + response.statusCode;
            console.log(body);
    	}
    });
  	console.log("geo GET")
  }
);

app.get('/darksky', function (req, res){
	res.setHeader("Access-Control-Allow-Origin","*");
  	var params = req.query
  	var url = 'https://api.darksky.net/forecast/'
  				 + darksky_key + '/'
  	 			 + encodeURIComponent(params.lat) + ','
  	 			 + encodeURIComponent(params.lng)
  	request(url, function(error, response, body) {
  		if (!error && response.statusCode == 200) {
        	res.send(JSON.parse(body)); 
    	} else {
    		console.log("There was an error: ") + response.statusCode;
            console.log(body);
    	}
    });
  	console.log("darksky GET")
  }
);

app.get('/darksky_time', function (req, res){
	res.setHeader("Access-Control-Allow-Origin","*");
  	var params = req.query
  	var url = 'https://api.darksky.net/forecast/'
  				 + darksky_key + '/'
  	 			 + encodeURIComponent(params.lat) + ','
  	 			 + encodeURIComponent(params.lng) + ','
  	 			 + encodeURIComponent(params.time)
  	request(url, function(error, response, body) {
  		if (!error && response.statusCode == 200) {
        	res.send(JSON.parse(body)); 
    	} else {
    		console.log("There was an error: ") + response.statusCode;
            console.log(body);
    	}
    });
  	console.log("darksky_time GET")
  }
);

app.get('/seal', function (req, res){
	res.setHeader("Access-Control-Allow-Origin","*");
  	var params = req.query
  	var url = 'https://www.googleapis.com/customsearch/v1?q='
  	 			 + encodeURIComponent(params.state)
  	 			 + '%20State%20Seal&cx='
  	 			 + engine_id
  	 			 + '&imgSize=huge&imgType=news&num=1&searchType=image&key='
  	 			 + google_key
  	request(url, function(error, response, body) {
  		if (!error && response.statusCode == 200) {
        	res.send(JSON.parse(body)); 
    	} else {
    		console.log("There was an error: ") + response.statusCode;
            console.log(body);
    	}
    });
  	console.log("seal GET")
  }
);


app.listen(3000);

  	// res.setHeader("Content-Type", "text/plain");
  	// res.setHeader("Access-Control-Allow-Origin","*");
  	// var params = url.parse(req.url, true).query;
  	// console.log(auto_url)
  	// https.get(auto_url, function(req2, res2){
  	// 	var res_text = "";
  	// 	req2.on('data', function(data){
  	// 		res_text+=data;
  	// 	});
  	// 	req2.on('end', function(){
  	// 		return res.send(JSON.parse(res_text));
  	// 	});
  	// });
