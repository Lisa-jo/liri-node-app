require("dotenv").config();
// link to keys.js
var keys = require('./keys.js');
// spodify node 
var Spotify = require('node-spotify-api');
var Twitter = require('node-twitter-api');
var request = require("request");

var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);




// item to hold data information
var item = process.argv[2];

// function to pring spodify data
function spotifyPrint(data){
	data.tracks.items.forEach(function(item, i) {
		var artist = item.artists[0].name;
		// album name
		var album = item.album.name;
		//preview url
		var preview = item.preview_url;
		//song name
		var songName = item.name;
		//Album Type
		var albumType = item.album.album_type;

		// print out results from search
		console.log("Spodifyt Search Results");
		console.log("--------------------");
		console.log('Artist: ' + artist);
		console.log("Album: " + album);
		console.log("Album Type: " + albumType);
		console.log("Song Name: "+ songName);
		console.log('URL: ' + preview);
		console.log("\n");
	});
}

// use a switch depending on what the user inputs 
switch(item){
	case 'my-tweets':
	console.log(twitter);
		twitter.get('favorites/list',function(error, tweets,response){
			// if(error) throw error;
			console.log('\n');
			//create a for loop 
			for (var i = 0; i < tweets.length; i++){
				console.log("Item #" + i);
				//Date tweet was created 
				console.log("Date: "+tweets[i].created_at);
				// Tweet text
				console.log("Tweet: "+ tweets[i].text)
				// print line break
				console.log("-----------------------------")
				// console.log(tweets[i].text);

			}
			console.log('\n');
			
		});
		break;
	case 'spotify-this-song':
		if(process.argv[3] !== undefined){
			spotify.search({type: 'track', query: process.argv[3] }, function(err, data) {
				spotifyPrint(data);
			});
		}else{
			var song = "Them Bones";
			spotify.searchTracks(song).then(function(data) {
				spotifyPrint(data);
	 			var song = "Them Bones";
	  }, function(err) {
	    console.error(err);
	  });
		}
		break;
	case 'movie-this':
		if(process.argv[3] !== undefined){
			var name = "http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy";
			// Then run a request to the OMDB API with the movie specified
			request(name, function(error, response, body) {

				// If the request is successful (i.e. if the response status code is 200)
				if (!error && response.statusCode === 200) {

					// Parse the body of the site and recover just the imdbRating
					// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
					console.log(JSON.parse(body));
				}
			});
		}
		else {
				// Then run a request to the OMDB API with the movie specified
				request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {

					// If the request is successful (i.e. if the response status code is 200)
					if (!error && response.statusCode === 200) {
	
						// Parse the body of the site and recover just the imdbRating
						// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
						console.log(JSON.parse(body));
					}
				});
		}
		break;
	default:
		console.log(process.argv[3]);
		break;
};



