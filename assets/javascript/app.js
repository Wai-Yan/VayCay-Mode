/* global $ */
/* global google */

$(document).ready(function() {
  var place = "";
  var destination = "";
  var destinationDate = 0;
  var latitude = 0;
  var longitude = 0;

  var signinInput;
  var keys = [];
  var users = [];
  var map;

  //Initailize Firebase
  var config = {
    apiKey: "AIzaSyCK6_akMjy07IekkbM6Mvq7nX9n1bMJIpY",
    authDomain: "vacayproject-c7e75.firebaseapp.com",
    databaseURL: "https://vacayproject-c7e75.firebaseio.com",
    projectId: "vacayproject-c7e75",
    storageBucket: "vacayproject-c7e75.appspot.com",
    messagingSenderId: "127370399579"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // Create reference for firebase's node "users"
  var usersRef = firebase.database().ref("users");
  // // Hide main-content when the page first loaded
  // $("#main-content").hide();
  // // Check what button was clicked
  // $("button").click(function() {
  //   event.preventDefault();
  //   var button_clicked = $(this).attr('id');
  //   console.log(button_clicked);
  //
  //   $("#sign-in").hide();
  //   $("#main-content").show();
  //
  //   if (button_clicked === "register") {
  //     usersRegister();
  //   } else if (button_clicked === "sign_in") {
  //     usersSignin();
  //   }
  // });

  //function to render rows
  function renderRows(place) {
    $(".tableRow").empty()
    // console.log("render rows works")
    // console.log("render rows: " + place.formatted_address)
    // console.log(place.formatted_address);
    var tBody = $("tbody");
    var tRow = $("<tr>");

    var destinationTD = $("<td>").text(place.formatted_address);
    destinationTD.attr("class", "citySelect").attr("data-city", place.formatted_address).attr("data-lat", place.geometry.location.lat).attr("data-lng", place.geometry.location.lng).attr("data-id", place.place_id).attr("data-date", destinationDate);
    var destinationDateTD = $("<td>").text(destinationDate).attr("data-city", place.formatted_address).attr("data-date", destinationDate);
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
}

//click function on table data
$(document).on("click", ".citySelect", function(event){
  destination = $(this).attr("data-city")
  destinationDate = $(this).attr("data-date")
  var userLatitude = parseFloat($(this).attr("data-lat"));
  var userLongitude = parseFloat($(this).attr("data-lng"));
  console.log(userLatitude);
  console.log(userLongitude);
  retrieveGoogleApi(userLatitude, userLongitude);
  countDownDisplay(destinationDate, destination);
})


//on click function when user clicks the add button
$(document).on("click", "#addTrip", function(event){
	event.preventDefault();
  storeInputValues(retrieveLocation());
	// console.log("button works");
  renderRows(retrieveLocation());
  showCurrentWeather(retrieveLocation())
  showForecastedWeather(retrieveLocation());
  fillCarousel();
  initMap(retrieveLocation());
  countDownDisplay(destinationDate, destination);
  $("#cityInput").val("");
  $("#dateInput").val("");
  })

  // function to delete packing list item
  $(document.body).on("click", ".showTrash", function() {
    var listRow = $(this).parent();
    // console.log(listRow)
    // Select and Remove the specific <p> element that previously held the to do item number.
    listRow.remove();
  });



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



  function fillCarousel() {
    // console.log("lmao");
  }

  // function to generate and initiate clock countdown flip
  function countDownDisplay(destinationDate, destination) {
    // print the clicked or entered city in the message area
    $(".countdownMessage").text("Count down to your trip to " + destination + "!")
    var clock;
    // Grab the current date
    var currentDate = moment();
    console.log("currentdateformat", currentDate)
    // Grabbing the date from the city
    var futureDate = moment(destinationDate);
    console.log("future date format", futureDate)
    // Calculate the difference in seconds between the future and current date
    var diff = futureDate.diff(currentDate, 'seconds');
    console.log(diff)
    // Instantiate a countdown FlipClock
    clock = $('.clock').FlipClock(diff, {
      clockFace: 'DailyCounter',
      countdown: true
    });
  };

  function initMap(place) {

    console.log(place);
    console.log("What's going on");

    var userLatitude = place.geometry.location.lat();
    var userLongitude = place.geometry.location.lng();

    console.log(userLatitude);
    console.log(userLongitude);

    var userCoordinate = {lat: userLatitude, lng: userLongitude};

    console.log(userCoordinate);

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: userCoordinate
    });

    console.log(map);

    var marker = new google.maps.Marker({
      position: userCoordinate,
      map: map
    });
  }

  function showCurrentWeather(userPlace) {
    /*
      Shows the main weather component-- current weather
    */

    $("#currentWeather").empty();

    var userCity = userPlace.formatted_address;
    userCity = userCity.split(",");
    userCity[0] = userCity[0].replace(/\s/g, '+');
    userCity = userCity.join(",");
    userCity = userCity.split(",");
    var userCityLength = userCity.length;

    for (var i = 0; i < userCityLength; i++) {
      userCity[i] = userCity[i].replace(/\s/g, '');
    }

    userCity = userCity.join();

    var weatherAPIKey = "ef097988a11b755c604a7aad621cf60d";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=" + weatherAPIKey;

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
  }

  function showForecastedWeather(userPlace) {
    /*
      Grabs a 5 day forecast and projects temperature and icon into HTML
    */

    $("#forecastedWeather").empty();

    var userCity = userPlace.formatted_address;
    userCity = userCity.split(",");
    userCity[0] = userCity[0].replace(/\s/g, '+');
    userCity = userCity.join(",");
    userCity = userCity.split(",");
    var userCityLength = userCity.length;

    for (var i = 0; i < userCityLength; i++) {
      userCity[i] = userCity[i].replace(/\s/g, '');
    }

    userCity = userCity.join();

    var newForecastImage, date;
    var weatherAPIKey = "ef097988a11b755c604a7aad621cf60d";

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&units=imperial&appid=" + weatherAPIKey;

    console.log(queryURL);

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
    if (itemValue === "") {
    } else {
      var listRow = $("<div>").addClass("row listRow")
      var itemColumn = $("<div>").addClass("col-auto listColumn")
      var trashColumn = $("<div>").addClass("col-2 trashColumn")
      var itemText = $("<p>").addClass("list-p")
      itemText.text(itemValue)
      itemColumn.append(itemText)
      var trashItem = $("<span>").addClass("fa fa-trash-o")
      trashColumn.append(trashItem)
      trashColumn.attr("value", itemValue)
      listRow.append(itemColumn, trashColumn)
      $("#packingListView").append(listRow)
      packListArr.push(" " + itemValue)
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
    $(".copyButton").tooltip('enable')
      .attr('data-original-title', message)
      .tooltip('show')
      .tooltip('disable')
  }

  function hideTooltip(btn) {
    setTimeout(function() {
      $(".copyButton").tooltip('hide')
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

  // function to add blog posts on save click
  $(document.body).on("click", "#blogSaveBtn", function() {
    var savedTime = moment().format('MMMM Do YYYY, h:mm:ss a')
    var blogTitle = $("#blogPostTitle").val().trim()
    var blogPost = $("#blogPostEntry").val().trim()
    var blogEntry = ("<div class='blogEntryContainer my-2'>") + ("<div class='blogTitleView'>") + blogTitle + ("</div>") + ("<div class='blogTimeStampView'>") + "Posted on: " + savedTime + ("</div>") + ("<div class='blogEntryView'>") + blogPost + ("</div>") + ("</div>")
    $("#blogPostArea").prepend(blogEntry)
  })

  // add signout button and log the user out once clicked
  $("#logoutbtn").on("click", function(event){
    event.preventDefault();
    firebase.auth().signOut()
    firebase.auth().signOut().then(function() {
  window.location.replace("login.html")
}).catch(function(error) {
  console.log("test log out error")
});
  })


// ************ Firebase Section ************ //
  function usersRegister() {
    var newUsername = $("#username").val().trim();
    var newPassword = $("#password").val().trim();
    console.log(newUsername);
    console.log(newPassword);

    if (newUsername !== "" && newPassword !== "") {
      var uid = newUsername + "-" + newPassword;
      console.log(uid);

      //store username and password in firebase
      usersRef.child(uid).set({
          username: newUsername,
          password: newPassword
      });

    } else {
      //alert("UID is Empty");
    }

    // clear input boxes
    $("#username").val("");
    $("#password").val("");

  }

  function usersSignin() {
    var signUsername = $("#username").val().trim();
    var signPassword = $("#password").val().trim();
    signinInput = signUsername + "-" + signPassword;

    console.log("signUsername", signUsername);
    console.log("signPassword", signPassword);

    for (var i = 0; i < keys.length; i++) {
      if (keys[i] === signinInput) {
        console.log("FOUND!!");
        break;
      } else {
        //not found try again
        console.log("NOT FOUND!!");
      }
    }
    $("#username").val("");
    $("#password").val("");
  }
  // ************ End Firebase Section ************ //

  //************ Google API Images Section ************ //
  function fillCarousel(place){
    var googleAPIKey = "AIzaSyDZ2PsxQZzTNdRZFBMeQ9uRixxw8taSmjA";

    var lat = place.geometry.location.lat();
    var lon = place.geometry.location.lng();

    var nearbyplacesURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lon + "&radius=500&type=sightseeing&key=" + googleAPIKey;

    console.log("latitude", lat);
    console.log("longitude", lon);
    console.log("nearbyplacesURL", nearbyplacesURL);

    //call place nearby API
    $.ajax({
      crossDomain: true,
      url: nearbyplacesURL,
      dataType: 'json',
      // jsonpCallback: 'callback',
      //contentType: "application/json; charset=utf-8;",
      success: function(response2){
         console.log(JSON.stringify(response2));
       },
      method: "GET"
    })
    .done(function(response) {
      console.log("place nearby API", response);
    });

  }

    function retrieveGoogleApi(userLatitude, userLongitude) {

      var userCoordinate = {lat: userLatitude, lng: userLongitude};
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: userCoordinate
      });
      var marker = new google.maps.Marker({
        position: userCoordinate,
        map: map
      });
    }
});
// End document
