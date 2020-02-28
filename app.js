var express = require("express");
var app = express();
app.set("view engine", "ejs");
var request = require("request");

app.use(express.static("public"));

var url = "http://www.omdbapi.com/?s=star+wars&type=movie&apikey=thewdb";
var url2 = "http://www.omdbapi.com/?s=star+trek&type=movie&apikey=thewdb";

var starWars;
var starTrek;

//Get all star wars movies using OMDB API
request(url, function(error, response, body){
    if(!error && response.statusCode == 200)
    {
        starWars = JSON.parse(body);
    }
});

//Get all Star Trek movies using OMDB API
request(url2, function(error, response, body){
    if(!error && response.statusCode == 200)
    {
        starTrek = JSON.parse(body);
    }
});



//Route for Homepage
app.get("/", function(req, res){
    
    res.render("search", {starWars: starWars, starTrek: starTrek});
});

//Route for results
app.get("/results", function(req, res){
    
    //Get the search term form the search bar query
    var find = req.query.search;
    find = find.trim();
    var url = "http://www.omdbapi.com/?s=" + find + "&type=movie&apikey=thewdb";
    
    //Obtain results for search using OMDB API and render the results page
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200)
        {
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});

//Route for Details page
app.get("/details/:movieID", function(req, res){
    //Get movieID from request params
    var movieID = req.params.movieID;
    var url = "http://www.omdbapi.com/?i=" + movieID + "&type=movie&apikey=thewdb";

    //Obtain result from OMDB API and render the deatails page
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200)
        {
            var data = JSON.parse(body);
            res.render("details", {data: data});
        }
    });
});


app.listen(process.env.PORT, process.env.IP);