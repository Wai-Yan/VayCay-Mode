## **VayCay Mode**

Vaycaymode is an application built for the traveller who can't take their mind off of their upcoming vacation.  It gives the user a diversion from their every day tasks and remind themselves that better days to come.  It also serves as a planning tool, allowing the user to check the current weather forecast, create packing and to-do lists, and even organize their thoughts as a blog.

## **Motivation**

This application was created both to satisfy a need for users, as well as to demonstrate our ability as full stack web developers.  Our goal was to create a user experience that was simple, yet valuable.  This project also allows for continuous development through sharability and increased integration with external services.   

## **Code Style**

Object-Oriented Programming (OOP).

## **Screenshots**

![Landing Page](assets/images/screenshots/Landing-Page.jpg?raw=true "Landing Page")

![Enter Trips](assets/images/screenshots/Enter-Trips.jpg?raw=true "Enter Trips Page")

## **Technologies and frameworks used**

**Built with**

- [Bootstrap](https://getbootstrap.com/) and Custom CSS
- [Flipclock](flipclockjs.com)
- [Google Fonts](https://fonts.google.com/)
- [Now UI Kit](http://demos.creative-tim.com/now-ui-kit/index.html)
- Vanilla [JavaScript](https://www.javascript.com/)
- [jQuery](https://jquery.com/)
- Moment[Javascript](https://momentjs.com/)
- Clipboard [Javascript](https://clipboardjs.com/)
- [Firebase](https://firebase.google.com/)
- [Google Maps](https://maps.google.com/) API
- [Open Weather Map](https://openweathermap.org/) API

## **Features**

- Each trip is tagged to the unique user, allowing all elements of the trip to persist upon reload 
- Users are able to store as many trips as they would like.  They also have the ability to delete or remove trips
- Flipclock allows users to determine to the second how far away a trip is.  The flipping of the seconds also creates movement and a dynamic experience for the user 
- The current weather forecast allows users to plan for their trip days in advance 
- Google Maps allows a user to navigate the city they are attending to find destinations of interest
- Packing list and blog allow users to organize their thoughts prior to departing
- Responsive web application design allows different types of devices to access information.

## **Code Example**

adds an item to the packing list 

$("#addPackingItem").on("click", function(event) {
    event.preventDefault();

    var itemValue = $("#packingListItem").val().trim();
    if(!Array.isArray(packListArr)){
      packListArr = [];
    }

    $("#packingListItem").val("");

    if (itemValue !== "") {
      packListArr.push(" " + itemValue);
      createPackingListObj(packListArr);
    }

  });


## **Installation**

**Requirements:**

- Web Browser
- Web Developer Tools
- Text Editor

## **API Reference**

_Open Weather API:_

[https://openweathermap.org/forecast5](https://openweathermap.org/forecast5)

_Google Maps API:_

[https://developers.google.com/maps/documentation/javascript/3.exp/reference](https://developers.google.com/maps/documentation/javascript/3.exp/reference)

_FourSquare API:_

[https://developer.foursquare.com/docs/api/getting-started](https://developer.foursquare.com/docs/api/getting-started)

## **Tests**

Most tests for this application are rune with a simple console.log()method. If the correct/expected information returns, then the team knows that the program is functioning.

    var queryURL3 = "https://api.foursquare.com/v2/venues/" + idArray[i] + "?v=" + date + "&clientSecret=" + clientSecret + "&client_id=" + clientID;

    $.ajax({
    url: queryURL3,
    method: "GET"
    }).done(function(checkins) {

    **console.log(checkins);**

    popularity = checkins.response.venue.stats.checkinsCount
    $("#markerCheckins1").text(popularity)

    //document.getElementById("#markerCheckins").innerHTML = popularity;
    **console.log("checkins:", popularity);**

    });

## **How to use?**

The Website is divided into three main sections:

1.    __Google Maps API__

- Dynamic search box to navigate desired locations and places of interest &amp; D.C. Recommended Locations for Restaurants, Museums, Hotels, and, Bars &amp; Clubs included in the navigation bar.
- Each will provide markers based on the current viewport.
- The markers that are generated can be clicked to provide a modul with a plethora of information about the desired location.

2.    __Weather__

- A table is generated with the following 24-hours @ 3-hour intervals
- To generate the table two criteria are needed:
- The city name should be typed as accurate as possible
- The country should entered as 2-or-3 digit Country Code
- Example: Baltimore, US
- The table will display information for the Date &amp; Time(in Military Time), Weather Temperature at that time of day, and the Weather description for that time of day
- Example: 2018-01-24 03:00:00      44.85 F     Clear - clear sky

3.    __Site Feedback__

- A form that provides the user with a outlet to display their experience with the website's information
- Name, Rating, Comments
- The information is displayed using firebase, in table format and the information is used by the Website to provide a better user experience and to help guide future development

## **Credits**

This application was built by [Athina](https://github.com/Coolaide), [Dan](https://github.com/DanYee92), [Mehvish](https://github.com/mqamar1), [Sean](https://github.com/andersensm), and [Taqwa](https://github.com/TaqwaR) -- Full Stack Web Development Students at George Washington University's Coding Boot Camp.

