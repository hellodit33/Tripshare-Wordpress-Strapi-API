//Function to get data from Strapi
async function getDataFromStrapi() {
    //Url to Strapi API to get all trips
    let url = "http://localhost:1337/api/trips?populate=*";
    let apiUrl ="http://localhost:1337";
    
    
    //Gets JSON from API and converts it to JS object 
    let stringResponse = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }});
    let myObject = await stringResponse.json();
    

    console.log(myObject);
    
    let output = "";
    
    //Checks if it's one or several objects that are created
    if (Array.isArray(myObject.data)){
        //This forEach loop goes through every element 
        myObject.data.forEach(element => {
    
           
            let obj = element.attributes;
        
        //if/else if statement for when the map is not downloaded by the user
        //dates become a string without time so that they can get back into the input date field when updating a trip
        //here if user did not upload a map
        //data-id in the main div is used to get the object's id and use it in update and delete functions later
         //the new trip form is not ready for uploading a map neither for selecting preferences and geolocation when creating a trip so this output does not show either map or preferences and geolocation
         if (!obj.geolocation.data && !obj.preferences.data[0] && !obj.preferences.data[1]) {
          
           

            output += `<div data-id=${element.id}>
        

            <div class="kolumner">
            <div class="row">
                <div class="column">
                <h2 class="trip-name">${obj.tripName}</h2>
                <div class="gridinfo">
                <p>Leaving- and arriving date: </p>
              
                <p class="trip-leavingdate">${new Date(obj.TripDates.LeavingDate).toJSON().substring(0,10)}</p>
                <p class="trip-arrivingdate">${new Date(obj.TripDates.ArrivingDate).toJSON().substring(0,10)}</p>
                    <p>Available Seats: </p>
                    <p class="trip-seats">${obj.Seats}</p>
                    </div>
    
            
            </div>
                <div class="griddescription">
                <p>Description: </p>
                <p class="trip-description">${obj.tripDescription}</p>
                
        </div>
    
                <table>
                    <tr>
                    <th><p>Leaving From: </p></th>
                    <th><p>First Destination:</p></th>
                    <th><p>Second Destination:</p></th>
                    <th><p>Third Destination:</p></th>
                    <th><p>Finishing At:</p></th>
                    </tr>
    
                    <tr>
                    <td><p class="trip-leavingdestination">${obj.TripDestinations.LeavingDestination}</p> </td>
                        <td><p class="trip-betweendestination">${obj.TripDestinations.BetweenDestination}</p></td>
                        <td><p class="trip-betweendestination2">${obj.TripDestinations.BetweenDestination2}</p></td>
                        <td><p class="trip-betweendestination3">${obj.TripDestinations.BetweenDestination3}</p></td>
                        <td><p class="trip-arrivingdestination">${obj.TripDestinations.ArrivingDestination}</p></td>
                        
    
                    
                    </tr>
                </table>
                <img src=${apiUrl}${obj.tripMap2.data[0].attributes.formats.large.url} class="trip-image"/> 

                <p class="sorry">Unfortunately, no preferences or geolocation have been submitted by the user.</p>
            </div>
    </div>
            </div>
             
            `;
        }
    
    //here if the user has downloaded a map, and there's geolocation and preferences linked to the trip
   
    else if (obj.geolocation && obj.preferences) {
        
        output += `<div data-id=${element.id}>
        

        <div class="kolumner">
        <div class="row">
            <div class="column">
            <h2 class="trip-name">${obj.tripName}</h2>
            <div class="gridinfo">
            <p>Leaving- and arriving date: </p>
            <p class="trip-leavingdate">${new Date(obj.TripDates.LeavingDate).toJSON().substring(0,10)}</p>
            <p class="trip-arrivingdate">${new Date(obj.TripDates.ArrivingDate).toJSON().substring(0,10)}</p>
                <p>Available Seats: </p>
                <p class="trip-seats">${obj.Seats}</p>
                </div>

        
        </div>
            <div class="griddescription">
            <p>Description: </p>
            <p class="trip-description">${obj.tripDescription}</p>
            
    </div>

            <table>
                <tr>
                <th><p>Leaving From: </p></th>
                <th><p>First Destination:</p></th>
                <th><p>Second Destination:</p></th>
                <th><p>Third Destination:</p></th>
                <th><p>Finishing At:</p></th>
                </tr>

                <tr>
                <td><p class="trip-leavingdestination">${obj.TripDestinations.LeavingDestination}</p> </td>
                    <td><p class="trip-betweendestination">${obj.TripDestinations.BetweenDestination}</p></td>
                    <td><p class="trip-betweendestination2">${obj.TripDestinations.BetweenDestination2}</p></td>
                    <td><p class="trip-betweendestination3">${obj.TripDestinations.BetweenDestination3}</p></td>
                    <td><p class="trip-arrivingdestination">${obj.TripDestinations.ArrivingDestination}</p></td>
                    

                
                </tr>
            </table>
            <img src=${apiUrl}${obj.tripMap2.data[0].attributes.formats.large.url} class="trip-image"/> 

            <div class="gridtags">
           
            <p class="geolocation tags">${obj.geolocation.data.attributes.Place}</p>

        
            <p class="geolocation tags">${obj.preferences.data[0].attributes.Preference}</p>
    
            <p class="geolocation tags">${obj.preferences.data[1].attributes.Preference}</p>
          </div>
        </div>
       


</div>
        </div>
         
        `;
    }
    
  
     output += "</div> ";

 

}  )}
   //Writes the output into the div tripsFetched
    document.getElementById("tripsFetched").innerHTML = output;

}

//all of the functions below are fetching the right trips corresponding to the user's preferences
//the only information available when fetching through preferences and geolocation is trip name, trip description and available seats
//TODO: refactoring
//TODO: populating the preferences and geolocation with all the info about the trip (if possible through Strapi)
async function fetchRelax() {

    let relaxUrl = "http://localhost:1337/api/preferences/1?fields=preference&populate=*";
    
    
    
    let stringResponse = await fetch(relaxUrl, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }});
    let myObject = await stringResponse.json();
    

    console.log(myObject);
    
    let output = "";
    
    if (Array.isArray(myObject.data.attributes.trips.data)){
        myObject.data.attributes.trips.data.forEach(element => {
    
            let obj = element.attributes;
        
        
            {
           
            output += `
                
                <div class="filtrering">
                    <div class="trip" data-id=${element.id}>
                    <h2 class="trip-name">${obj.tripName}</h2>
                    <div class="gridfilterdescription">
                    <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                </div>
                <div class="gridseats">
                        <p>Available Seats: </p>
                        <p class="trip-seats">${obj.Seats}</p>
                        </div>
              
             </div>
         </div>
                `;
            }
    
   

   
    document.getElementById("tripsFetched").innerHTML = output;

}  )}
   
 

}

async function fetchWaterfalls() {

   
        let relaxUrl = "http://localhost:1337/api/preferences/2?fields=preference&populate=trips";
        
        
        
       
        let stringResponse = await fetch(relaxUrl, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }});
        let myObject = await stringResponse.json();
        
    
        console.log(myObject);
        
        let output = "";
        
       
        if (Array.isArray(myObject.data.attributes.trips.data)){
            
            myObject.data.attributes.trips.data.forEach(element => {
        
                
                let obj = element.attributes;
            
            
                {
               
                output += `
                
                <div class="filtrering">
                    <div class="trip" data-id=${element.id}>
                    <h2 class="trip-name">${obj.tripName}</h2>
                    <div class="gridfilterdescription">
                    <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                </div>
                <div class="gridseats">
                        <p>Available Seats: </p>
                        <p class="trip-seats">${obj.Seats}</p>
                        </div>
              
             </div>
         </div>
                `;
            }
      
        document.getElementById("tripsFetched").innerHTML = output;
    
    }  )}
         
    }

    async function fetchHiking() {

            let relaxUrl = "http://localhost:1337/api/preferences/3?fields=preference&populate=trips";
            
            
            
            let stringResponse = await fetch(relaxUrl, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }});
            let myObject = await stringResponse.json();
            
        
            console.log(myObject);
            
            let output = "";
            
        
            if (Array.isArray(myObject.data.attributes.trips.data)){
                myObject.data.attributes.trips.data.forEach(element => {
            
                    let obj = element.attributes;
                
                
                    {
                   
                    output += `
                
                <div class="filtrering">
                    <div class="trip" data-id=${element.id}>
                    <h2 class="trip-name">${obj.tripName}</h2>
                    <div class="gridfilterdescription">
                    <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                </div>
                <div class="gridseats">
                        <p>Available Seats: </p>
                        <p class="trip-seats">${obj.Seats}</p>
                        </div>
              
             </div>
         </div>
                `;
            }
           
         
        
        
          
            document.getElementById("tripsFetched").innerHTML = output;
        
        }  )}
           
         
        
        }

        async function fetchNorthernLights() {

                let relaxUrl = "http://localhost:1337/api/preferences/4?fields=preference&populate=trips";
                
                
                
                let stringResponse = await fetch(relaxUrl, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }});
                let myObject = await stringResponse.json();
                
            
                console.log(myObject);
                
                let output = "";
                
               
                if (Array.isArray(myObject.data.attributes.trips.data)){
                    myObject.data.attributes.trips.data.forEach(element => {
                
                        let obj = element.attributes;
                    
                    
                        {
                       
                        output += `
                
                <div class="filtrering">
                    <div class="trip" data-id=${element.id}>
                    <h2 class="trip-name">${obj.tripName}</h2>
                    <div class="gridfilterdescription">
                    <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                </div>
                <div class="gridseats">
                        <p>Available Seats: </p>
                        <p class="trip-seats">${obj.Seats}</p>
                        </div>
              
             </div>
         </div>
                `;
            }
             
            
            
               
                document.getElementById("tripsFetched").innerHTML = output;
            
            }  )}
               
             
            
            }

            async function fetchGlacierWalk() {

                
                    let relaxUrl = "http://localhost:1337/api/preferences/5?fields=preference&populate=trips";
                    
                    
                    
                  
                    let stringResponse = await fetch(relaxUrl, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                        }});
                    let myObject = await stringResponse.json();
                    
                
                    console.log(myObject);
                    
                    let output = "";
                    
                  
                    if (Array.isArray(myObject.data.attributes.trips.data)){
                        myObject.data.attributes.trips.data.forEach(element => {
                    
                            let obj = element.attributes;
                        
                        
                            {
                           
                            output += `
                
                <div class="filtrering">
                    <div class="trip" data-id=${element.id}>
                    <h2 class="trip-name">${obj.tripName}</h2>
                    <div class="gridfilterdescription">
                    <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                </div>
                <div class="gridseats">
                        <p>Available Seats: </p>
                        <p class="trip-seats">${obj.Seats}</p>
                        </div>
              
             </div>
         </div>
                `;
            }
                    
                   
                 
                
                
                
                    document.getElementById("tripsFetched").innerHTML = output;
                
                }  )}
                   
                 
                
                }

                async function fetchCamping() {

                   
                        let relaxUrl = "http://localhost:1337/api/preferences/6?fields=preference&populate=trips";
                        
                        
                        
                     
                        let stringResponse = await fetch(relaxUrl, {
                            method: 'GET',
                            headers: {
                                "Content-Type": "application/json",
                            }});
                        let myObject = await stringResponse.json();
                        
                    
                        console.log(myObject);
                        
                        let output = "";
                        
                        
                        if (Array.isArray(myObject.data.attributes.trips.data)){
                            myObject.data.attributes.trips.data.forEach(element => {
                        
                                let obj = element.attributes;
                            
                            
                                {
                               
                                output += `
                
                                <div class="filtrering">
                                    <div class="trip" data-id=${element.id}>
                                    <h2 class="trip-name">${obj.tripName}</h2>
                                    <div class="gridfilterdescription">
                                    <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                </div>
                                <div class="gridseats">
                                        <p>Available Seats: </p>
                                        <p class="trip-seats">${obj.Seats}</p>
                                        </div>
                              
                             </div>
                         </div>
                                `;
                            }
                     
                    
                    
                        document.getElementById("tripsFetched").innerHTML = output;
                    
                    }  )}
                       
                     
                    
                    }

                    async function fetchWhaleWatching() {

                            let relaxUrl = "http://localhost:1337/api/preferences/7?fields=preference&populate=trips";
                            
                            
                            
                            let stringResponse = await fetch(relaxUrl, {
                                method: 'GET',
                                headers: {
                                    "Content-Type": "application/json",
                                }});
                            let myObject = await stringResponse.json();
                            
                        
                            console.log(myObject);
                            
                            let output = "";
                            
                           
                            if (Array.isArray(myObject.data.attributes.trips.data)){
                                myObject.data.attributes.trips.data.forEach(element => {
                            
                                    let obj = element.attributes;
                                
                                
                                    {
                                   
                                    output += `
                
                                    <div class="filtrering">
                                        <div class="trip" data-id=${element.id}>
                                        <h2 class="trip-name">${obj.tripName}</h2>
                                        <div class="gridfilterdescription">
                                        <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                    </div>
                                    <div class="gridseats">
                                            <p>Available Seats: </p>
                                            <p class="trip-seats">${obj.Seats}</p>
                                            </div>
                                  
                                 </div>
                             </div>
                                    `;
                                }
                            
                           
                         
                        
                        
                            document.getElementById("tripsFetched").innerHTML = output;
                        
                        }  )}
                           
                         
                        
                        }

                        async function fetchSwimmingPool() {

                                let relaxUrl = "http://localhost:1337/api/preferences/8?fields=preference&populate=trips";
                                
                                
                                
                                let stringResponse = await fetch(relaxUrl, {
                                    method: 'GET',
                                    headers: {
                                        "Content-Type": "application/json",
                                    }});
                                let myObject = await stringResponse.json();
                                
                            
                                console.log(myObject);
                                
                                let output = "";
                                
                               
                                if (Array.isArray(myObject.data.attributes.trips.data)){
                                    myObject.data.attributes.trips.data.forEach(element => {
                                
                                        let obj = element.attributes;
                                    
                                    
                                        {
                                       
                                        output += `
                
                                        <div class="filtrering">
                                            <div class="trip" data-id=${element.id}>
                                            <h2 class="trip-name">${obj.tripName}</h2>
                                            <div class="gridfilterdescription">
                                            <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                        </div>
                                        <div class="gridseats">
                                                <p>Available Seats: </p>
                                                <p class="trip-seats">${obj.Seats}</p>
                                                </div>
                                      
                                     </div>
                                 </div>
                                        `;
                                    }
                               
                             
                            
                            
                               
                                document.getElementById("tripsFetched").innerHTML = output;
                            
                            }  )}
                               
                             
                            
                            }

                            async function fetchPhotography() {

                                    let relaxUrl = "http://localhost:1337/api/preferences/9?fields=preference&populate=trips";
                                    
                                    
                                    
                                    
                                    let stringResponse = await fetch(relaxUrl, {
                                        method: 'GET',
                                        headers: {
                                            "Content-Type": "application/json",
                                        }});
                                    let myObject = await stringResponse.json();
                                    
                                
                                    console.log(myObject);
                                    
                                    let output = "";
                                    
                                    if (Array.isArray(myObject.data.attributes.trips.data)){
                                        myObject.data.attributes.trips.data.forEach(element => {
                                    
                                            let obj = element.attributes;
                                        
                                        
                                            {
                                           
                                            output += `
                
                                            <div class="filtrering">
                                                <div class="trip" data-id=${element.id}>
                                                <h2 class="trip-name">${obj.tripName}</h2>
                                                <div class="gridfilterdescription">
                                                <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                            </div>
                                            <div class="gridseats">
                                                    <p>Available Seats: </p>
                                                    <p class="trip-seats">${obj.Seats}</p>
                                                    </div>
                                          
                                         </div>
                                     </div>
                                            `;
                                        }
                                    
   
                                
                                   
                                    document.getElementById("tripsFetched").innerHTML = output;
                                
                                }  )}
                                   
                                 
                                
                                }

                                async function fetchSpontaneousTrip() {

                                        let relaxUrl = "http://localhost:1337/api/preferences/10?fields=preference&populate=trips";
                                        
                                        
                                        
                                        let stringResponse = await fetch(relaxUrl, {
                                            method: 'GET',
                                            headers: {
                                                "Content-Type": "application/json",
                                            }});
                                        let myObject = await stringResponse.json();
                                        
                                    
                                        console.log(myObject);
                                        
                                        let output = "";
                                        
                                        
                                        if (Array.isArray(myObject.data.attributes.trips.data)){
                                            myObject.data.attributes.trips.data.forEach(element => {
                                        
                                                let obj = element.attributes;
                                            
                                            
                                                {
                                               
                                                output += `
                
                                                <div class="filtrering">
                                                    <div class="trip" data-id=${element.id}>
                                                    <h2 class="trip-name">${obj.tripName}</h2>
                                                    <div class="gridfilterdescription">
                                                    <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                                </div>
                                                <div class="gridseats">
                                                        <p>Available Seats: </p>
                                                        <p class="trip-seats">${obj.Seats}</p>
                                                        </div>
                                              
                                             </div>
                                         </div>
                                                `;
                                            }
                                    
                                       
                                        document.getElementById("tripsFetched").innerHTML = output;
                                    
                                    }  )}
                                       
                                     
                                    
                                    }

                                    async function fetchParty() {

                                            let relaxUrl = "http://localhost:1337/api/preferences/11?fields=preference&populate=trips";
                                            
                                            
                                            
                                            let stringResponse = await fetch(relaxUrl, {
                                                method: 'GET',
                                                headers: {
                                                    "Content-Type": "application/json",
                                                }});
                                            let myObject = await stringResponse.json();
                                            
                                        
                                            console.log(myObject);
                                            
                                            let output = "";
                                            
                                          
                                            if (Array.isArray(myObject.data.attributes.trips.data)){
                                                myObject.data.attributes.trips.data.forEach(element => {
                                            
                                                    let obj = element.attributes;
                                                
                                                
                                                    {
                                                   
                                                    output += `
                
                                                    <div class="filtrering">
                                                        <div class="trip" data-id=${element.id}>
                                                        <h2 class="trip-name">${obj.tripName}</h2>
                                                        <div class="gridfilterdescription">
                                                        <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                                    </div>
                                                    <div class="gridseats">
                                                            <p>Available Seats: </p>
                                                            <p class="trip-seats">${obj.Seats}</p>
                                                            </div>
                                                  
                                                 </div>
                                             </div>
                                                    `;
                                                }
                                            
                                           
                                         
                                        
                                        
                                           
                                            document.getElementById("tripsFetched").innerHTML = output;
                                        
                                        }  )}
                                           
                                         
                                        
                                        }

                                        async function fetchSport() {

                                                let relaxUrl = "http://localhost:1337/api/preferences/12?fields=preference&populate=trips";
                                                
                                                
                                                
                                                let stringResponse = await fetch(relaxUrl, {
                                                    method: 'GET',
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    }});
                                                let myObject = await stringResponse.json();
                                                
                                            
                                                console.log(myObject);
                                                
                                                let output = "";
                                                
                                               
                                                if (Array.isArray(myObject.data.attributes.trips.data)){
                                                    myObject.data.attributes.trips.data.forEach(element => {
                                                
                                                        let obj = element.attributes;
                                                    
                                                    
                                                        {
                                                       
                                                        output += `
                
                                                        <div class="filtrering">
                                                            <div class="trip" data-id=${element.id}>
                                                            <h2 class="trip-name">${obj.tripName}</h2>
                                                            <div class="gridfilterdescription">
                                                            <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                                        </div>
                                                        <div class="gridseats">
                                                                <p>Available Seats: </p>
                                                                <p class="trip-seats">${obj.Seats}</p>
                                                                </div>
                                                      
                                                     </div>
                                                 </div>
                                                        `;
                                                    }
                                               
                                             
                                            
                                            
                                              
                                                document.getElementById("tripsFetched").innerHTML = output;
                                            
                                            }  )}
                                               
                                             
                                            
                                            }

                                            async function fetchHotSprings() {

                                                    let relaxUrl = "http://localhost:1337/api/preferences/13?fields=preference&populate=trips";
                                                    
                                                    
                                                    
                                                    let stringResponse = await fetch(relaxUrl, {
                                                        method: 'GET',
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        }});
                                                    let myObject = await stringResponse.json();
                                                    
                                                
                                                    console.log(myObject);
                                                    
                                                    let output = "";
                                                    
                                                    
                                                    if (Array.isArray(myObject.data.attributes.trips.data)){
                                                        myObject.data.attributes.trips.data.forEach(element => {
                                                    
                                                            let obj = element.attributes;
                                                        
                                    
                                                            {
                                                           
                                                            output += `
                
                                                            <div class="filtrering">
                                                                <div class="trip" data-id=${element.id}>
                                                                <h2 class="trip-name">${obj.tripName}</h2>
                                                                <div class="gridfilterdescription">
                                                                <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                                            </div>
                                                            <div class="gridseats">
                                                                    <p>Available Seats: </p>
                                                                    <p class="trip-seats">${obj.Seats}</p>
                                                                    </div>
                                                          
                                                         </div>
                                                     </div>
                                                            `;
                                                        }
                                                   
                                                 
                                                
                                                
                                                   
                                                    document.getElementById("tripsFetched").innerHTML = output;
                                                
                                                }  )}
                                                   
                                                 
                                                
                                                }

                                                async function fetchCouchsurfing() {

                                                        let relaxUrl = "http://localhost:1337/api/preferences/14?fields=preference&populate=trips";
                                                        
                                                        
                                                        
                                                        let stringResponse = await fetch(relaxUrl, {
                                                            method: 'GET',
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                            }});
                                                        let myObject = await stringResponse.json();
                                                        
                                                    
                                                        console.log(myObject);
                                                        
                                                        let output = "";
                                                        
                                                        
                                                        if (Array.isArray(myObject.data.attributes.trips.data)){
                                                            myObject.data.attributes.trips.data.forEach(element => {
                                                        
                                                                let obj = element.attributes;
                                                            
                                                            
                                                                {
                                                               
                                                                output += `
                
                                                                <div class="filtrering">
                                                                    <div class="trip" data-id=${element.id}>
                                                                    <h2 class="trip-name">${obj.tripName}</h2>
                                                                    <div class="gridfilterdescription">
                                                                    <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                                                </div>
                                                                <div class="gridseats">
                                                                        <p>Available Seats: </p>
                                                                        <p class="trip-seats">${obj.Seats}</p>
                                                                        </div>
                                                              
                                                             </div>
                                                         </div>
                                                                `;
                                                            }
                                                       
                                                     
                                                    
                                                    
                                                       
                                                        document.getElementById("tripsFetched").innerHTML = output;
                                                    
                                                    }  )}
                                                       
                                                     
                                                    
                                                    }

                                                    async function fetchFarmStay() {

                                                            let relaxUrl = "http://localhost:1337/api/preferences/15?fields=preference&populate=trips";
                                                            
                                                            
                                                            
                                                            let stringResponse = await fetch(relaxUrl, {
                                                                method: 'GET',
                                                                headers: {
                                                                    "Content-Type": "application/json",
                                                                }});
                                                            let myObject = await stringResponse.json();
                                                            
                                                        
                                                            console.log(myObject);
                                                            
                                                            let output = "";
                                                            
                                                            
                                                            if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                myObject.data.attributes.trips.data.forEach(element => {
                                                            
                                                                    let obj = element.attributes;
                                                                
                                                                
                                                                    {
                                                                   
                                                                    output += `
                
                                                                    <div class="filtrering">
                                                                        <div class="trip" data-id=${element.id}>
                                                                        <h2 class="trip-name">${obj.tripName}</h2>
                                                                        <div class="gridfilterdescription">
                                                                        <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                                                    </div>
                                                                    <div class="gridseats">
                                                                            <p>Available Seats: </p>
                                                                            <p class="trip-seats">${obj.Seats}</p>
                                                                            </div>
                                                                  
                                                                 </div>
                                                             </div>
                                                                    `;
                                                                }
                                                           
                                                         
                                                        
                                                        
                                                           
                                                            document.getElementById("tripsFetched").innerHTML = output;
                                                        
                                                        }  )}
                                                           
                                                         
                                                        
                                                        }


                                                        async function fetchNorth() {

                                                                let relaxUrl = "http://localhost:1337/api/geolocations/4?fields=place&populate=trips";
                                                                
                                                                
                                                                
                                                                let stringResponse = await fetch(relaxUrl, {
                                                                    method: 'GET',
                                                                    headers: {
                                                                        "Content-Type": "application/json",
                                                                    }});
                                                                let myObject = await stringResponse.json();
                                                                
                                                            
                                                                console.log(myObject);
                                                                
                                                                let output = "";
                                                                
                                                                
                                                                if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                    myObject.data.attributes.trips.data.forEach(element => {
                                                                
                                                                        let obj = element.attributes;
                                                                    
                                                                    
                                                                        {
                                                                       
                                                                        output += `
                
                                                                        <div class="filtrering">
                                                                            <div class="trip" data-id=${element.id}>
                                                                            <h2 class="trip-name">${obj.tripName}</h2>
                                                                            <div class="gridfilterdescription">
                                                                            <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                                                        </div>
                                                                        <div class="gridseats">
                                                                                <p>Available Seats: </p>
                                                                                <p class="trip-seats">${obj.Seats}</p>
                                                                                </div>
                                                                      
                                                                     </div>
                                                                 </div>
                                                                        `;
                                                                    }
                                                                
                                                               
                                                             
                                                            
                                                            
                                                              
                                                                document.getElementById("tripsFetched").innerHTML = output;
                                                            
                                                            }  )}
                                                               
                                                             
                                                            
                                                            }

                                                            async function fetchSouth() {

                                                                    let relaxUrl = "http://localhost:1337/api/geolocations/5?fields=place&populate=trips";
                                                                    
                                                                    
                                                                    
                                                                    let stringResponse = await fetch(relaxUrl, {
                                                                        method: 'GET',
                                                                        headers: {
                                                                            "Content-Type": "application/json",
                                                                        }});
                                                                    let myObject = await stringResponse.json();
                                                                    
                                                                
                                                                    console.log(myObject);
                                                                    
                                                                    let output = "";
                                                                    
                                                                    
                                                                    if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                        myObject.data.attributes.trips.data.forEach(element => {
                                                                    
                                                                            let obj = element.attributes;
                                                                        
                                                                        
                                                                            {
                                                                           
                                                                            output += `
                
                <div class="filtrering">
                    <div class="trip" data-id=${element.id}>
                    <h2 class="trip-name">${obj.tripName}</h2>
                    <div class="gridfilterdescription">
                    <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                </div>
                <div class="gridseats">
                        <p>Available Seats: </p>
                        <p class="trip-seats">${obj.Seats}</p>
                        </div>
              
             </div>
         </div>
                `;
            }
                                                                    
                                                                   
                                                                 
                                                                
                                                                
                                                                   
                                                                    document.getElementById("tripsFetched").innerHTML = output;
                                                                
                                                                }  )}
                                                                   
                                                                 
                                                                
                                                                }

                                                                async function fetchGoldenCircle() {

                                                                        let relaxUrl = "http://localhost:1337/api/geolocations/6?fields=place&populate=trips";
                                                                        
                                                                        
                                                                        
                                                                        let stringResponse = await fetch(relaxUrl, {
                                                                            method: 'GET',
                                                                            headers: {
                                                                                "Content-Type": "application/json",
                                                                            }});
                                                                        let myObject = await stringResponse.json();
                                                                        
                                                                    
                                                                        console.log(myObject);
                                                                        
                                                                        let output = "";
                                                                        
                                                                        
                                                                        if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                            myObject.data.attributes.trips.data.forEach(element => {
                                                                        
                                                                                let obj = element.attributes;
                                                                            
                                                                            
                                                                                {
                                                                               
                                                                                output += `
                
                                                                                <div class="filtrering">
                                                                                    <div class="trip" data-id=${element.id}>
                                                                                    <h2 class="trip-name">${obj.tripName}</h2>
                                                                                    <div class="gridfilterdescription">
                                                                                    <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                                                                </div>
                                                                                <div class="gridseats">
                                                                                        <p>Available Seats: </p>
                                                                                        <p class="trip-seats">${obj.Seats}</p>
                                                                                        </div>
                                                                              
                                                                             </div>
                                                                         </div>
                                                                                `;
                                                                            }
                                                                       
                                                                     
                                                                    
                                                                    
                                                                       
                                                                        document.getElementById("tripsFetched").innerHTML = output;
                                                                    
                                                                    }  )}
                                                                       
                                                                     
                                                                    
                                                                    }

                                                                    async function fetchHiddenGem() {

                                                                        
                                                                            let relaxUrl = "http://localhost:1337/api/geolocations/7?fields=place&populate=trips";
                                                                            
                                                                            
                                                                            
                                                                           
                                                                            let stringResponse = await fetch(relaxUrl, {
                                                                                method: 'GET',
                                                                                headers: {
                                                                                    "Content-Type": "application/json",
                                                                                }});
                                                                            let myObject = await stringResponse.json();
                                                                            
                                                                        
                                                                            console.log(myObject);
                                                                            
                                                                            let output = "";
                                                                            
                                                                           
                                                                            if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                                myObject.data.attributes.trips.data.forEach(element => {
                                                                            
                                                                                    let obj = element.attributes;
                                                                                
                                                                                
                                                                                    {
                                                                                   
                                                                                    output += `
                
                                                                                    <div class="filtrering">
                                                                                        <div class="trip" data-id=${element.id}>
                                                                                        <h2 class="trip-name">${obj.tripName}</h2>
                                                                                        <div class="gridfilterdescription">
                                                                                        <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                                                                    </div>
                                                                                    <div class="gridseats">
                                                                                            <p>Available Seats: </p>
                                                                                            <p class="trip-seats">${obj.Seats}</p>
                                                                                            </div>
                                                                                  
                                                                                 </div>
                                                                             </div>
                                                                                    `;
                                                                                }
                                                                                
                                                                        
                                                                            document.getElementById("tripsFetched").innerHTML = output;
                                                                        
                                                                        }  )}
                                                                           
                                                                         
                                                                        
                                                                        }

                                                                        async function fetchSnaefellsnes() {

                                                                                let relaxUrl = "http://localhost:1337/api/geolocations/8?fields=place&populate=trips";
                                                                                
                                                                                
                                                                                
                                                                                let stringResponse = await fetch(relaxUrl, {
                                                                                    method: 'GET',
                                                                                    headers: {
                                                                                        "Content-Type": "application/json",
                                                                                    }});
                                                                                let myObject = await stringResponse.json();
                                                                                
                                                                            
                                                                                console.log(myObject);
                                                                                
                                                                                let output = "";
                                                                                
                                                                                if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                                    myObject.data.attributes.trips.data.forEach(element => {
                                                                                
                                                                                        let obj = element.attributes;
                                                                                    
                                                                                    
                                                                                        {
                                                                                       
                                                                                        output += `
                
                                                                                        <div class="filtrering">
                                                                                            <div class="trip" data-id=${element.id}>
                                                                                            <h2 class="trip-name">${obj.tripName}</h2>
                                                                                            <div class="gridfilterdescription">
                                                                                            <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                                                                        </div>
                                                                                        <div class="gridseats">
                                                                                                <p>Available Seats: </p>
                                                                                                <p class="trip-seats">${obj.Seats}</p>
                                                                                                </div>
                                                                                      
                                                                                     </div>
                                                                                 </div>
                                                                                        `;
                                                                                    }
                                                                                
                                                                               
                                                                             
                                                                            
                                                                            
                                                                                document.getElementById("tripsFetched").innerHTML = output;
                                                                            
                                                                            }  )}
                                                                               
                                                                             
                                                                            
                                                                            }

                                                                            async function fetchRingRoad() {

                                                                                    let relaxUrl = "http://localhost:1337/api/geolocations/9?fields=place&populate=trips";
                                                                                    
                                                                                    
                                                                                    
                                                                                    let stringResponse = await fetch(relaxUrl, {
                                                                                        method: 'GET',
                                                                                        headers: {
                                                                                            "Content-Type": "application/json",
                                                                                        }});
                                                                                    let myObject = await stringResponse.json();
                                                                                    
                                                                                
                                                                                    console.log(myObject);
                                                                                    
                                                                                    let output = "";
                                                                                    
                                                                                    if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                                        myObject.data.attributes.trips.data.forEach(element => {
                                                                                    
                                                                                            let obj = element.attributes;
                                                                                        
                                                                                        
                                                                                            {
                                                                                           
                                                                                            output += `
                
                                                                                            <div class="filtrering">
                                                                                                <div class="trip" data-id=${element.id}>
                                                                                                <h2 class="trip-name">${obj.tripName}</h2>
                                                                                                <div class="gridfilterdescription">
                                                                                                <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                                                                            </div>
                                                                                            <div class="gridseats">
                                                                                                    <p>Available Seats: </p>
                                                                                                    <p class="trip-seats">${obj.Seats}</p>
                                                                                                    </div>
                                                                                          
                                                                                         </div>
                                                                                     </div>
                                                                                            `;
                                                                                        }
                                                                                   
                                                                                 
                                                                                
                                                                                
                                                                                    document.getElementById("tripsFetched").innerHTML = output;
                                                                                
                                                                                }  )}
                                                                                   
                                                                                 
                                                                                
                                                                                }

                                                                                async function fetchMountainTrip() {

                                                                                        let relaxUrl = "http://localhost:1337/api/geolocations/10?fields=place&populate=trips";
                                                                                        
                                                                                        
                                                                                        
                                                                                        let stringResponse = await fetch(relaxUrl, {
                                                                                            method: 'GET',
                                                                                            headers: {
                                                                                                "Content-Type": "application/json",
                                                                                            }});
                                                                                        let myObject = await stringResponse.json();
                                                                                        
                                                                                    
                                                                                        console.log(myObject);
                                                                                        
                                                                                        let output = "";
                                                                                        
                                                                                        if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                                            myObject.data.attributes.trips.data.forEach(element => {
                                                                                        
                                                                                                let obj = element.attributes;
                                                                                            
                                                                                            
                                                                                                {
                                                                                               
                                                                                                output += `
                
                                                                                                <div class="filtrering">
                                                                                                    <div class="trip" data-id=${element.id}>
                                                                                                    <h2 class="trip-name">${obj.tripName}</h2>
                                                                                                    <div class="gridfilterdescription">
                                                                                                    <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                                                                                </div>
                                                                                                <div class="gridseats">
                                                                                                        <p>Available Seats: </p>
                                                                                                        <p class="trip-seats">${obj.Seats}</p>
                                                                                                        </div>
                                                                                              
                                                                                             </div>
                                                                                         </div>
                                                                                                `;
                                                                                            }
                                                                                    
                                                                                        document.getElementById("tripsFetched").innerHTML = output;
                                                                                    
                                                                                    }  )}
                                                                                       
                                                                                     
                                                                                    
                                                                                    }

                                                                                    async function fetchFjords() {

                                                                                            let relaxUrl = "http://localhost:1337/api/geolocations/11?fields=place&populate=trips";
                                                                                            
                                                                                            
                                                                                            
                                                                                            let stringResponse = await fetch(relaxUrl, {
                                                                                                method: 'GET',
                                                                                                headers: {
                                                                                                    "Content-Type": "application/json",
                                                                                                }});
                                                                                            let myObject = await stringResponse.json();
                                                                                            
                                                                                        
                                                                                            console.log(myObject);
                                                                                            
                                                                                            let output = "";
                                                                                            
                                                                                            if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                                                myObject.data.attributes.trips.data.forEach(element => {
                                                                                            
                                                                                                    let obj = element.attributes;
                                                                                                
                                                                                                
                                                                                                    {
                                                                                                   
                                                                                                    output += `
                
                                                                                                    <div class="filtrering">
                                                                                                        <div class="trip" data-id=${element.id}>
                                                                                                        <h2 class="trip-name">${obj.tripName}</h2>
                                                                                                        <div class="gridfilterdescription">
                                                                                                        <p>Description: </p><p class="trip-description">${obj.tripDescription}</p>  
                                                                                                    </div>
                                                                                                    <div class="gridseats">
                                                                                                            <p>Available Seats: </p>
                                                                                                            <p class="trip-seats">${obj.Seats}</p>
                                                                                                            </div>
                                                                                                  
                                                                                                 </div>
                                                                                             </div>
                                                                                                    `;
                                                                                                }
                                                                                        
                                                                                            document.getElementById("tripsFetched").innerHTML = output;
                                                                                        
                                                                                        }  )}                              
                                                                                    }