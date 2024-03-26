// This is the main file for the app
// using jQuery
// Toggle cogwheel icon on click
$(document).ready(function() {
  $('.cogwheel').click(function() {
    // A popup will appear with the settings
  });
  // Hide the settings popup when the user clicks outside of it
  // Later...

  // Slide list of item left
  $('img.left').click(function() {
    // Set task container to the left
    // Create a new left div element
    var newDiv = $('<div class="green task-container border-green">New Left Div Content</div>');
    
    // Add the new div before the "nav" div
    $('.nav').after(newDiv);

    // Remove the last div that is not the "nav" div
    $('.lists > div:not(.nav):last').remove();
  });
  // Slide list of item right
  $('img.right').click(function() {
    // Set task container to the right
    // Create a new right div element
    var newDiv = $('<div class="pink task-container border-pink">New Right Div Content</div>');
    
    // Add the new div after the "nav" div
    $('.lists').append(newDiv);

    // Remove the first div that is not the "nav" div
    $('.lists > div:not(.nav):first').remove();
  });
});

