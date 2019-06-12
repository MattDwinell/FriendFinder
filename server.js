var friendData = require("./app/data/friends");
console.log(friendData);
var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
  });
  
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "public/survey.html"));
  });
  
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
  });
  
  // Displays all characters
  app.get("/api/friends", function(req, res) {
    return res.json(friendData);
  });
  
  // Displays a single character, or returns false
  app.get("/api/friends/:friend", function(req, res) {
    var friend = req.params.character;
  
    console.log(friend);
  
    for (var i = 0; i < friendData.length; i++) {
      if (friend === friendData[i].name) {
        return res.json(friendData[i]);
      }
    }
  
    return res.json(false);
  });
  

  app.post("/api/friends", function(req, res) {

    var newFriend= req.body;
    var sumDifA = 100;
    var sumDifB = 0;
    var chosenFriend;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newFriend.name= newFriend.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newFriend);
    for(let i=0; i<friendData.length; i ++){
        for(let j=0; j<friendData[i].answers.length; j++){
            sumDifB += Math.abs(friendData[i].answers[j]-newFriend.answers[j]);
            console.log(sumDifB);
            
        }
        console.log(sumDifA, sumDifB);
        if (sumDifB < sumDifA ){
            chosenFriend = friendData[i];
            sumDifA = sumDifB;
        }
        console.log(chosenFriend);
        sumDifB = 0;
        
    }
  
    friendData.push(newFriend);
  
    res.json(chosenFriend);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });