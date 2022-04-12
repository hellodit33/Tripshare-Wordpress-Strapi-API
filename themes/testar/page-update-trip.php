<?php
/*
Template Name: Update Trip 
*/
    get_header();
  ?>
  
  
  <h1 class="title-pages">Join a trip with fellow travelers!</h1>
                <!-- here a div where the trips are fetched with the edit button under them -->

    <div id="tripsFetched"></div>
    
<br>




</body>
 <!-- fetch function to get all the trips with the edit button -->

<script>
getDataFromStrapi();</script>



  <?php
    get_footer();
  ?>