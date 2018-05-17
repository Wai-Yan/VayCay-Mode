## **VAYCAYMODE**

[http://vaycaymode.com/login.html](VaycayMode) is an application built for the traveller who can't take their mind off of their upcoming vacation.  It gives the user a diversion from their every day tasks, and reminds them that better days are to come.  It also serves as a planning tool, allowing the user to check the current weather forecast, create packing and to-do lists, and even organize their thoughts as a blog.

## **Motivation**

This application was created both to satisfy a need for users, as well as to demonstrate our ability as full stack web developers.  Our goal was to create a user experience that was simple, yet valuable.  This project also allows for continuous development through sharability and increased integration with external services.   

## **Code Style**

Object-Oriented Programming (OOP).

## **Screenshots**

![Landing Page](assets/images/Screenshots/Landing-Page.jpg?raw=true "Landing Page")

![Enter Trips](assets/images/Screenshots/Enter-Trips.jpg?raw=true "Enter Trips Page")

## **Technologies and frameworks used**

**Built with**

- [Bootstrap](https://getbootstrap.com/) and Custom CSS
- [Flipclock](flipclockjs.com)
- [Google Fonts](https://fonts.google.com/)
- [Now UI Kit](http://demos.creative-tim.com/now-ui-kit/index.html)
- Vanilla [JavaScript](https://www.javascript.com/)
- [jQuery](https://jquery.com/)
- Moment [Javascript](https://momentjs.com/)
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

{noformat} 

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
{noformat}


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

## **Tests**

Most tests for this application are run with a simple console.log()method. If the correct/expected information returns, then the team knows that the program is functioning.

  $(document.body).on("click", ".edit-blog-button", function() {
    
    var editCol = $(this).parent();
    var wholeRow = editCol.parent()
    var targetCol = wholeRow[0].childNodes[0];
    var entryInfo = [targetCol.childNodes[0].innerText, targetCol.childNodes[2].innerText];

    console.log(targetCol);
    console.log(entryInfo[0]);
    console.log(entryInfo[1]);

    $("#myModal #blogPostTitle").val(entryInfo[0]);
    $("#myModal #blogPostEntry").val(entryInfo[1]);
  });


## **How to use?**

The Website is divided into 7 main sections:

1. __Landing Page__ 

- First time visitors to the site can register by entering an existing google email address or by entering an email address and creating a new password
- Firebase authentication allows verification of login data 
- A unique user is created in Firebase and all data generated throughout the application becomes associated with this unique user 
- returning users will remain logged in unless they explicitly click the log out button

2. __Google Autocomplete__

- Recommends cities based on proximity the user's current location
- Returns metadata specific to the selected city which is then used to populate other components of the site 
- Ensures that the destination entered by the user exists and integrates with other API's

3. __Flipclock__

- Uses moment.js to calculate the difference in time between the destination date and the current time
- Creates movement in the application to keep the user engaged 

4. __Weather__

- Retrieves destination name from Firebase as entered by autocomplete
- Provides a 5 day forecast at 24 hour intervals starting with the current time 
- The weather will be displayed as the day of the week, the temperature rounded to a whole number, and a representation of the weather as an image 

5.  __Packing List__

- An easy way for users to plan for their trips by creating a packing list in a place where they check frequently
- List is saved in Firebase and attached to each individual trip allowing the user to create multiple lists
- Users have the ability to add and delete items, as well as mark items as completed 


6. __Google Maps API__

- Map of city autopopulates when a user creates a new trip
- User can interact with the map based on Google Map built in functionality
- Map takes in the latitude and longitude that is stored in Firebase and originates from the Google autocomplete object 

7. __Blog__

- Custom created blog allows users to share their thoughts leading up to an after their trip
- Blog is stored in Firebase and persists even after a user logs out
- Blogs are destination specific, meaning each trip will have it's own series of blog posts
- Blog entries display a title, the blog text, and the time the entry was submitted
- Users have the ability to edit or delete an existing blog post 




## **Credits**

This application was built by [Angela Kressin](https://github.com/angkressin), [Tak Nalut](https://github.com/tak009), [Wai Yan](https://github.com/Wai-Yan), and [Ali Kassam](https://github.com/alikassam0) -- Full Stack Web Development Students at George Washington University's Coding Boot Camp.

