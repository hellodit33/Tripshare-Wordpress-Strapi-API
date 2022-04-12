
<?php

/*
Template Name: New Trip 
*/
    get_header();
  ?>
  

      <!-- here a form to post a trip -->

  <h1 class="title-pages">Post a new trip</h1>
            <!-- first div loginform for design css rules -->

<div class="loginform">
                  <!-- each input has a validating function and the div under it gets error messages -->

    <p class="titel">Log in to continue:</p>
    <input type="text" name="user" id="user" placeholder="Username" onchange="userValidate(this);">
         <!-- this error message also shows "unfortunately it did not work" when the login details are not valid after clicking on create a trip -->

    <div id="userError" class="errorInfo"></div>
    <br>
    
    <input type="email" name="email" id="email" placeholder="Email" onchange="emailValidate(this);">
    <div id="emailError" class="errorInfo"></div>
    <br>

    <input type="password" name="password" id="password" placeholder="Password"onchange="passwordValidate(this);">
    <div id="passwordError" class="errorInfo"></div>
</div>
              <!-- div newtripform for design css rules -->

<div class="newtripform">
  
    <p class="titel">Fill in the details for your trip:</p>
   
    <label for="name">Give a name to your trip:</label><br>
    <input type="text" name="name" id="name" onchange="tripNameValidate(this);">
    <div id="tripNameError" class="errorInfo"></div>
<br>
<form id="imageentry">
        <label for="tripMap2">Upload map:</label><br>
        <!-- To submit a map to the entry, the picture is first downloaded to strapi on select on this input file, then when posting the trip, this image id and url are selected into the new trip -->

        <input type="file" name="files" accept="image/*" onchange="submitPicture()"><br>
       

      </form>
  <br>
    
 
    
<div>
    <label for="description">Description:</label><br>
    <input type="text" name="description" id="description" onchange="tripDescriptionValidate(this);">
    <div id="tripDescriptionError" class="errorInfo"></div>
</div><br>
<div>
                              <!-- form to validate the number of seats with the form's name and the input field's name -->

    <form name="newtripseats">
    <label for="seats">Seats:</label><br>
    <input type="number" name="seats" id="seats" onchange="tripSeatsValidate(this);">
    <div id="tripSeatsError" class="errorInfo"></div>
</form>
<br>

<div>
                          <!-- form to validate the dates with the form's name and the input field's name -->

    <form name="newtripleaving">
    <label for="tripDates-leaving">Leaving on:</label><br>
    <input type="date" name="tripDates-leaving" id="tripDates-leaving" placeholder="Departure date" onchange="tripLeavingDatesValidate(this);">
    <div id="tripLeavingDateError" class="errorInfo"></div>
</form>
</div><br>
<div>
    <form name="newtriparriving">
    <label for="tripDates-arriving">Arriving on:</label><br>
    <input type="date" name="tripDates-arriving" id="tripDates-arriving" placeholder="Arriving date" onchange="tripArrivingDatesValidate(this);">
    <div id="tripArrivingDateError" class="errorInfo"></div>

</form>
</div><br>

<div>
    <label for="leavingDestination">Leaving from:</label><br>
    <input type="text" name="leavingDestination" id="leavingDestination" placeholder="the place you're leaving from" onchange="tripLeavingDestinationValidate(this);">
    <div id="tripLeavingDestinationError" class="errorInfo"></div>
</div>
<div><br>
    <label for="betweenDestination">First stop:</label><br>
    <input type="text" name="betweenDestination" id="betweenDestination">
</div>
<div><br>
    <label for="betweenDestination2">Second stop:</label><br>
    <input type="text" name="betweenDestination2" id="betweenDestination2">
</div>
<div><br>
    <label for="betweenDestination3">Third stop:</label><br>
    <input type="text" name="betweenDestination3" id="betweenDestination3">
</div>
<div><br>
    <label for="arrivingDestination">Coming back to:</label><br>
    <input type="text" name="arrivingDestination" id="arrivingDestination" placeholder="the place you're finishing your trip at" onchange="tripArrivingDestinationValidate(this);">
    <div id="tripArrivingDestinationError" class="errorInfo"></div>
</div>
</div><br>
         
  
    
                      <!-- function to post the trip -->


    <button onclick="postTrip();">Create a trip</button>
</div>
                      <!-- div where the trips are fectched and shownn after posting a trip -->

<div id="tripsFetched"></div>
<br>

<script src="newtrip.js"></script>





  <?php
    get_footer();
  ?>