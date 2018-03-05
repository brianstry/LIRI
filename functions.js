require("dotenv").config();
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");

var key = require("./key.js");

var spotify = new Spotify(key.spotify);

var client = new Twitter(key.twitter);


function tweets(){
    var params = { screen_name: 'TheSiepher' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                if (i > 20) { break; };
                console.log(tweets[i].text);
            }
        }
    });
}

function song(userChoiceTwo){
    if(userChoiceTwo === undefined){
        userChoiceTwo = "the Sign";
    }
    spotify.search({ type: 'track', query: userChoiceTwo }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].artists[0].name);      //artist name
        console.log(data.tracks.items[0].name);                 //song name
        console.log(data.tracks.items[0].preview_url);          //Preview of track
        console.log(data.tracks.items[0].album.name);           //Name of the album

    });
}

function movie(userChoiceTwo){
    if(userChoiceTwo === undefined){userChoiceTwo = "Mr. Nobody"};
    var queryUrl = "http://www.omdbapi.com/?t=" + userChoiceTwo + "&y=&plot=short&apikey=trilogy"
    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            // console.log(JSON.parse(body));
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Realease Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Made in: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}

function doIt(){
    fs.readFile("random.txt", "utf8", function(err, data) {

        if (err) {
          return console.log(err);
        }
        
        var dataArr = data.split(",");
      
        userChoiceTwo = dataArr[1];
        // console.log(userChoiceTwo);
        song(userChoiceTwo);
      
      });
}
