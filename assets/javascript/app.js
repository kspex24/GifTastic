//Document ready funcion

$( document ).ready(function() {
  console.log( "ready!" );

//Create array of cities for ibitial buttons, define variables
      var teams = ["LSU", "USC", "Michigan", "Oregon", "Alabama", "Georgia Tech", "Clemson", "Baylor"];
      var teamBtn;
      var teamPics;
      var queryURL;
      var results;
      var gifDisplayDiv;
      var rating;
      var p;
      var teamImage;
      var newTeamInput;
      var state;

    //Create click event to store text input, //Function to make buttons for each team in array, append to div

        function createButtons() {

        $("#topicBtns").empty();
        

        // Loopthrough the array of teams
                        for (var i = 0; i < teams.length; i++) {

                        //  Generate buttons for each team in the array.
                        
                          var teamBtn = $("<button>");
                          
                          teamBtn.addClass("team");
                          teamBtn.addClass("btn btn-lg")
                          // Adding a data-attribute with a value of the movie at index i
                          teamBtn.attr("data-name", teams[i]);
                          // Providing the button's text with a value of the movie at index i
                          teamBtn.text(teams[i]);
                          // Adding the button to the HTML
                          $("#topicBtns").append(teamBtn);
                        }
        }

// Calling the createButtons function at least once to display the initial list of teams
    createButtons();


//Click event for team buttons to access 10 images from giffy api, Push input to teams array

  // This function adds new tean button when submit is clicked
         $(document).on("click", "#addTopic", function(event) {
          
          event.preventDefault();

          // This line will grab the text from the input box
          
          var newTeamInput = $("#topicInput").val().trim();
         
          // The team from the textbox is then added to array

          teams.push(newTeamInput);

          //The text input field is emptied after click

          $('#topicInput').val("");
          
          console.log(teams)

          // calling renderButtons which handles the processing of our movie array
          createButtons();
    });  

//create var query url, ajax method, display data from ajax 

$(document).on("click", ".team", function() {

    // In this case, the "this" keyword refers to the button that was clicked, the div with item class where gifs are displayed is emptied and variable for teamPics is created
    
    $(".item").empty();
    var teamPics = $(this).attr("data-name");

    // Constructing a URL to search Giphy for the name of the team on the button plus the string college football
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=x32n0DhaGUvtJB5iyZrrR89szqADjIy5&q==="+teamPics+"+college+football&limit=10&offset=0&rating=PG&lang=en"
    

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
            var rating = results[i].rating.toUpperCase();
            var title = results[i].title.toUpperCase();

            // Creating a paragraph tag with the result item's rating and adding a class to it
            var p = $("<p>").text("Title: "+title + " ----- "+"Rating: " + rating + " ----- "+"Click gif to play, click again to pause.");
            $(p).addClass("picRating");


            // Creating an image tag
            var teamImage = $("<img>");

            // Giving the image tag an src attribute of a property pulled off the
            // result item
            teamImage.attr("src", results[i].images.fixed_height_still.url);
            teamImage.addClass("picBtn");
            teamImage.attr({'data-still' : results[i].images.fixed_height_still.url});
            teamImage.attr({'data-state' : "still"});
            teamImage.attr({'data-animate' : results[i].images.fixed_height.url});
            // teamImage.attr({'data-state' : "animate"});
            
            // Appending the paragraph and teamImage we created to the "gifDisplayDiv" div
            
            gifDisplayDiv.append(p);
            gifDisplayDiv.append(teamImage);

            // Prepending the gifDiv to the "gifDisplayDiv" div in the HTML
            $("#topicPics").prepend(gifDisplayDiv);
          }
        }
 });
});

      $(document).on("click", ".picBtn", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
       console.log("click")


        var state = $(this).attr("data-state");

        console.log(state);
        
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }


 
  });

});