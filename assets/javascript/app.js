/* global $ */

$(document).ready(function() {

<<<<<<< HEAD

=======
///
>>>>>>> origin/master
// $("#card").flip({
//   axis: 'y',
//   trigger: 'click'
// });
<<<<<<< HEAD

=======
>>>>>>> origin/master

/// this sets the current date for the date selector
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }

today = yyyy+'-'+mm+'-'+dd;
$(".calendar").attr("min", today);



//function to autofill city name and retreive google data 
var input = document.getElementById('cityInput');
var autocomplete = new google.maps.places.Autocomplete(input, {types: ['(cities)']});
google.maps.event.addListener(autocomplete, 'place_changed', function(){
 var place = autocomplete.getPlace();
console.log(place);
console.log("place is: " + place.formatted_address);
})

//on click function when user clicks the add button 
$(document).on("click", "#destinationSubmit", function(event){
	event.preventDefault();
	console.log("button works");
})

//function to fill carousel
$("#addTrip").click(function() {
  fillCarousel();

  function fillCarousel() {
    console.log("lmao");
    }
});
/// end

});
<<<<<<< HEAD
=======







/// end
})


>>>>>>> origin/master
