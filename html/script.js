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
    

    /*console.log(myObject);*/
    
    let output = "";
    
    //Checkar om det är ett eller flera objekt som hämtas
    //Kan undvikas genom flera funktioner; en för alla och en för unik
    if (Array.isArray(myObject.data)){
        //Skapar en ForEach loop för varje element i Data-arrayen
        myObject.data.forEach(element => {
    
            //Gör en pekare till attribut object
            let obj = element.attributes;

            /*for (x in obj) {
                console.log( x + ": " + obj[x]);
            }*/
    if (obj.tripMap2) {
            //Skriver Output string
           
            output += `
            <div class="trip" data-id=${element.id}>
            
            <h2 class="trip-name">${obj.tripName}</h2>
            
            <p class="trip-description">Description: ${obj.tripDescription}</p><p class="trip-leavingdate">Leaving Date: ${obj.TripDates.LeavingDate} </p><p class="trip-arrivingdate">Arriving Date: ${obj.TripDates.ArrivingDate} </p> <p class="trip-leavingdestination"> Leaving From: ${obj.TripDestinations.LeavingDestination}</p> <p class="trip-betweendestination"> First Destination: ${obj.TripDestinations.BetweenDestination} </p> <p class="trip-betweendestination2">Second Destination: ${obj.TripDestinations.BetweenDestination2} </p> <p class="trip-betweendestination3">
            Third Destination: ${obj.TripDestinations.BetweenDestination3} </p> <p class="trip-arrivingdestination"> Finishing At: ${obj.TripDestinations.ArrivingDestination}</p> <p class="trip-seats"> Available Seats: ${obj.Seats}</p> <br>
            
            <img src=${apiUrl}${obj.tripMap2.data[0].attributes.formats.large.url} class="trip-image"/> 
        
       
            </div>
            
            `
            ;
        }});
    } else {
    //if the user did not add any map
            //Skriver Output string without map

        output += 
        `<div data-id=${element.id}>
        
    
        <h2 class="trip-name">${obj.tripName}</h2>
        
        
        
        <p class="trip-description"> Description: ${obj.tripDescription} Leaving Date: ${obj.TripDates.LeavingDate} Arriving Date: ${obj.TripDates.ArrivingDate} Leaving From: ${obj.TripDestinations.LeavingDestination} First Destination: ${obj.TripDestinations.BetweenDestination} Second Destination: ${obj.TripDestinations.BetweenDestination2}
        Third Destination: ${obj.TripDestinations.BetweenDestination3} Finishing At: ${obj.TripDestinations.ArrivingDestination} Available Seats: ${obj.Seats}. The map is missing.  </p>
    
       
        </div>
         
        `;
        /*Gör en pekare till attribut objektet
        let obj = myObject.data.attributes;
        for (x in obj) {
            console.log( x + ": " + obj[x]);
        }
    
        //Skriver Output string
        output += `<div>Namn: ${obj.name}</div> Description: ${obj.tripDescription}</div>`;
*/
      
    }
    
    //Skriver ut Output string till div-element
    //document.write(output);
    document.getElementById("tripsFetched").innerHTML = output;

}
  




    //Funktion för att hämta Token för användare
    //Om en Token hämtas så betyder det att user/password är korrekt skrivet
    async function getToken() {
    //1. Göra ett inloggningsförsök för att få en Token returnerad
    //2. Sammla data och skapa ett objekt av dessa
    //3. Skicka iväg JSON till API /
    
    //Url till Strapi.js UserList
    const urlUser = "http://localhost:1337/api/auth/local/";
    
    const user = document.getElementById("user").value;
    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;
    
    //Skapar ett objekt av det användarnamn och lösenord som user har skrivit in i fält.
    let userObject = {
        identifier : user,
        email : email,
        password : password
    }
    
    //Anropar API med inloggningsdata.
    //Inkluderar Method och Headers
    let userResponse = await fetch(urlUser,
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObject)
    });
    
    //Konverterar API response JSON string till ett object
    let userJson = await userResponse.json();
    console.log(userJson);
    
    //Kontrollerar om object har Token.
    //Token ligger under attribut jwt
    //Om så; inloggning är korrekt. Fortsätt till funktion postData med token som parameter.
    if (userJson.jwt) postData(userJson.jwt);
    }
    
    async function postData(token) {
    
    //URL till Strapi trips collection.
    const urlTrips = "http://localhost:1337/api/trips";
    
    // Hämtar data från fält
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const seats = document.getElementById("seats").value;
    const tripDatesLeaving = document.getElementById("tripDates-leaving").value;
    const tripDatesArriving = document.getElementById("tripDates-arriving").value;
    const leavingDestination = document.getElementById("leavingDestination").value;
    const betweenDestination = document.getElementById("betweenDestination").value;
    const betweenDestination2 = document.getElementById("betweenDestination2").value;
    const betweenDestination3 = document.getElementById("betweenDestination3").value;
    const arrivingDestination = document.getElementById("arrivingDestination").value;
    const tripMap2 = document.getElementById("tripMap2").value;



    
    //Skapa ett object med data inkluderat.
    let TripsObject = {
        data : {
            tripName : name,
            tripDescription : description,
            Seats : seats,
            TripDates: {
                ArrivingDate: tripDatesArriving,
LeavingDate: tripDatesLeaving
            
        },
        TripDestinations: {
        
            LeavingDestination: leavingDestination,
            BetweenDestination: betweenDestination,
            BetweenDestination2: betweenDestination2,
            BetweenDestination3: betweenDestination3,
            ArrivingDestination: arrivingDestination
        },
        tripMap2: tripMap2,
                  
                    
   
    
  
    }

    }
    
    //Anropar API med TripsObject
    let TripsResponse = await fetch(urlTrips,
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token //Inkluderar Token från inloggning tidigare.
        },
        body: JSON.stringify(TripsObject)
    });
    
    let tripsJson = await TripsResponse.json();
    
    console.log(tripsJson);

    }

   

    //http://localhost:1337/api/geolocations?fields=place&populate=trips
     //north http://localhost:1337/api/geolocations/1?fields=place&populate=trips
     //south http://localhost:1337/api/geolocations/2?fields=place&populate=trips
     //golden circle http://localhost:1337/api/geolocations/3?fields=place&populate=trips
     // hidden gem http://localhost:1337/api/geolocations/4?fields=place&populate=trips
//snaefellsnes http://localhost:1337/api/geolocations/5?fields=place&populate=trips
//Ring road http://localhost:1337/api/geolocations/6?fields=place&populate=trips
//mountain trip http://localhost:1337/api/geolocations/7?fields=place&populate=trips
//fjords http://localhost:1337/api/geolocations/8?fields=place&populate=trips


//Relax http://localhost:1337/api/preferences/1?fields=preference&populate=trips
//waterfalls http://localhost:1337/api/preferences/2?fields=preference&populate=trips
//hiking http://localhost:1337/api/preferences/3?fields=preference&populate=trips
//northern lights http://localhost:1337/api/preferences/4?fields=preference&populate=trips
//glacier walk http://localhost:1337/api/preferences/5?fields=preference&populate=trips
//Camping http://localhost:1337/api/preferences/6?fields=preference&populate=trips
//whale watching http://localhost:1337/api/preferences/7?fields=preference&populate=trips
//Swimming pool http://localhost:1337/api/preferences/8?fields=preference&populate=trips
//photography http://localhost:1337/api/preferences/9?fields=preference&populate=trips
//spontaneous trip http://localhost:1337/api/preferences/10?fields=preference&populate=trips
//sport http://localhost:1337/api/preferences/11?fields=preference&populate=trips
//party http://localhost:1337/api/preferences/12?fields=preference&populate=trips
//hot springs http://localhost:1337/api/preferences/13?fields=preference&populate=trips
//Couchsurfing http://localhost:1337/api/preferences/14?fields=preference&populate=trips
//Farm stay http://localhost:1337/api/preferences/15?fields=preference&populate=trips


//2 seats left http://localhost:1337/api/trips?filters[seats][$lte]=2
//3 seats left http://localhost:1337/api/trips?filters[seats][$lte]=3
//4 seats left http://localhost:1337/api/trips?filters[seats][$lte]=4
//5 seats left http://localhost:1337/api/trips?filters[seats][$lte]=5


//POST http://localhost:1337/api/auth/local/register

// create trip post http://localhost:1337/api/trips









