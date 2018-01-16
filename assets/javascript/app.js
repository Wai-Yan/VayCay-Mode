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
    // console.log("render rows works")
    // console.log("render rows: " + place.formatted_address)
    // console.log(place.formatted_address);
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
  function storeInputValues(place) {
    console.log("storeInputValues works")
    destination = place.formatted_address;
    var rawDestinationDate = $("#dateInput").val().trim();
    destinationDate = moment(rawDestinationDate).format('MM/DD/YYYY');
    // console.log("destination is" + destination);
    // console.log("destination date is: " + destinationDate);
  }

  //click function on table data
  $(document).on("click", ".citySelect", function(event) {
    destination = $(this).attr("data-city")
    console.log("This is the value when you click on a city: " + destination);
  })


  //on click function when user clicks the add button
  $(document).on("click", "#addTrip", function(event) {
    event.preventDefault();
    storeInputValues(retrieveLocation());
    // console.log("button works");
    renderRows(retrieveLocation());
    showCurrentWeather(retrieveLocation())
    showForecastedWeather(retrieveLocation());
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
    console.log(place);
    return place;
  }

  // //on click function when user clicks the add button
  // $(document).on("click", "#addTrip", function(event){
  //   event.preventDefault();
  //   console.log("button works");
  //   renderRows(retrieveLocation);
  // });


  function fillCarousel() {
    // console.log("lmao");
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
  };

  function showCurrentWeather(userPlace) {
    /*
      Shows the main weather component-- current weather
    */

    var userCity = userPlace.formatted_address;
    userCity = userCity.replace(/\s/g, '');

    var APIKey = "ef097988a11b755c604a7aad621cf60d";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .done(function(response) {
        $("#currentWeather").text("Temperature (F) " + response.main.temp);
        var newImage = $("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
        $("#currentWeather").prepend(newImage);
      });
  };

  function showForecastedWeather(userPlace) {
    /*
      Grabs a 5 day forecast and projects temperature and icon into HTML
    */

    var userCity = userPlace.formatted_address;
    userCity = userCity.replace(/\s/g, '');

    var newForecastImage, date;
    var APIKey = "ef097988a11b755c604a7aad621cf60d";

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .done(function(response) {

        for (var i = 0; i < 6; i++) {
          newForecastImage = $("<img src='http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png'>");
          $("#forecastedWeather").append(newForecastImage);

          date = (response.list[i].dt_txt).slice(0, 11);

          $("#forecastedWeather").append(date + "|" + response.list[i].main.temp + "Fahrenheit");
        }
      });
  }


  // function to add items to packing list
  var packListArr = []
  // var packListStr = ""

  $("#addPackingItem").on("click", function(event) {
    event.preventDefault();
    var itemValue = $("#packingListItem").val().trim();
    // var itemString = String(itemValue)
    // console.log("string", itemString)
    if (itemValue === "") {
    } else {
      var listRow = $("<div>").addClass("row listRow")
      var itemColumn = $("<div>").addClass("col-auto listColumn")
      var trashColumn = $("<div>").addClass("col-2 trashColumn")
      // var checkBox = $("<input>").attr("type", "checkbox")
      var itemText = $("<p>").addClass("list-p")
      itemText.text(itemValue)
      // itemText.prepend(checkBox)
      itemColumn.append(itemText)
      var trashItem = $("<span>").addClass("fa fa-trash-o")
      trashColumn.append(trashItem)
      trashColumn.attr("value", itemValue)
      listRow.append(itemColumn, trashColumn)
      $("#packingListView").append(listRow)
      packListArr.push(" " + itemValue)
      // packListStr = packListArr.join()
      $("#packingListItem").val("");
    }
  });

  // Add a "checked" symbol when clicking on a list item
  $(document.body).on("click", ".listColumn", function() {
    var listItem = $(this).parent();
    listItem.toggleClass("col-checked");
  })

  // function to delete packing list item
  $(document.body).on("click", ".trashColumn", function() {
    var listRow = $(this).parent();
    var deletedArrItem = (" " + $(this).attr("value"))
    var deletedArrItem = packListArr.indexOf(deletedArrItem)
    packListArr.splice(deletedArrItem, 1)
    listRow.remove();
  });

  // function to initiate tooltip once copy is successful
  $(".copyButton").tooltip({
    trigger: 'click',
  });

  function setTooltip(btn, message) {
    $("btn").tooltip('enable')
      .attr('data-original-title', message)
      .tooltip('show')
      .tooltip('disable')
  }

  function hideTooltip(btn) {
    setTimeout(function() {
      $("btn").tooltip('hide')
    }, 1000)
  }

  // beginning of function for clipboard
var clipboard = new Clipboard(".copyButton", {
  text: function(trigger) {
    return packListArr;
  }
});

  // checks if items have been copied
  clipboard.on('success', function(e) {
    console.info('Action:', e.action)
    console.info('Text:', e.text)
    console.info('Trigger:', e.trigger)
    setTooltip(e.trigger, 'Copied!');
    hideTooltip(e.trigger);
    e.clearSelection()
  })
  clipboard.on('error', function(e) {
    console.error('Action:', e.action)
    console.error('Trigger:', e.trigger)
    setTooltip(e.trigger, 'Failed!');
    hideTooltip(e.trigger);
  })



});
// End document
