const { response } = require("express");
const twitter = require("../models/twitter");

//consulter la liste des listes de tâches
exports.getHome = (request, response) => {
    twitter.getLasts((error, tweetList) => {
    if (error) {
            response.send(error.message);
        }
    //create html page
    response.render("index.ejs", {tweetList});
});

}

exports.findUserTweet = (request, response) => {
    const { user_id } = request.params;
     console.log(user_id);
    twitter.getUserTweet(user_id, (error, UserTweet) => {
        if (error) {
            response.send(error.message);
        }
        response.render("profile.ejs", { UserTweet });
    });

}

exports.addTweet = (request, response) => {
    // On va ajouter user_id avec le cookie?
      twitter.insertTweet( request.body,1, (error, result) => {
          if (error) {
              response.send(error.message);
          }
          
        response.redirect("/");
  
  
      });
  }

  exports.showTweet = (request, response) => {
    const { tweet_id} = request.params;
     console.log(tweet_id);
    twitter.getDetailsTweet(tweet_id, (error, DetailsTweet) => {
        if (error) {
            response.send(error.message);
        }
        tweet = DetailsTweet[0];
        response.render("details.ejs", { tweet });
    });

}

