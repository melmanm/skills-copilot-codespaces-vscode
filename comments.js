// Create web server
// Use express module
// Use body-parser module
// Use mongoose module
// Use method-override module
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require('method-override');
var app = express();
// Connect to MongoDB
mongoose.connect("mongodb://localhost/comments");
// Set view engine to ejs
app.set("view engine", "ejs");
// Set up public directory
app.use(express.static("public"));
// Use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// Use method-override
app.use(methodOverride('_method'));
// Define schema for comments
var commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    date: {type: Date, default: Date.now}
});
var Comment = mongoose.model("Comment", commentSchema);
// Create a new comment
// Path: /comments/new
app.get("/comments/new", function(req, res){
    res.render("new");
});
// Add a new comment to the database
// Path: /comments
app.post("/comments", function(req, res){
    Comment.create(req.body.comment, function(err, newComment){
        if(err){
            res.render("new");
        } else {
            res.redirect("/comments");
        }
    });
});
// Display all comments
// Path: /comments
app.get("/comments", function(req, res){
    Comment.find({}, function(err, comments){
        if(err){
            console.log("Error");
        } else {
            res.render("index", {comments: comments});
        }
    });
});
// Display a specific comment
// Path: /comments/:id
app.get("/comments/:id", function(req, res){
    Comment.findById(req.params.id, function(err, foundComment){
        if(err){
            res.redirect("/comments");
        } else {
            res.render("show", {comment: foundComment});
        }
    });
});
// Edit a specific comment
// Path: /comments/:id/edit
app.get("/comments/:id/edit", function(req, res){
    Comment.findById(req.params.id, function(err, foundComment){
        if(err){
            res.redirect("/comments");
        } else {
            res.render("edit", {comment: foundComment});
        }
    });
});
// Update a specific comment
// Path: /comments/:id
app.put("/comments/:id", function(req,git add comments.js