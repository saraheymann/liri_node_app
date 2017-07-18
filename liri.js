var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var request = require('request');
// variable for the liri command
var action = process.argv[2];
// grabbing the data from keys.js
var twitterKeysVar = require('./keys.js');
var client = new Twitter(twitterKeysVar.twitterKeys);
// user input variable
var userInput = "";
var nodeArgs = process.argv;
// for loop to read the userInput beyond proccess.argv[3]
for (var i = 3; i < nodeArgs.length; i++) {

    if (i >= 3 && i < nodeArgs.length) {
        userInput = userInput + " " + nodeArgs[i];

    } else {
        userInput = userInput + userInput[i];
    }
}


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
  var tweetTimeLine = { screen_name: 'Confess_booth', count: 13};
  client.get('statuses/user_timeline', tweetTimeLine, function(error, tweets, response) {
      if(!error){
        console.log("==============================================")
        console.log("Some Phyllis Dyller Quotes")
        // tweets.forEach(function(tweets){
        for (var i = 0; i < tweets.length; i++) {
          console.log("_____________________________________________");
          console.log(tweets[i].text);
        }  
      }
  });
};

//  make a 'spotify-this-song' command that shows the artist, song name, a preview link to a song from Spotify
// and the album that the song is from.  If no song is provided it will play 'I saw the sign'
function spotifySong(){
    if(userInput === true){
        spotify.search({ 
            type: 'track', 
            query: userInput,
            limit: 1}, 
            function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }else{
                    var data =  data.tracks.items;
                for (var i = 0; i < data.length; i++) {
                    for (var h =0; h < data[i].artists.length; h++) {
                    console.log("the artist is: " + data[i].artists[h].name);     
                    }
                    console.log("the album is: " + data[i].album.name);
                    console.log("the title of the track is: " + data[i].name);
                    console.log("a preview link for the song:" + data[i].preview_url);
                    
                }
            }
            
            
        });
    }else{
       spotify.search({ 
            type: 'track', 
            query: 'the sign ace of base',
            limit: 1}, 
            function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }else{
                    var data =  data.tracks.items;
                for (var i = 0; i < data.length; i++) {
                    for (var h =0; h < data[i].artists.length; h++) {
                    console.log("the artist is: " + data[i].artists[h].name);     
                    }
                    console.log("the album is: " + data[i].album.name);
                    console.log("the title of the track is: " + data[i].name);
                    console.log("a preview link for the song:" + data[i].preview_url);
                    
                }
            }
            
            
        }); 
    }
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