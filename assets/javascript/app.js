/* global $ */

$(document).ready(function() {

  var place = "";
  var destination = "";
  var destinationDate = 0
  
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

//function to render rows
function renderRows (place){
    $(".tableRow").empty()
    console.log("render rows works")
    console.log("render rows: " + place.formatted_address)
    console.log(place.formatted_address);
    var tBody = $("tbody");
    var tRow = $("<tr>");

    var destinationTD = $("<td>").text(place.formatted_address);
    destinationTD.attr("class", "citySelect").attr("data-city", place.formatted_address);
    var destinationDateTD = $("<td>").text(destinationDate).attr("data-city", place.formatted_address);
    var trashTD = $("<td>").attr("class", "showTrash");
    var trashSpan = $("<span>").attr("class", "fa fa-trash-o");

    trashTD.append(trashSpan);
    tRow.append(destinationTD, destinationDateTD, trashTD);
    tBody.prepend(tRow);
}

//function to store values from input fields
function storeInputValues(place){
console.log("storeInputValues works")
destination = place.formatted_address;
var rawDestinationDate = $("#dateInput").val().trim();
destinationDate = moment(rawDestinationDate).format('MM/DD/YYYY');
console.log("destination is" + destination);
console.log("destination date is: " + destinationDate);
}

//click function on table data 
$(document).on("click", ".citySelect", function(event){
  destination = $(this).attr("data-city")
  console.log("This is the value when you click on a city: " + destination);
})


//on click function when user clicks the add button 
$(document).on("click", "#addTrip", function(event){
	event.preventDefault();
  storeInputValues(retrieveLocation());
	console.log("button works");
  renderRows(retrieveLocation());
  fillCarousel();
})

  ///
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

   if(dd < 10){
          dd = '0' + dd;
      }
      if(mm < 10){
          mm='0'+mm
      }

  today = yyyy+'-'+mm+'-'+dd;
  $(".calendar").attr("min", today);

  countDownDisplay();

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

  // //on click function when user clicks the add button
  // $(document).on("click", "#addTrip", function(event){
  //   event.preventDefault();
  //   console.log("button works");
  //   renderRows(retrieveLocation);
  // });


  function fillCarousel() {
    console.log("lmao");
  }

  // function to generate and initiate clock countdown flip
  function countDownDisplay() {
    var clock;
    // Grab the current date
    var currentDate = new Date();
    // Set some date in the future. In this case, it's always Jan 1
    var futureDate  = new Date(currentDate.getFullYear() + 1, 0, 1);
    // Calculate the difference in seconds between the future and current date
    var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;
    // Instantiate a countdown FlipClock
    clock = $('.clock').FlipClock(diff, {
      clockFace: 'DailyCounter',
      countdown: true
    });
  }
});
// End document
