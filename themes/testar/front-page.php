  <?php
    get_header();
  ?>
   <section>
  <div class="centered">
    <div class="container">
      <h1>Share a vacation trip
        with fellow travelers!</h1>
    
    <h3 class="catchphrase">Are you ready?</h3>
  <!-- Function to get down to the trips' buttons -->
    <script>const scrollToTrips = () => {
  window.scrollTo({
    top: 1570,
    behavior: 'smooth'
  });
};
</script>
    <button class="findtrips-button" onclick=scrollToTrips()>Find your next trip</button>

    
    </div>
</div>
  </section>

  <div class="sektion">
 
 <h3 class="index-about">Share a electric car and hit the road together with fellow travelers!</h3><br>

 <p class="index-about-txt">With Tripshare you can rent a car to travel together with people you haven't met yet. To do so,
   just write in your destination, your trip dates and how many you are and Tripshare will find people 
   who have similar ideas.</p><p> Then it's time to talk and plan before using Tripshare's booking system and book a car. 
   You can get the best prices thanks to our search system which links to many icelandic rental companies.</p><p>
   When it's time to pay, the costs are splitted and you only pay your part on the site. Soon enough, you'll meet up with your fellow travelers and hit the road.</p><p>Wanna know more? Watch our video!</p>
</div>

<video width="600" height="350" controls>
 <source src="/wp-content/uploads/2022/04/Discover-more.mp4" type="video/mp4">
</video>

<div class="buttons-index">
  <h1 class="title-index">Join a trip with fellow travelers!</h1>
    <!-- Buttons to pick a trip after preferences and geolocation, each function being a fetch function -->

  <h2>What would you like to do?</h2>
  <button onclick=fetchNorthernLights();>Northern Lights</button>
  <button onclick=fetchCouchsurfing();>Couchsurfing</button>
  <button onclick=fetchWaterfalls();>Waterfalls</button>
  <button onclick=fetchSpontaneousTrip();>Spontaneous Trip</button>
  <button onclick=fetchWhaleWatching();>Whale Watching</button><br><br>

  <button onclick=fetchSwimmingPool();>Swimming Pool</button>
  <button onclick=fetchRelax();>Relax</button>
  <button onclick=fetchHiking();>Hiking</button>
  <button onclick=fetchGlacierWalk();>Glacier Walk</button>
  <button onclick=fetchCamping();>Camping</button>

  <button onclick=fetchParty();>Party</button><br><br>
  <button onclick=fetchPhotography();>Photography</button>
  <button onclick=fetchSport();>Sport</button>
  <button onclick=fetchHotSprings();>Hot Springs</button>
  <button onclick=fetchFarmStay();>Farm Stay</button>

  <br><br>
  <h2>Where would you like to go?</h2>
  <button onclick=fetchNorth();>North</button>
  <button onclick=fetchSouth();>South</button>
  <button onclick=fetchGoldenCircle();>Golden Circle</button>  
  <button onclick=fetchHiddenGem();>Hidden Gem</button>
  <button onclick=fetchSnaefellsnes();>Snaefellsnes</button>
  <button onclick=fetchRingRoad();>Ring Road</button>
  <button onclick=fetchMountainTrip();>Mountain Trip</button>
  <button onclick=fetchFjords();>Fjords</button>
  <!-- Button to find any kind of trip -->

<h2>Up for anything?</h2>
<button onclick="getDataFromStrapi();">Find all trips</button>
</div>
  <!-- div where the trips are shown -->

    <div id="tripsFetched"></div>

    
<br>


</body>
  <!-- function fetching all the trips -->

<script>
    getDataFromStrapi();
    
</script> 


  <?php
    get_footer();
  ?>