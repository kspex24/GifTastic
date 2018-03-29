//Create array of cities for ibitial buttons

      // Initial array of movies
      var cities = ["LSU", "USC", "Notre Dame", "Oregon", "Alabama", "Georgia Tech", "Clemson", "Florida State"];

    //Create click event to store text input

    //Push input to city array

    //Function to make buttons for each city in array, append to div

        function createButtons() {

        $("#topicBtns").empty();

        // Looping through the array of cities
                        for (var i = 0; i < cities.length; i++) {

                        //  Generate buttons for each city in the array.
                        
                          var cityBtn = $("<button>");
                          
                          cityBtn.addClass("city");
                          // Adding a data-attribute with a value of the movie at index i
                          cityBtn.attr("data-name", cities[i]);
                          // Providing the button's text with a value of the movie at index i
                          cityBtn.text(cities[i]);
                          // Adding the button to the HTML
                          $("#topicBtns").append(cityBtn);
                        }
        }

// This function handles events where one button is clicked
$("#addTopic").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line will grab the text from the input box
  var newCityInput = $("#topicInput").val().trim();
  // The movie from the textbox is then added to our array
  cities.push(newCityInput);

  // calling renderButtons which handles the processing of our movie array
  createButtons();
});

// Calling the renderButtons function at least once to display the initial list of movies
createButtons();


//Click event for city buttons to access 10 images from giffy api

//create var query url, ajax method, display data from ajax 

$(".city").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var cityPics = $(this).attr("data-name");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=x32n0DhaGUvtJB5iyZrrR89szqADjIy5&q="+cities+"&limit=10&offset=0&rating=PG&lang=en"
    
    
    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;

        console.log(results)

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div with the class "item"
            var gifDisplayDiv = $("<div class='item'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var cityImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            cityImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDisplayDiv.append(p);
            gifDisplayDiv.append(cityImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#topicPics").prepend(gifDisplayDiv);
          }
        }
      });
  });