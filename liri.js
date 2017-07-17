var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var request = require('request');
var action = process.argv[2];
// grabbing the data from keys.js
var twitterKeysVar = require('./keys.js');
var client = new Twitter(twitterKeysVar.twitterKeys);

// var nodeArgs = process.argv;

// spotify keys
var spotify = new Spotify({
  id: 'fbf65b4c84224a8d8be3eca28baada11',
  secret: '0e0d979b0bb541a18928a62933fd025f'
});


// case statement to take in command
switch (action) {
    case 'my-tweets':
        twitter();
        break;

    case 'spotify-this-song':
        spotifySong();
        break;

    case 'movie-this':
        omdb();
        break;

    case 'do-what-it-says':
        doWhatItSays();
        break;
}

// make a 'my-tweets' command that shows the last 20 tweets
function twitter (){
  var tweetTimeline = { screen_name: 'Confess_booth', count: 13 };
  client.get('statuses/usertimline', tweetTimeline, function(error, tweets, response) {
      if(error){
        console.log('tweets not loading')
      }
      console.log("==============================================")
      console.log("Some Phyllis Dyller Quotes")
      for (var i = 0; i < tweets.length; i++) {
        console.log("_____________________________________________");
        console.log("Tweeted on: " + tweets[i].created_at);
        console.log(tweets[i].text);
        console.log(response);
      }
       
  });
}

//  make a 'spotify-this-song' command that shows the artist, song name, a preview link to a song from Spotify
// and the album that the song is from.  If no song is provided it will play 'I saw the sign'
function spotifySong(){
    spotify.search({ 
      type: 'track', 
      query: 'All the Small Things' }, 
      function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

    console.log(data); 
    });
}

//  make a movie-this command that outputs the title, year, rating, rotton tomatoes
// country, language, plot, and actors. If the user doesn't type in a movie it will
// return 'mr. nobody'
function omdb(){
  request('http://www.omdbapi.com/?apikey=40e9cece&', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred 
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    console.log('body:', body); // Print the HTML for the Google homepage. 
  });
}
// command do-what-it-says: using the fs package, liri reads the text inside the random.txt
// file and it should spotify that song
function doWhatItSays(){

}