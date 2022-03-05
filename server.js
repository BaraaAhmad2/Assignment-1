var express = require("express");
var app = express();
var bodyParser = require("body-parser");

/**
 * Already given values of certain tweets
 *
 */

var tweets = [
  {
    id: 633,
    name: "danah boyd",
    screen_name: "zephoria",
    text: "I reflected on why the #sxsw induction means so much to me and it took &gt;140 chars: http://t.co/rJWz0jKrqf",
    created_at: "Wed Mar 13 13:16:30 +0000 2013",
  },
  {
    id: 22384071,
    name: "Tim O'Reilly",
    screen_name: "timoreilly",
    text: "Was wondering why @billgates cc'd me on story abt @MSFTResearch cool viral search tool; discovered I'm featured in it http://t.co/g6oSeEIEUr",
    created_at: "Wed Mar 13 23:01:36 +0000 2013",
  },
  {
    id: 2408481,
    name: "Mark Ury",
    screen_name: "MarkUry",
    text: "The one page everyone in Hollywood is watching http://t.co/jaX0uQqk4W  This is the film industry's Pebble Watch moment.",
    created_at: "Wed Mar 13 22:16:59 +0000 2013",
  },
  {
    id: 14078377,
    name: "SarahPrevette",
    screen_name: "SarahPrevette",
    text: "How to Create an Early Stage Pitch Deck\nhttp://t.co/TdYB5I6xBl\n(Great advice from @ryanspoon )",
    created_at: "Tue Mar 12 13:29:12 +0000 2013",
  },
];
function test_print() {
  console.log("test code");
}
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

/**
 * Basic app.get function to retrieve all values within the tweets array
 */
app.get("/tweets", function (req, res) {
  res.send({ tweets: tweets });
});

/**
 * This app.get will search only an object within the array that matches the id of a tweet
 * so it will loop through all ids until it finds the right one, then it will get the value of that
 */
app.get("/tweets/:id", function (req, res) {
  var id = req.params.id;
  var found = false;
  tweets.forEach(function (item, index) {
    if (!found && Number(item.id) === Number(id)) {
      res.send(tweets[index]);
    }
  });
});

/**
 * This app.post function will take care of creating a new tweet and pushing that into the tweets table to display in the frontend
 * tweets.push takes care of placing the values in
 * if successful, you will get a res.send that says you have successfully created a product
 */
app.post("/tweets", function (req, res) {
  var currentId = req.body.id;
  var tweetName = req.body.text;
  var tweetTime = req.body.time;

  tweets.push({
    id: currentId,
    text: tweetName,
    created_at: tweetTime,
  });

  res.send("Successfully created product!");
});

/**
 * This function will take care of updating the screen name to whatever the user chooses.
 * It will loop through all tweets until the entered name matches the name in the array
 * if there is a match, it will change the screen_name value to the user's input
 */
app.put("/tweets/:createInput", function (req, res) {
  var name = req.params.createInput;
  var newName = req.body.newName;

  var found = false;

  tweets.forEach(function (item, index) {
    if (!found && String(item.name) === String(name)) {
      item.screen_name = newName;
    }
  });

  res.send("successfuly updated");
});

/**
 * this app.delete will loop through all values in tweets array until the entered id finds a match
 * if there is a match, it will completely remove that id and its properties
 */
app.delete("/tweets/:id", function (req, res) {
  var id = req.params.id;

  var found = false;

  tweets.forEach(function (product, index) {
    if (!found && product.id === Number(id)) {
      tweets.splice(index, 1);
    }
  });

  res.send("Successfully deleted product!");
});

app.listen(PORT, function () {
  test_print();
  console.log("Listening on port " + PORT);
});
