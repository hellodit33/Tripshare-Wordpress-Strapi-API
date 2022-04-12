//Funktion för att hämta data från Strapi CMS
async function getDataFromStrapi() {
    //Url till Strapi.js API för att hämta alla trips
    let url = "http://localhost:1337/api/trips?populate=*";
    let apiUrl ="http://localhost:1337";
    let tripsUrl="http://localhost:1337/api/trips";
    
    
    //Hämtar JSON från API och konverterar det till JS objekt
    let stringResponse = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }});
    let myObject = await stringResponse.json();
    

    console.log(myObject);
    
    let output = "";
    
    if (Array.isArray(myObject.data)){
        //Skapar en ForEach loop för varje element i Data-arrayen
        myObject.data.forEach(element => {
    
            //Gör en pekare till attribut object
            let obj = element.attributes;
        
        
            if (!obj.tripMap2.data) {
            //Skriver Output string
           

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
                <p>The map has not been downloaded by the user.</p>
            </div>
    </div>
            </div>
             
            `;
        }
    
    
    else if (obj.tripMap2.data) {
    //if the user did not add any map
            //Skriver Output string without map
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
   
 //Skriver ut Output string till div-element
    //document.write(output);
    document.getElementById("tripsFetched").innerHTML = output;

}

async function fetchRelax() {

//Url till Strapi.js API för att hämta alla trips
    let relaxUrl = "http://localhost:1337/api/preferences/1?fields=preference&populate=*";
    
    
    
    //Hämtar JSON från API och konverterar det till JS objekt
    let stringResponse = await fetch(relaxUrl, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }});
    let myObject = await stringResponse.json();
    

    console.log(myObject);
    
    let output = "";
    
    //Kan undvikas genom flera funktioner; en för alla och en för unik
    if (Array.isArray(myObject.data.attributes.trips.data)){
        //Skapar en ForEach loop för varje element i Data-arrayen
        myObject.data.attributes.trips.data.forEach(element => {
    
            //Gör en pekare till attribut object
            let obj = element.attributes;
        
        
            {
            //Skriver Output string
           
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
    
   

   //Skriver ut Output string till div-element
    //document.write(output);
    document.getElementById("tripsFetched").innerHTML = output;

}  )}
   
 

}

async function fetchWaterfalls() {

    //Url till Strapi.js API för att hämta alla trips
        let relaxUrl = "http://localhost:1337/api/preferences/2?fields=preference&populate=trips";
        
        
        
        //Hämtar JSON från API och konverterar det till JS objekt
        let stringResponse = await fetch(relaxUrl, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }});
        let myObject = await stringResponse.json();
        
    
        console.log(myObject);
        
        let output = "";
        
        if (Array.isArray(myObject.data.attributes.trips.data)){
            //Skapar en ForEach loop för varje element i Data-arrayen
            myObject.data.attributes.trips.data.forEach(element => {
        
                //Gör en pekare till attribut object
                let obj = element.attributes;
            
            
                {
                //Skriver Output string
               
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
       //Skriver ut Output string till div-element
        //document.write(output);
        document.getElementById("tripsFetched").innerHTML = output;
    
    }  )}
         
    }

    async function fetchHiking() {

        //Url till Strapi.js API för att hämta alla trips
            let relaxUrl = "http://localhost:1337/api/preferences/3?fields=preference&populate=trips";
            
            
            
            //Hämtar JSON från API och konverterar det till JS objekt
            let stringResponse = await fetch(relaxUrl, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }});
            let myObject = await stringResponse.json();
            
        
            console.log(myObject);
            
            let output = "";
            
            //Kan undvikas genom flera funktioner; en för alla och en för unik
            if (Array.isArray(myObject.data.attributes.trips.data)){
                //Skapar en ForEach loop för varje element i Data-arrayen
                myObject.data.attributes.trips.data.forEach(element => {
            
                    //Gör en pekare till attribut object
                    let obj = element.attributes;
                
                
                    {
                    //Skriver Output string
                   
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
           
         
        
        
           //Skriver ut Output string till div-element
            //document.write(output);
            document.getElementById("tripsFetched").innerHTML = output;
        
        }  )}
           
         
        
        }

        async function fetchNorthernLights() {

            //Url till Strapi.js API för att hämta alla trips
                let relaxUrl = "http://localhost:1337/api/preferences/4?fields=preference&populate=trips";
                
                
                
                //Hämtar JSON från API och konverterar det till JS objekt
                let stringResponse = await fetch(relaxUrl, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }});
                let myObject = await stringResponse.json();
                
            
                console.log(myObject);
                
                let output = "";
                
                
                if (Array.isArray(myObject.data.attributes.trips.data)){
                    //Skapar en ForEach loop för varje element i Data-arrayen
                    myObject.data.attributes.trips.data.forEach(element => {
                
                        //Gör en pekare till attribut object
                        let obj = element.attributes;
                    
                    
                        {
                        //Skriver Output string
                       
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
             
            
            
               //Skriver ut Output string till div-element
                //document.write(output);
                document.getElementById("tripsFetched").innerHTML = output;
            
            }  )}
               
             
            
            }

            async function fetchGlacierWalk() {

                //Url till Strapi.js API för att hämta alla trips
                    let relaxUrl = "http://localhost:1337/api/preferences/5?fields=preference&populate=trips";
                    
                    
                    
                    //Hämtar JSON från API och konverterar det till JS objekt
                    let stringResponse = await fetch(relaxUrl, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                        }});
                    let myObject = await stringResponse.json();
                    
                
                    console.log(myObject);
                    
                    let output = "";
                    
                    if (Array.isArray(myObject.data.attributes.trips.data)){
                        //Skapar en ForEach loop för varje element i Data-arrayen
                        myObject.data.attributes.trips.data.forEach(element => {
                    
                            //Gör en pekare till attribut object
                            let obj = element.attributes;
                        
                        
                            {
                            //Skriver Output string
                           
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
                    
                   
                 
                
                
                   //Skriver ut Output string till div-element
                    //document.write(output);
                    document.getElementById("tripsFetched").innerHTML = output;
                
                }  )}
                   
                 
                
                }

                async function fetchCamping() {

                    //Url till Strapi.js API för att hämta alla trips
                        let relaxUrl = "http://localhost:1337/api/preferences/6?fields=preference&populate=trips";
                        
                        
                        
                        //Hämtar JSON från API och konverterar det till JS objekt
                        let stringResponse = await fetch(relaxUrl, {
                            method: 'GET',
                            headers: {
                                "Content-Type": "application/json",
                            }});
                        let myObject = await stringResponse.json();
                        
                    
                        console.log(myObject);
                        
                        let output = "";
                        
                        if (Array.isArray(myObject.data.attributes.trips.data)){
                            //Skapar en ForEach loop för varje element i Data-arrayen
                            myObject.data.attributes.trips.data.forEach(element => {
                        
                                //Gör en pekare till attribut object
                                let obj = element.attributes;
                            
                            
                                {
                                //Skriver Output string
                               
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
                     
                    
                    
                       //Skriver ut Output string till div-element
                        //document.write(output);
                        document.getElementById("tripsFetched").innerHTML = output;
                    
                    }  )}
                       
                     
                    
                    }

                    async function fetchWhaleWatching() {

                        //Url till Strapi.js API för att hämta alla trips
                            let relaxUrl = "http://localhost:1337/api/preferences/7?fields=preference&populate=trips";
                            
                            
                            
                            //Hämtar JSON från API och konverterar det till JS objekt
                            let stringResponse = await fetch(relaxUrl, {
                                method: 'GET',
                                headers: {
                                    "Content-Type": "application/json",
                                }});
                            let myObject = await stringResponse.json();
                            
                        
                            console.log(myObject);
                            
                            let output = "";
                            
                           
                            if (Array.isArray(myObject.data.attributes.trips.data)){
                                //Skapar en ForEach loop för varje element i Data-arrayen
                                myObject.data.attributes.trips.data.forEach(element => {
                            
                                    //Gör en pekare till attribut object
                                    let obj = element.attributes;
                                
                                
                                    {
                                    //Skriver Output string
                                   
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
                            
                           
                         
                        
                        
                           //Skriver ut Output string till div-element
                            //document.write(output);
                            document.getElementById("tripsFetched").innerHTML = output;
                        
                        }  )}
                           
                         
                        
                        }

                        async function fetchSwimmingPool() {

                            //Url till Strapi.js API för att hämta alla trips
                                let relaxUrl = "http://localhost:1337/api/preferences/8?fields=preference&populate=trips";
                                
                                
                                
                                //Hämtar JSON från API och konverterar det till JS objekt
                                let stringResponse = await fetch(relaxUrl, {
                                    method: 'GET',
                                    headers: {
                                        "Content-Type": "application/json",
                                    }});
                                let myObject = await stringResponse.json();
                                
                            
                                console.log(myObject);
                                
                                let output = "";
                                
                                
                                if (Array.isArray(myObject.data.attributes.trips.data)){
                                    //Skapar en ForEach loop för varje element i Data-arrayen
                                    myObject.data.attributes.trips.data.forEach(element => {
                                
                                        //Gör en pekare till attribut object
                                        let obj = element.attributes;
                                    
                                    
                                        {
                                        //Skriver Output string
                                       
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
                               
                             
                            
                            
                               //Skriver ut Output string till div-element
                                //document.write(output);
                                document.getElementById("tripsFetched").innerHTML = output;
                            
                            }  )}
                               
                             
                            
                            }

                            async function fetchPhotography() {

                                //Url till Strapi.js API för att hämta alla trips
                                    let relaxUrl = "http://localhost:1337/api/preferences/9?fields=preference&populate=trips";
                                    
                                    
                                    
                                    //Hämtar JSON från API och konverterar det till JS objekt
                                    let stringResponse = await fetch(relaxUrl, {
                                        method: 'GET',
                                        headers: {
                                            "Content-Type": "application/json",
                                        }});
                                    let myObject = await stringResponse.json();
                                    
                                
                                    console.log(myObject);
                                    
                                    let output = "";
                                    
                                    //Checkar om det är ett eller flera objekt som hämtas
                                    //Kan undvikas genom flera funktioner; en för alla och en för unik
                                    if (Array.isArray(myObject.data.attributes.trips.data)){
                                        //Skapar en ForEach loop för varje element i Data-arrayen
                                        myObject.data.attributes.trips.data.forEach(element => {
                                    
                                            //Gör en pekare till attribut object
                                            let obj = element.attributes;
                                        
                                        
                                            {
                                            //Skriver Output string
                                           
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
                                    
   
                                
                                   //Skriver ut Output string till div-element
                                    //document.write(output);
                                    document.getElementById("tripsFetched").innerHTML = output;
                                
                                }  )}
                                   
                                 
                                
                                }

                                async function fetchSpontaneousTrip() {

                                    //Url till Strapi.js API för att hämta alla trips
                                        let relaxUrl = "http://localhost:1337/api/preferences/10?fields=preference&populate=trips";
                                        
                                        
                                        
                                        //Hämtar JSON från API och konverterar det till JS objekt
                                        let stringResponse = await fetch(relaxUrl, {
                                            method: 'GET',
                                            headers: {
                                                "Content-Type": "application/json",
                                            }});
                                        let myObject = await stringResponse.json();
                                        
                                    
                                        console.log(myObject);
                                        
                                        let output = "";
                                        
                                        //Checkar om det är ett eller flera objekt som hämtas
                                        //Kan undvikas genom flera funktioner; en för alla och en för unik
                                        if (Array.isArray(myObject.data.attributes.trips.data)){
                                            //Skapar en ForEach loop för varje element i Data-arrayen
                                            myObject.data.attributes.trips.data.forEach(element => {
                                        
                                                //Gör en pekare till attribut object
                                                let obj = element.attributes;
                                            
                                            
                                                {
                                                //Skriver Output string
                                               
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
                                    
                                       //Skriver ut Output string till div-element
                                        //document.write(output);
                                        document.getElementById("tripsFetched").innerHTML = output;
                                    
                                    }  )}
                                       
                                     
                                    
                                    }

                                    async function fetchParty() {

                                        //Url till Strapi.js API för att hämta alla trips
                                            let relaxUrl = "http://localhost:1337/api/preferences/12?fields=preference&populate=trips";
                                            
                                            
                                            
                                            //Hämtar JSON från API och konverterar det till JS objekt
                                            let stringResponse = await fetch(relaxUrl, {
                                                method: 'GET',
                                                headers: {
                                                    "Content-Type": "application/json",
                                                }});
                                            let myObject = await stringResponse.json();
                                            
                                        
                                            console.log(myObject);
                                            
                                            let output = "";
                                            
                                            //Checkar om det är ett eller flera objekt som hämtas
                                            //Kan undvikas genom flera funktioner; en för alla och en för unik
                                            if (Array.isArray(myObject.data.attributes.trips.data)){
                                                //Skapar en ForEach loop för varje element i Data-arrayen
                                                myObject.data.attributes.trips.data.forEach(element => {
                                            
                                                    //Gör en pekare till attribut object
                                                    let obj = element.attributes;
                                                
                                                
                                                    {
                                                    //Skriver Output string
                                                   
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
                                            
                                           
                                         
                                        
                                        
                                           //Skriver ut Output string till div-element
                                            //document.write(output);
                                            document.getElementById("tripsFetched").innerHTML = output;
                                        
                                        }  )}
                                           
                                         
                                        
                                        }

                                        async function fetchSport() {

                                            //Url till Strapi.js API för att hämta alla trips
                                                let relaxUrl = "http://localhost:1337/api/preferences/11?fields=preference&populate=trips";
                                                
                                                
                                                
                                                //Hämtar JSON från API och konverterar det till JS objekt
                                                let stringResponse = await fetch(relaxUrl, {
                                                    method: 'GET',
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    }});
                                                let myObject = await stringResponse.json();
                                                
                                            
                                                console.log(myObject);
                                                
                                                let output = "";
                                                
                                                //Checkar om det är ett eller flera objekt som hämtas
                                                //Kan undvikas genom flera funktioner; en för alla och en för unik
                                                if (Array.isArray(myObject.data.attributes.trips.data)){
                                                    //Skapar en ForEach loop för varje element i Data-arrayen
                                                    myObject.data.attributes.trips.data.forEach(element => {
                                                
                                                        //Gör en pekare till attribut object
                                                        let obj = element.attributes;
                                                    
                                                    
                                                        {
                                                        //Skriver Output string
                                                       
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
                                               
                                             
                                            
                                            
                                               //Skriver ut Output string till div-element
                                                //document.write(output);
                                                document.getElementById("tripsFetched").innerHTML = output;
                                            
                                            }  )}
                                               
                                             
                                            
                                            }

                                            async function fetchHotSprings() {

                                                //Url till Strapi.js API för att hämta alla trips
                                                    let relaxUrl = "http://localhost:1337/api/preferences/13?fields=preference&populate=trips";
                                                    
                                                    
                                                    
                                                    //Hämtar JSON från API och konverterar det till JS objekt
                                                    let stringResponse = await fetch(relaxUrl, {
                                                        method: 'GET',
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        }});
                                                    let myObject = await stringResponse.json();
                                                    
                                                
                                                    console.log(myObject);
                                                    
                                                    let output = "";
                                                    
                                                    //Checkar om det är ett eller flera objekt som hämtas
                                                    //Kan undvikas genom flera funktioner; en för alla och en för unik
                                                    if (Array.isArray(myObject.data.attributes.trips.data)){
                                                        //Skapar en ForEach loop för varje element i Data-arrayen
                                                        myObject.data.attributes.trips.data.forEach(element => {
                                                    
                                                            //Gör en pekare till attribut object
                                                            let obj = element.attributes;
                                                        
                                                        
                                                            {
                                                            //Skriver Output string
                                                           
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
                                                   
                                                 
                                                
                                                
                                                   //Skriver ut Output string till div-element
                                                    //document.write(output);
                                                    document.getElementById("tripsFetched").innerHTML = output;
                                                
                                                }  )}
                                                   
                                                 
                                                
                                                }

                                                async function fetchCouchsurfing() {

                                                    //Url till Strapi.js API för att hämta alla trips
                                                        let relaxUrl = "http://localhost:1337/api/preferences/14?fields=preference&populate=trips";
                                                        
                                                        
                                                        
                                                        //Hämtar JSON från API och konverterar det till JS objekt
                                                        let stringResponse = await fetch(relaxUrl, {
                                                            method: 'GET',
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                            }});
                                                        let myObject = await stringResponse.json();
                                                        
                                                    
                                                        console.log(myObject);
                                                        
                                                        let output = "";
                                                        
                                                        //Checkar om det är ett eller flera objekt som hämtas
                                                        //Kan undvikas genom flera funktioner; en för alla och en för unik
                                                        if (Array.isArray(myObject.data.attributes.trips.data)){
                                                            //Skapar en ForEach loop för varje element i Data-arrayen
                                                            myObject.data.attributes.trips.data.forEach(element => {
                                                        
                                                                //Gör en pekare till attribut object
                                                                let obj = element.attributes;
                                                            
                                                            
                                                                {
                                                                //Skriver Output string
                                                               
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
                                                       
                                                     
                                                    
                                                    
                                                       //Skriver ut Output string till div-element
                                                        //document.write(output);
                                                        document.getElementById("tripsFetched").innerHTML = output;
                                                    
                                                    }  )}
                                                       
                                                     
                                                    
                                                    }

                                                    async function fetchFarmStay() {

                                                        //Url till Strapi.js API för att hämta alla trips
                                                            let relaxUrl = "http://localhost:1337/api/preferences/15?fields=preference&populate=trips";
                                                            
                                                            
                                                            
                                                            //Hämtar JSON från API och konverterar det till JS objekt
                                                            let stringResponse = await fetch(relaxUrl, {
                                                                method: 'GET',
                                                                headers: {
                                                                    "Content-Type": "application/json",
                                                                }});
                                                            let myObject = await stringResponse.json();
                                                            
                                                        
                                                            console.log(myObject);
                                                            
                                                            let output = "";
                                                            
                                                            //Checkar om det är ett eller flera objekt som hämtas
                                                            //Kan undvikas genom flera funktioner; en för alla och en för unik
                                                            if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                //Skapar en ForEach loop för varje element i Data-arrayen
                                                                myObject.data.attributes.trips.data.forEach(element => {
                                                            
                                                                    //Gör en pekare till attribut object
                                                                    let obj = element.attributes;
                                                                
                                                                
                                                                    {
                                                                    //Skriver Output string
                                                                   
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
                                                           
                                                         
                                                        
                                                        
                                                           //Skriver ut Output string till div-element
                                                            //document.write(output);
                                                            document.getElementById("tripsFetched").innerHTML = output;
                                                        
                                                        }  )}
                                                           
                                                         
                                                        
                                                        }


                                                        async function fetchNorth() {

                                                            //Url till Strapi.js API för att hämta alla trips
                                                                let relaxUrl = "http://localhost:1337/api/geolocations/1?fields=place&populate=trips";
                                                                
                                                                
                                                                
                                                                //Hämtar JSON från API och konverterar det till JS objekt
                                                                let stringResponse = await fetch(relaxUrl, {
                                                                    method: 'GET',
                                                                    headers: {
                                                                        "Content-Type": "application/json",
                                                                    }});
                                                                let myObject = await stringResponse.json();
                                                                
                                                            
                                                                console.log(myObject);
                                                                
                                                                let output = "";
                                                                
                                                                //Checkar om det är ett eller flera objekt som hämtas
                                                                //Kan undvikas genom flera funktioner; en för alla och en för unik
                                                                if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                    //Skapar en ForEach loop för varje element i Data-arrayen
                                                                    myObject.data.attributes.trips.data.forEach(element => {
                                                                
                                                                        //Gör en pekare till attribut object
                                                                        let obj = element.attributes;
                                                                    
                                                                    
                                                                        {
                                                                        //Skriver Output string
                                                                       
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
                                                                
                                                               
                                                             
                                                            
                                                            
                                                               //Skriver ut Output string till div-element
                                                                //document.write(output);
                                                                document.getElementById("tripsFetched").innerHTML = output;
                                                            
                                                            }  )}
                                                               
                                                             
                                                            
                                                            }

                                                            async function fetchSouth() {

                                                                //Url till Strapi.js API för att hämta alla trips
                                                                    let relaxUrl = "http://localhost:1337/api/geolocations/2?fields=place&populate=trips";
                                                                    
                                                                    
                                                                    
                                                                    //Hämtar JSON från API och konverterar det till JS objekt
                                                                    let stringResponse = await fetch(relaxUrl, {
                                                                        method: 'GET',
                                                                        headers: {
                                                                            "Content-Type": "application/json",
                                                                        }});
                                                                    let myObject = await stringResponse.json();
                                                                    
                                                                
                                                                    console.log(myObject);
                                                                    
                                                                    let output = "";
                                                                    
                                                                    //Checkar om det är ett eller flera objekt som hämtas
                                                                    //Kan undvikas genom flera funktioner; en för alla och en för unik
                                                                    if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                        //Skapar en ForEach loop för varje element i Data-arrayen
                                                                        myObject.data.attributes.trips.data.forEach(element => {
                                                                    
                                                                            //Gör en pekare till attribut object
                                                                            let obj = element.attributes;
                                                                        
                                                                        
                                                                            {
                                                                            //Skriver Output string
                                                                           
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
                                                                    
                                                                   
                                                                 
                                                                
                                                                
                                                                   //Skriver ut Output string till div-element
                                                                    //document.write(output);
                                                                    document.getElementById("tripsFetched").innerHTML = output;
                                                                
                                                                }  )}
                                                                   
                                                                 
                                                                
                                                                }

                                                                async function fetchGoldenCircle() {

                                                                    //Url till Strapi.js API för att hämta alla trips
                                                                        let relaxUrl = "http://localhost:1337/api/geolocations/3?fields=place&populate=trips";
                                                                        
                                                                        
                                                                        
                                                                        //Hämtar JSON från API och konverterar det till JS objekt
                                                                        let stringResponse = await fetch(relaxUrl, {
                                                                            method: 'GET',
                                                                            headers: {
                                                                                "Content-Type": "application/json",
                                                                            }});
                                                                        let myObject = await stringResponse.json();
                                                                        
                                                                    
                                                                        console.log(myObject);
                                                                        
                                                                        let output = "";
                                                                        
                                                                        //Checkar om det är ett eller flera objekt som hämtas
                                                                        //Kan undvikas genom flera funktioner; en för alla och en för unik
                                                                        if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                            //Skapar en ForEach loop för varje element i Data-arrayen
                                                                            myObject.data.attributes.trips.data.forEach(element => {
                                                                        
                                                                                //Gör en pekare till attribut object
                                                                                let obj = element.attributes;
                                                                            
                                                                            
                                                                                {
                                                                                //Skriver Output string
                                                                               
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
                                                                       
                                                                     
                                                                    
                                                                    
                                                                       //Skriver ut Output string till div-element
                                                                        //document.write(output);
                                                                        document.getElementById("tripsFetched").innerHTML = output;
                                                                    
                                                                    }  )}
                                                                       
                                                                     
                                                                    
                                                                    }

                                                                    async function fetchHiddenGem() {

                                                                        //Url till Strapi.js API för att hämta alla trips
                                                                            let relaxUrl = "http://localhost:1337/api/geolocations/4?fields=place&populate=trips";
                                                                            
                                                                            
                                                                            
                                                                            //Hämtar JSON från API och konverterar det till JS objekt
                                                                            let stringResponse = await fetch(relaxUrl, {
                                                                                method: 'GET',
                                                                                headers: {
                                                                                    "Content-Type": "application/json",
                                                                                }});
                                                                            let myObject = await stringResponse.json();
                                                                            
                                                                        
                                                                            console.log(myObject);
                                                                            
                                                                            let output = "";
                                                                            
                                                                            //Checkar om det är ett eller flera objekt som hämtas
                                                                            //Kan undvikas genom flera funktioner; en för alla och en för unik
                                                                            if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                                //Skapar en ForEach loop för varje element i Data-arrayen
                                                                                myObject.data.attributes.trips.data.forEach(element => {
                                                                            
                                                                                    //Gör en pekare till attribut object
                                                                                    let obj = element.attributes;
                                                                                
                                                                                
                                                                                    {
                                                                                    //Skriver Output string
                                                                                   
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
                                                                                
                                                                        
                                                                           //Skriver ut Output string till div-element
                                                                            //document.write(output);
                                                                            document.getElementById("tripsFetched").innerHTML = output;
                                                                        
                                                                        }  )}
                                                                           
                                                                         
                                                                        
                                                                        }

                                                                        async function fetchSnaefellsnes() {

                                                                            //Url till Strapi.js API för att hämta alla trips
                                                                                let relaxUrl = "http://localhost:1337/api/geolocations/5?fields=place&populate=trips";
                                                                                
                                                                                
                                                                                
                                                                                //Hämtar JSON från API och konverterar det till JS objekt
                                                                                let stringResponse = await fetch(relaxUrl, {
                                                                                    method: 'GET',
                                                                                    headers: {
                                                                                        "Content-Type": "application/json",
                                                                                    }});
                                                                                let myObject = await stringResponse.json();
                                                                                
                                                                            
                                                                                console.log(myObject);
                                                                                
                                                                                let output = "";
                                                                                
                                                                                //Checkar om det är ett eller flera objekt som hämtas
                                                                                //Kan undvikas genom flera funktioner; en för alla och en för unik
                                                                                if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                                    //Skapar en ForEach loop för varje element i Data-arrayen
                                                                                    myObject.data.attributes.trips.data.forEach(element => {
                                                                                
                                                                                        //Gör en pekare till attribut object
                                                                                        let obj = element.attributes;
                                                                                    
                                                                                    
                                                                                        {
                                                                                        //Skriver Output string
                                                                                       
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
                                                                                
                                                                               
                                                                             
                                                                            
                                                                            
                                                                               //Skriver ut Output string till div-element
                                                                                //document.write(output);
                                                                                document.getElementById("tripsFetched").innerHTML = output;
                                                                            
                                                                            }  )}
                                                                               
                                                                             
                                                                            
                                                                            }

                                                                            async function fetchRingRoad() {

                                                                                //Url till Strapi.js API för att hämta alla trips
                                                                                    let relaxUrl = "http://localhost:1337/api/geolocations/6?fields=place&populate=trips";
                                                                                    
                                                                                    
                                                                                    
                                                                                    //Hämtar JSON från API och konverterar det till JS objekt
                                                                                    let stringResponse = await fetch(relaxUrl, {
                                                                                        method: 'GET',
                                                                                        headers: {
                                                                                            "Content-Type": "application/json",
                                                                                        }});
                                                                                    let myObject = await stringResponse.json();
                                                                                    
                                                                                
                                                                                    console.log(myObject);
                                                                                    
                                                                                    let output = "";
                                                                                    
                                                                                    //Checkar om det är ett eller flera objekt som hämtas
                                                                                    //Kan undvikas genom flera funktioner; en för alla och en för unik
                                                                                    if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                                        //Skapar en ForEach loop för varje element i Data-arrayen
                                                                                        myObject.data.attributes.trips.data.forEach(element => {
                                                                                    
                                                                                            //Gör en pekare till attribut object
                                                                                            let obj = element.attributes;
                                                                                        
                                                                                        
                                                                                            {
                                                                                            //Skriver Output string
                                                                                           
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
                                                                                   
                                                                                 
                                                                                
                                                                                
                                                                                   //Skriver ut Output string till div-element
                                                                                    //document.write(output);
                                                                                    document.getElementById("tripsFetched").innerHTML = output;
                                                                                
                                                                                }  )}
                                                                                   
                                                                                 
                                                                                
                                                                                }

                                                                                async function fetchMountainTrip() {

                                                                                    //Url till Strapi.js API för att hämta alla trips
                                                                                        let relaxUrl = "http://localhost:1337/api/geolocations/7?fields=place&populate=trips";
                                                                                        
                                                                                        
                                                                                        
                                                                                        //Hämtar JSON från API och konverterar det till JS objekt
                                                                                        let stringResponse = await fetch(relaxUrl, {
                                                                                            method: 'GET',
                                                                                            headers: {
                                                                                                "Content-Type": "application/json",
                                                                                            }});
                                                                                        let myObject = await stringResponse.json();
                                                                                        
                                                                                    
                                                                                        console.log(myObject);
                                                                                        
                                                                                        let output = "";
                                                                                        
                                                                                        //Checkar om det är ett eller flera objekt som hämtas
                                                                                        //Kan undvikas genom flera funktioner; en för alla och en för unik
                                                                                        if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                                            //Skapar en ForEach loop för varje element i Data-arrayen
                                                                                            myObject.data.attributes.trips.data.forEach(element => {
                                                                                        
                                                                                                //Gör en pekare till attribut object
                                                                                                let obj = element.attributes;
                                                                                            
                                                                                            
                                                                                                {
                                                                                                //Skriver Output string
                                                                                               
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
                                                                                    
                                                                                      //Skriver ut Output string till div-element
                                                                                        //document.write(output);
                                                                                        document.getElementById("tripsFetched").innerHTML = output;
                                                                                    
                                                                                    }  )}
                                                                                       
                                                                                     
                                                                                    
                                                                                    }

                                                                                    async function fetchFjords() {

                                                                                        //Url till Strapi.js API för att hämta alla trips
                                                                                            let relaxUrl = "http://localhost:1337/api/geolocations/8?fields=place&populate=trips";
                                                                                            
                                                                                            
                                                                                            
                                                                                            //Hämtar JSON från API och konverterar det till JS objekt
                                                                                            let stringResponse = await fetch(relaxUrl, {
                                                                                                method: 'GET',
                                                                                                headers: {
                                                                                                    "Content-Type": "application/json",
                                                                                                }});
                                                                                            let myObject = await stringResponse.json();
                                                                                            
                                                                                        
                                                                                            console.log(myObject);
                                                                                            
                                                                                            let output = "";
                                                                                            
                                                                                            //Checkar om det är ett eller flera objekt som hämtas
                                                                                            //Kan undvikas genom flera funktioner; en för alla och en för unik
                                                                                            if (Array.isArray(myObject.data.attributes.trips.data)){
                                                                                                //Skapar en ForEach loop för varje element i Data-arrayen
                                                                                                myObject.data.attributes.trips.data.forEach(element => {
                                                                                            
                                                                                                    //Gör en pekare till attribut object
                                                                                                    let obj = element.attributes;
                                                                                                
                                                                                                
                                                                                                    {
                                                                                                    //Skriver Output string
                                                                                                   
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
                                                                                        
                                                                                           //Skriver ut Output string till div-element
                                                                                            //document.write(output);
                                                                                            document.getElementById("tripsFetched").innerHTML = output;
                                                                                        
                                                                                        }  )}                              
                                                                                    }