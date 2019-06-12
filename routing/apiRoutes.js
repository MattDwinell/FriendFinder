
var friendData = require("../app/data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });
  app.get("/api/friends/:friend", function(req, res) {
    var friend = req.params.friend;
  
    console.log(friend);
  
    for (var i = 0; i < friendData.length; i++) {
      if (friend.toLowerCase() == friendData[i].name.toLowerCase()) {
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
  
    newFriend.name= newFriend.name.replace(/\s+/g, "").toLowerCase();
  
    for(let i=0; i<friendData.length; i ++){
        for(let j=0; j<friendData[i].answers.length; j++){
            sumDifB += Math.abs(friendData[i].answers[j]-newFriend.answers[j]);
        }
        if (sumDifB < sumDifA ){
            chosenFriend = friendData[i];
            sumDifA = sumDifB;
        }
        sumDifB = 0;
    }
    friendData.push(newFriend);
    res.json(chosenFriend);
  });
};
