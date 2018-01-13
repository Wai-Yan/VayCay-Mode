/* global $ */

$(document).ready(function() {

<<<<<<< HEAD
// 
// $("#card").flip({
//   axis: 'y',
//   trigger: 'click'
// });
=======
///
$("#card").flip({
  axis: 'y',
  trigger: 'click'
});
>>>>>>> 5cf2deb8ada92e65aa145911a2508d3d95617f7a

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


$("#addTrip").click(function() {
  fillCarousel();
  
  function fillCarousel() {
    console.log("lmao");
    }
});

});




/// end
