/* global $ */

$(document).ready(function() {


  //Initailize Firebase
   var config = {
    apiKey: "AIzaSyDFiW-XEMBCNpnjixW04WxSoybIbyvS9OY",
    authDomain: "alitraintime-fa097.firebaseapp.com",
    databaseURL: "https://alitraintime-fa097.firebaseio.com",
    projectId: "alitraintime-fa097",
    storageBucket: "",
    messagingSenderId: "885151914772"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

/// flip.js function is called here

// $("#card").flip({
//   axis: 'y',
//   trigger: 'click'
// });

  /// this sets the current date for the date selector
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd;
  $(".calendar").attr("min", today);


//function to autofill city name and retreive google data
var input = document.getElementById('cityInput');
var autocomplete = new google.maps.places.Autocomplete(input, {types: ['(cities)']});
google.maps.event.addListener(autocomplete, 'place_changed', retrieveLocation)



//function to retrieve destination from Google
function retrieveLocation(){
var place = autocomplete.getPlace();
console.log(place)
return place;
}

//function to render rows
function renderRows (){
  console.log("render rows works")
  console.log(place.formatted_address)
}


//on click function when user clicks the add button
$(document).on("click", "#addTrip", function(event){

//on click function when user clicks the add button
$(document).on("click", "#destinationSubmit", function(event){
	event.preventDefault();
	console.log("button works");
  renderRows(place)
})
})


  // function to generate and initiate clock countdown flip
  var clock;

  function countDownDisplay() {
    // Grab the current date
    var currentDate = new Date();
    // Set some date in the future. In this case, it's always Jan 1
    var futureDate = new Date(currentDate.getFullYear() + 1, 0, 1);
    // Calculate the difference in seconds between the future and current date
    var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
    // Instantiate a countdown FlipClock
    clock = $('.clock').FlipClock(diff, {
      clockFace: 'DailyCounter',
      countdown: true
    });
  }

  //function to fill carousel
  $("#addTrip").click(function() {
    fillCarousel();

    function fillCarousel() {
      console.log("lmao");
    }
  });
  /// end



  countDownDisplay()

});
