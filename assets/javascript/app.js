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
  function renderRows(place) {
    $(".tableRow").empty()
    console.log("render rows works")
    console.log("render rows: " + place.formatted_address)
    console.log(place.formatted_address);
    var tBody = $("tbody");
    var tRow = $("<tr>");

    var destinationTD = $("<td>").text(place.formatted_address);
    destinationTD.attr("class", "citySelect").attr("data-value", place.formatted_address);
    var destinationDateTD = $("<td>").text(destinationDate);

    tRow.append(destinationTD, destinationDateTD);
    tBody.prepend(tRow);
  }

  //function to store values from input fields
  function storeInputValues(place) {
    console.log("storeInputValues works")
    destination = place.formatted_address;
    var rawDestinationDate = $("#dateInput").val().trim();
    destinationDate = moment(rawDestinationDate).format('MM/DD/YYYY');
    console.log("destination is" + destination);
    console.log("destination date is: " + destinationDate);
  }


  //on click function when user clicks the add button
  $(document).on("click", "#addTrip", function(event) {
    event.preventDefault();
    storeInputValues(retrieveLocation());
    console.log("button works");
    renderRows(retrieveLocation());
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

  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd;
  $(".calendar").attr("min", today);

  countDownDisplay();

  //function to autofill city name and retreive google data
  var input = document.getElementById('cityInput');
  var autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['(cities)']
  });
  google.maps.event.addListener(autocomplete, 'place_changed', retrieveLocation)

  //function to retrieve destination from Google
  function retrieveLocation() {
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

  //function to fill carousel
  $("#addTrip").click(function() {
    fillCarousel();
  });

  function fillCarousel() {
    console.log("lmao");
  }

  // function to generate and initiate clock countdown flip
  function countDownDisplay() {
    var clock;
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


  // function to add items to packing list
  var packListCount = 0;
  var trashColumn

  $("#addPackingItem").on("click", function(event) {
    event.preventDefault();
    var itemValue = $("#packingListItem").val().trim();
    var itemString = String(itemValue)
    console.log("string", itemString)
    //console.log("recently added item", toAddItem);
    if (itemValue === "") {
      console.log("put modal or tooltip here")
    } else {
      var listRow = $("<div>").addClass("row")
      var itemColumn = $("<div>").addClass("col-auto")
      trashColumn = $("<div>").addClass("col-auto trashColumn")
      //trashColumn.attr("id", "deleteListItem")
      //var listDiv = $("<div>")
      var checkBox = $("<input>").attr("type", "checkbox")
      var itemText = $("<p>")
      itemText.append(" " + itemString)
      itemText.prepend(checkBox)
      itemColumn.append(itemText)
      listRow.attr("id", "item-" + packListCount);
      console.log(packListCount);
      // $(".trashColumn").attr("item-data", packListCount)
      // console.log("this is the trashcolumn value: " + $('.trashColumn').attr("item-data"))
      var trashItem = $("<span>").addClass("fa fa-trash-o")
      trashColumn.append(trashItem)
      listRow.append(itemColumn, trashColumn)
      $("#packingListView").append(listRow)
      $("#packingListItem").val("");

    }
    packListCount++;
  });

  // function to delete packing list item
  $(document.body).on("click", ".trashColumn", function() {
    var listRow = $(this).parent();
    // console.log(listRow)
    // Select and Remove the specific <p> element that previously held the to do item number.
    listRow.remove();
  });



});
// End document
