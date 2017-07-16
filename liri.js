var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('file-system');

var spotify = new Spotify({
  id: <fbf65b4c84224a8d8be3eca28baada11>,
  secret: <0e0d979b0bb541a18928a62933fd025f>
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});