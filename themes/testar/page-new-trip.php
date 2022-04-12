
<?php

/*
Template Name: New Trip 
*/
    get_header();
  ?>
  


  <h1 class="title-pages">Post a new trip</h1>
<div class="loginform">

    <p class="titel">Log in to continue</p>
    <input type="text" name="user" id="user" placeholder="Username" onchange="userValidate(this);">
    <div id="userError" class="errorInfo"></div>
    <br>
    
    <input type="email" name="email" id="email" placeholder="Email" onchange="emailValidate(this);">
    <div id="emailError" class="errorInfo"></div>
    <br>

    <input type="password" name="password" id="password" placeholder="Password"onchange="passwordValidate(this);">
    <div id="passwordError" class="errorInfo"></div>
</div>
<div class="newtripform">
  
    <p class="titel">Fill in the details for your trip</p>
    <form id="imageentry">
    <label for="name">Give a name to your trip</label><br>
    <input type="text" name="name" id="name" onchange="tripNameValidate(this);">
    <div id="tripNameError" class="errorInfo"></div>
<br>
   
        <label for="tripMap2">Upload map</label><br>
        <input type="file" name="tripMap2" id="tripMap2">
  <br>
    
    </form>
    
<div>
    <label for="description">Description</label><br>
    <input type="text" name="description" id="description" onchange="tripDescriptionValidate(this);">
    <div id="tripDescriptionError" class="errorInfo"></div>
</div><br>
<div>
    <form name="newtripseats">
    <label for="seats">Seats</label><br>
    <input type="number" name="seats" id="seats" onchange="tripSeatsValidate(this);">
    <div id="tripSeatsError" class="errorInfo"></div>
</form>
<br>
<div>
    <form name="newtripleaving">
    <label for="tripDates-leaving">Leaving on:</label><br>
    <input type="date" name="tripDates-leaving" id="tripDates-leaving" placeholder="Departure date" onchange="tripLeavingDatesValidate(this);">
    <div id="tripLeavingDateError" class="errorInfo"></div>
</form>
</div><br>
<div>
    <form name="newtriparriving">
    <label for="tripDates-arriving">Arriving on</label><br>
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
         
  
    


    <button onclick="postTrip();">Create a trip</button>
</div>
<div id="tripsFetched"></div>
<br>

<script type = "text/JavaScript" src = "https://momentjs.com/downloads/moment.js"></script>
<script src="newtrip.js"></script>





  <?php
    get_footer();
  ?>