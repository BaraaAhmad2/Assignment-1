$(function () {
  // GET/READ

  //gets all data from file
  //tweets

  //This method gets the specified data within the tweets table (located in server.js)
  $("#get-button").on("click", function () {
    $.ajax({
      url: "/tweets", //specify improtant parameters to send to server file
      contentType: "application/json",
      success: function (response) {
        var tbodyEl = $("#table2 > tbody"); //this will fill up table2

        tbodyEl.html("");

        response.tweets.forEach(function (product) {
          tbodyEl.append(
            '\
                        <tr>\
                            <td class="id">' +
              product.id +
              "</td>\
                            "
          );
        });
      },
    });
  });

  /**
   * method:'GET'
   * This method utilizes an "on click" approach
   * whenever this button is clicked, it will display the time a certain tweet was created
   * as well as the text itself
   * from values found within the "tweets" array
   */
  $("#get-button2").on("click", function (event) {
    event.preventDefault();
    $.ajax({
      url: "/tweets",
      contentType: "application/json",
      success: function (response) {
        var tbodyEl = $("#table3 > tbody");

        tbodyEl.html("");

        response.tweets.forEach(function (product) {
          tbodyEl.append(
            '\
                        <tr>\
                            <td class="id">' +
              product.created_at +
              '</td>\
                            <td class="name">' +
              product.text +
              "</td>\
                        </tr>\
                    "
          );
        });
      },
    });
  });

  /**
   * method:'GET'
   * This button is connected to an input form that prompts user to enter a specific ID
   * if the ID Matches any of the values (either newly created or already inputted)
   * it will display the text and time it was created
   * Otherwise it will display nothing
   */

  $("#tweetbutton").on("click", function (event) {
    event.preventDefault();
    var id = $("#searchEntry").val();

    $.ajax({
      url: "/tweets/" + id,
      contentType: "application/json",
      success: function (response) {
        var tbodyEl = $("#specificTweetTable > tbody");

        tbodyEl.html("");

        tbodyEl.append(
          '\
                        <tr>\
                            <td class="id">' +
            response.text +
            '</td>\
                            <td> class="name">' +
            response.created_at +
            "</td>\
                            <td>\
                                \
                                \
                            </td>\
                        </tr>\
                    "
        );
      },
    });
  });

  /**
   * method: 'DELETE'
   * This button will delete a tweet within the tweets array
   * Also utilizing an "on click" approach
   * The (button name).click() lines at the end ensure that the values get refreshed within their respective tables
   * every time a tweet is deleted
   */
  $("#deleteButton").on("click", function (event) {
    event.preventDefault();
    var id = $("#deleteEntry").val();

    $.ajax({
      url: "/tweets/" + id,
      method: "DELETE",
      contentType: "application/json",
      success: function (response) {
        console.log("this button does something");
        $("#get-button").click();
        $("#get-button2").click();
        $("#tweetButton").click();
        $("#createButton").click();
      },
    });
  });

  // CREATE/POST

  /**
   * This button ensures the creation of a new tweet
   * A user is prompted to enter an ID and a text
   * Afterwards, it will display that new ID and text in the different tables that display such information
   */
  $("#createButton").on("click", function (event) {
    event.preventDefault();

    var createInput = $("#idEntry");
    var createInput2 = $("#textEntry");

    $.ajax({
      url: "/tweets",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        id: createInput.val(),
        text: createInput2.val(),
        time: Date(Date.now()),
      }),
      success: function (response) {
        console.log(response);
        $("#get-button4").click();
        $("#get-button").click();
        $("#get-button2").click();
      },
    });
  });

  /**
   * method:'GET'
   * This button will display the ID and text of all tweets within the table
   */
  $("#get-button4").on("click", function (event) {
    event.preventDefault();
    $.ajax({
      url: "/tweets",
      contentType: "application/json",
      success: function (response) {
        var tbodyEl = $("#table4 > tbody");

        tbodyEl.html("");

        response.tweets.forEach(function (product) {
          tbodyEl.append(
            '\
                        <tr>\
                            <td class="id">' +
              product.id +
              '</td>\
                            <td class="name">' +
              product.text +
              "</td>\
          "
          );
        });
      },
    });
  });
  // UPDATE/PUT

  /**
   * This method will update a screen name, given a name that matches the tweets table values
   * This utilizes a PUT method
   *
   */

  $("#updateButton").on("click", function (event) {
    event.preventDefault();
    // var rowEl = $(this).closest("tr");
    // var name = rowEl.find(".name").text();
    // var newName = rowEl.find(".screen_name").val();

    var createInput = $("#nameEntry").val();
    var newName = $("#usernameEntry").val();

    $.ajax({
      url: "/tweets/" + createInput,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        newName: newName,
      }),
      success: function (response) {
        console.log(response);
        $("#get-button5").click();
      },
    });
  });

  /**
   * This is the table that wil show the newly updated screen name
   * method: 'GET'
   */
  $("#get-button5").on("click", function (event) {
    event.preventDefault();
    $.ajax({
      url: "/tweets",
      contentType: "application/json",
      success: function (response) {
        var tbodyEl = $("#table10 > tbody");

        tbodyEl.html("");

        response.tweets.forEach(function (product) {
          tbodyEl.append(
            '\
                        <tr>\
                            <td class="id">' +
              product.name +
              '</td>\
                            <td class="name"> ' +
              product.screen_name +
              "</td>\
                            <td>\
                                \
                                \
                            </td>\
                        </tr>\
                    "
          );
        });
      },
    });
  });
});
