//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "HOME ethereal moon cast its shimmering light upon the tranquil lake, painting ripples of silver across the water's surface. A gentle breeze whispered through the trees, causing the leaves to dance in harmony. The night was filled with a symphony of crickets, their chorus carrying through the air, accompanied by the occasional hoot of an owl. As I stood there, enveloped in the serenity of nature, I couldn't help but feel a sense of awe and wonder. It was as if the universe itself was revealing its secrets to those willing to listen. Time seemed to stand still in this magical moment, where the boundaries between reality and dreams blurred. In that brief instant, I felt connected to something greater than myself, a thread woven into the tapestry of existence. And as the night wore on, I carried the memory of that ephemeral beauty, knowing that such moments are meant to be cherished, for they hold the essence of life's fleeting enchantments."
const aboutContent = "ABOUT habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "CONTACT eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render('home',{
    homeStartingContent:homeStartingContent, 
    posts:posts
  });
});


app.get("/about", function(req, res){
  res.render('about',{aboutContent:aboutContent});
});


app.get("/contact", function(req, res){
  res.render('contact',{contactContent:contactContent});
});


app.get("/compose", function(req, res){
  res.render('compose');
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  // console.log(post);
  posts.push(post);
  res.redirect("/");
});


app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle){

      
      res.render("post", {
        title: post.title,
        content: post.content
      });
      
    };

  });
});


app.listen(4000, function() {
  console.log("Server started on port 4000");
});
