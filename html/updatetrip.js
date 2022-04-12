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
    
    //Checkar om det är ett eller flera objekt som hämtas
    //Kan undvikas genom flera funktioner; en för alla och en för unik
    if (Array.isArray(myObject.data)){
        //Skapar en ForEach loop för varje element i Data-arrayen
        myObject.data.forEach(element => {
    
            //Gör en pekare till attribut object
            let obj = element.attributes;
        
        
            if (!obj.tripMap2.data) {
            //Skriver Output string
           
            output += `
        
            <div class="trip" data-id=${element.id}>
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
                    <th><p>Leaving from: </p></th>
                    <th><p>First Destination:</p></th>
                    <th><p>Second Destination:</p></th>
                    <th><p>Third Destination:</p></th>
                    <th><p>Finishing At:</p></th>
                    </tr>
    
                    <tr>
                        <td><p class="trip-leavingdestination">${obj.TripDestinations.LeavingDestination}</p></td> 
                        <td><p class="trip-betweendestination">${obj.TripDestinations.BetweenDestination}</p></td>
                        <td><p class="trip-betweendestination2">${obj.TripDestinations.BetweenDestination2}</p></td>
                        <td><p class="trip-betweendestination3">${obj.TripDestinations.BetweenDestination3}</p></td>
                        <td><p class="trip-arrivingdestination">${obj.TripDestinations.ArrivingDestination}</p></td>
                    </tr>
                  
                </table>


                <p>The map has not been downloaded by the user.</p>
                </div>
                </div>
                <button id="edit">Edit</button>
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
        <div class="column griddescription">
            <p>Description: </p>
            <p class="trip-description">${obj.tripDescription}</p>
           
    </div>

            <table>
                <tr>
                <th><p>Leaving from: </p></th>
                <th><p>First Destination:</p></th>
                <th><p>Second Destination:</p></th>
                <th><p>Third Destination:</p></th>
                <th><p>Finishing At:</p></th>
                </tr>

                <tr>
                    <td><p class="trip-leavingdestination">${obj.TripDestinations.LeavingDestination}</p></td> 
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
        <button id="edit">Edit</button>

         
        `;
    }
    
  
     output += "</div> ";


   

}  )}
   
 //Skriver ut Output string till div-element
    //document.write(output);
    document.getElementById("tripsFetched").innerHTML = output;

    document.getElementById("tripsFetched").addEventListener('click', (e) => {
        e.preventDefault();
        let delButtonIsPressed = e.target.id == 'delete';
        let editButtonIsPressed = e.target.id == 'edit';
    
        let id = e.target.parentElement.dataset.id;
        //Delete - remove the existing post
        /*method: DELETE
        if(delButtonIsPressed) {
            fetch(`${tripsUrl}/${id}`, {
                method:'DELETE',
            })
            .then(res => res.json())
            .then(() => location.reload())
    } */
    if(editButtonIsPressed) {
        const parent = e.target.parentElement;
        parent.innerHTML +=`
    
        
        <div class="loginform">

    <p class="titel">Log in to continue</p>
        <label for="user">Username:</label><br>
        <input type="text" name="user" id="user" placeholder="Username" onchange="userValidate(this);">
        <div id="userError" class="errorInfo"></div>
        <br>

        <label for="email">Email:</label><br>
        <input type="email" name="email" id="email" placeholder="Email" onchange="emailValidate(this);">
        <div id="emailError" class="errorInfo"></div>
        <br>

        <label for="password">Password:</label><br>
        <input type="password" name="password" id="password" placeholder="Password" onchange="passwordValidate(this);">
        <div id="passwordError" class="errorInfo"></div>
        </div>
       
       
        <br>

        <div class="newtripform"
        <p class="titel">Fill in the details for your trip</p>
        <label for="name">Give a name to your trip:</label><br>
        <input type="text" name="name" id="name" placeholder="" onchange="tripNameValidate(this);">
        <div id="tripNameError" class="errorInfo"></div>
     

        <div>
        <br>
        <label for="description">Description:</label><br>
        <input type="text" name="description" id="description" onchange="tripDescriptionValidate(this);">
        <div id="tripDescriptionError" class="errorInfo"></div>
       </div>

        <div>
        <br>
        <form name="newtripseats">
        <label for="seats">Seats</label><br>
        <input type="number" name="seats" id="seats" onchange="tripSeatsValidate(this);">
        <div id="tripSeatsError" class="errorInfo"></div>
        </form>
        </div>

        <div>
        <br>
        <form name="newtripleaving">
        <label for="tripDates-leaving">Leaving on:</label><br>
        <input type="date" name="tripDates-leaving" id="tripDates-leaving" placeholder="Departure date" onchange="tripLeavingDatesValidate(this);">
        <div id="tripLeavingDateError" class="errorInfo"></div>
        </form>
        </div>
        
        <div>
        <form name="newtriparriving">
        <label for="tripDates-arriving">Arriving on</label><br>
        <input type="date" name="tripDates-arriving" id="tripDates-arriving" placeholder="Arriving date"onchange="tripArrivingDatesValidate(this);">
        <div id="tripArrivingDateError" class="errorInfo"></div>
        </form>
        </div>
        
        <div>
        <br>
        <label for="leavingDestination">Leaving from:</label><br>
        <input type="text" name="leavingDestination" id="leavingDestination" placeholder="the place you're leaving from" onchange="tripLeavingDestinationValidate(this);">
        <div id="tripLeavingDestinationError" class="errorInfo"></div>
        </div>

        <div>
        <label for="leavingDestination">First Destination:</label><br>
        <input type="text" name="betweenDestination" placeholder="First stop" id="betweenDestination">
        </div>

        <div>
        <label for="leavingDestination">Second Destination:</label><br>
        <input type="text" name="betweenDestination2" placeholder="Second stop" id="betweenDestination2">
        </div>

        <div>
        <label for="leavingDestination">Third Destination:</label><br>
        <input type="text" name="betweenDestination3" placeholder="Third stop"id="betweenDestination3">
        </div>

        <div>
        
        <label for="arrivingDestination">Coming back to:</label><br>
        <input type="text" name="arrivingDestination" id="arrivingDestination" placeholder="the place you're finishing your trip at" onchange="tripArrivingDestinationValidate(this);">
        <div id="tripArrivingDestinationError" class="errorInfo"></div>
        </div>

        <div>
        <label for="tripMap2">Upload map</label><br>
        <input type="file" name="tripMap2" id="tripMap2">
        </div>
        
        
        
        </div>
        </div>
        <button onclick="updateTrip()" id="button">Update a trip</button>
        <button id="delete" onclick="deleteTrip();">Delete</button>
        </div>
        `
        let nameValue = document.getElementById('name');
        let descriptionValue = document.getElementById('description');
        let tripDatesLeavingValue = document.getElementById('tripDates-leaving');
        let tripDatesArrivingValue = document.getElementById('tripDates-arriving');
        let leavingDestinationValue = document.getElementById('leavingDestination');
        let betweenDestinationValue = document.getElementById('betweenDestination');
        let betweenDestinationValue2 = document.getElementById('betweenDestination2');
        let betweenDestinationValue3 = document.getElementById('betweenDestination3');
        let arrivingDestinationValue = document.getElementById('arrivingDestination');
        let seatsValue = document.getElementById('seats');
        
        let tripName = parent.querySelector('.trip-name').textContent;
        let tripDescription = parent.querySelector('.trip-description').textContent;
        let tripLeavingDate = parent.querySelector('.trip-leavingdate').textContent;
        let tripArrivingDate = parent.querySelector('.trip-arrivingdate').textContent;
        let tripLeavingDestination = parent.querySelector('.trip-leavingdestination').textContent;
        let tripBetweenDestination = parent.querySelector('.trip-betweendestination').textContent;
        let tripBetweenDestination2 = parent.querySelector('.trip-betweendestination2').textContent;
        let tripBetweenDestination3 = parent.querySelector('.trip-betweendestination3').textContent;
        let tripArrivingDestination = parent.querySelector('.trip-arrivingdestination').textContent;
        let tripSeats = parent.querySelector('.trip-seats').textContent;
        
        nameValue.value = tripName;
        descriptionValue.value = tripDescription;
        tripDatesLeavingValue.value = tripLeavingDate;
        tripDatesArrivingValue.value = tripArrivingDate;
        leavingDestinationValue.value = tripLeavingDestination;
        betweenDestinationValue.value = tripBetweenDestination;
        betweenDestinationValue2.value = tripBetweenDestination2;
        betweenDestinationValue3.value = tripBetweenDestination3;
        arrivingDestinationValue.value = tripArrivingDestination;
        seatsValue.value = tripSeats;
    }

}


)
}


async function getToken() {
    //1. Göra ett inloggningsförsök för att få en Token returnerad
    //2. Sammla data och skapa ett objekt av dessa
    //3. Skicka iväg JSON till API /
    
    let valid = true;

    //Validera användarnamn och lösenord!
    if ( !validateLogin() ) valid = false;

    //Validera TripData
    if ( !validateTrips() ) valid = false;

    if (!valid) return null;

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
//Kontrollerar om objektet har Token.
    //Token ligger under attribut jwt
    //Om så; inloggning är korrekt. Fortsätt till funktion postData med token som parameter.
    if (userJson.jwt) return userJson.jwt;
    else {
        //Inloggningen har misslyckats. Skriv ut errormeddelande från Strapi.js
       // let errMessage = userJson.error.message;

        document.getElementById("userError").innerText = "Unfortunately it did not work";

        return null;
    }
};

async function deleteTrip() {
    let deleteUrl="http://localhost:1337/api/trips";

    //Hämta Token från GetToken()
    //Om ingen Token returneras, avbryt funktionen
    let token = await getToken();
    if (!token) return;

    let id = document.getElementById("delete").parentElement.dataset.id;

    //Anropar API med inloggningsdata.
    //Inkluderar Method och Headers
    await fetch(`${deleteUrl}/${id}`,
        {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token //Inkluderar Token från inloggning tidigare.
            }
        })

    //Anropa "GetDataFromStrapi" för att skriva ut ny tabell
    .then(res => res.json())
            .then(() => location.reload())

}

async function updateTrip() {
    let updateUrl="http://localhost:1337/api/trips";

    //Hämta Token från GetToken()
    //Om ingen Token returneras, avbryt funktionen
    let token = await getToken();
    if (!token) return;

    let id = document.getElementById("button").parentElement.dataset.id;
   

    //Hämtar data från fält
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

    //Skapa ett objekt med data inkluderat.
    let TripsObject = {
       
        data : {
           
            TripDates: {
                
            
        },
        TripDestinations: {
        
          
        },
        
    }}

    //Fyller upp Data med parameter-värden
  
    if (name) TripsObject.data["tripName"] = name;
   if (description) TripsObject.data["tripDescription"] = description;
   if (seats) TripsObject.data["Seats"] = seats;
   if (tripDatesLeaving) TripsObject.data.TripDates["LeavingDate"] = tripDatesLeaving;
   if (tripDatesArriving) TripsObject.data.TripDates["ArrivingDate"] = tripDatesArriving;
   if (leavingDestination) TripsObject.data.TripDestinations["LeavingDestination"] = leavingDestination;
   if (betweenDestination) TripsObject.data.TripDestinations["BetweenDestination"] = betweenDestination;
   if (betweenDestination2) TripsObject.data.TripDestinations["BetweenDestination2"] = betweenDestination2;
   if (betweenDestination3) TripsObject.data.TripDestinations["BetweenDestination3"] = betweenDestination3;
   if (arrivingDestination) TripsObject.data.TripDestinations["ArrivingDestination"] = arrivingDestination;
   
   
    //Anropar API med pokemonObjekt
    await fetch(`${updateUrl}/${id}`,
    {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token //Inkluderar Token från inloggning tidigare.
        },
        body: JSON.stringify(TripsObject)
    })

    .then(res => res.json())
            .then(() => location.reload())
    
}

 //Funktioner för validering
//Validering av User Input
function userValidate(comp) {
    // 1. Fältet måste vara ifyllt

    let valid = true;

    if (comp.value.length == 0) {
        //Misslyckad validering
        valid = false;
    }

    //Check on lyckad validering
    if (!valid) {
        document.getElementById("userError").innerText = "Please write your username";
        return false;
    } else {
        document.getElementById("userError").innerText = "";
        return true;
    }
}



function emailValidate(comp)
{
valid=false;
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if(comp.value.match(mailformat)) 
    {
        valid = true;
    }



if(!valid) {
    document.getElementById("emailError").innerText = "This email address is not valid";
    return false;
} else {
    document.getElementById("emailError").innerText = "";
    return true;
}
}

//Validering av Password input
function passwordValidate(comp) {
    // 1. Fältet måste vara minst 5 tecken eller längre

    let valid = true;

    if (comp.value.length <= 4) {
        //Misslyckad validering
        valid = false;
    }

    //Check on lyckad validering
    if (!valid) {
        document.getElementById("passwordError").innerText = "Please write a password of minimum 5 characters";
        return false;
    } else {
        document.getElementById("passwordError").innerText = "";
        return true;
    }
}

//funktion för validering av inloggninfsförsök
function validateLogin() {
    //Variabel
    let valid = true;

    //Validate Användarnamn
    if (!userValidate(document.getElementById("user"))) {
        valid = false;
    }

     //Validate Email
     if (!emailValidate(document.getElementById("email"))) {
        valid = false;
    }

    //Validate Password
    if (!passwordValidate(document.getElementById("password"))) {
        valid = false;
    }

    return valid;
}

//Funktion för validering av Trip Name
function tripNameValidate(comp) {
    // 1. Fältet måste innehålla ett värde
    // 2. Fältet får inte vara ett nummer

    let valid = true;

    //CHeck om value är större än 0
    if (comp.value.length == 0) {
        //Felaktig validering
        valid = false;
        document.getElementById("tripNameError").innerText = "Please give a name to your trip";
    }

    //CHeck att värdet inte är ett nummer
    if ( !isNaN( comp.value ) && comp.value.length != 0) {
        //Felaktig validering
        valid = false;
        document.getElementById("tripNameError").innerText = "The name cannot contain numbers";
    }

    if (valid) {
        document.getElementById("tripNameError").innerText = "";
    }

    return valid;
}

//Funktion för validering av Trip Name
function tripDescriptionValidate(comp) {
    // 1. Fältet måste innehålla ett värde
    

    let valid = true;

    //CHeck om value är större än 0
    if (comp.value.length == 0) {
        //Felaktig validering
        valid = false;
        document.getElementById("tripDescriptionError").innerText = "Please describe your trip";
    }

  
    if (valid) {
        document.getElementById("tripDescriptionError").innerText = "";
    }

    return valid;
}
//Funktion för validering av Trip Name
function tripLeavingDatesValidate(comp) {
    // 1. Fältet måste innehålla ett värde
   let valid=true;

    var comp = document.forms['newtripleaving']['tripDates-leaving'].value;
             if( !comp.replace(/\s+/, '').length ) {
                 valid=false;
                 document.getElementById("tripLeavingDateError").innerText = "Please tell fellow travelers when you will be leaving";
             }
  
    if (valid) {
        document.getElementById("tripLeavingDateError").innerText = "";
    }

    return valid;
}

//Funktion för validering av Trip Name
function tripArrivingDatesValidate(comp) {
    // 1. Fältet måste innehålla ett värde
   let valid=true;

    var comp = document.forms['newtriparriving']['tripDates-arriving'].value;
             if( !comp.replace(/\s+/, '').length ) {
                 valid=false;
                 document.getElementById("tripArrivingDateError").innerText = "Please tell fellow travelers when you will be coming back";
             }
  
    if (valid) {
        document.getElementById("tripArrivingDateError").innerText = "";
    }

    return valid;
}

//Funktion för validering av Trip Name
function tripSeatsValidate(comp) {
    // 1. Fältet måste innehålla ett värde
   let valid=true;

    var comp = document.forms['newtripseats']['seats'].value;
             if( !comp.replace(/\s+/, '').length ) {
                 valid=false;
                 document.getElementById("tripSeatsError").innerText = "Please indicate the number of available seats on this trip";
             }
  
    if (valid) {
        document.getElementById("tripSeatsError").innerText = "";
    }

    return valid;
}

//Funktion för validering av Trip Name
function tripLeavingDestinationValidate(comp) {
    // 1. Fältet måste innehålla ett värde
    // 2. Fältet får inte vara ett nummer

    let valid = true;

    //CHeck om value är större än 0
    if (comp.value.length == 0) {
        //Felaktig validering
        valid = false;
        document.getElementById("tripLeavingDestinationError").innerText = "Please tell fellow travelers where you will be leaving";
    }

  
    if (valid) {
        document.getElementById("tripLeavingDestinationError").innerText = "";
    }

    return valid;
}


//Funktion för validering av Trip Name
function tripArrivingDestinationValidate(comp) {
    // 1. Fältet måste innehålla ett värde
    // 2. Fältet får inte vara ett nummer

    let valid = true;

    //CHeck om value är större än 0
    if (comp.value.length == 0) {
        //Felaktig validering
        valid = false;
        document.getElementById("tripArrivingDestinationError").innerText = "Please tell fellow travelers where you will be arriving";
    }

  
    if (valid) {
        document.getElementById("tripArrivingDestinationError").innerText = "";
    }

    return valid;
}
//FUnktion för validering av Trip Name
function validateTrips() {
    let valid = true;

    //Validate TripName
    if ( !tripNameValidate(document.getElementById("name")) ) {
        valid = false;
    }

    //Validate TripName
    if ( !tripDescriptionValidate(document.getElementById("description")) ) {
        valid = false;
    }

    //Validate TripName
    if ( !tripLeavingDatesValidate(document.getElementById("tripDates-leaving")) ) {
        valid = false;
    }

    //Validate TripName
    if ( !tripArrivingDatesValidate(document.getElementById("tripDates-leaving")) ) {
        valid = false;
    }

     //Validate TripName
     if ( !tripSeatsValidate(document.getElementById("tripDates-leaving")) ) {
        valid = false;
    }
     //Validate TripName
     if ( !tripLeavingDestinationValidate(document.getElementById("leavingDestination")) ) {
        valid = false;
    }

      //Validate TripName
      if ( !tripArrivingDestinationValidate(document.getElementById("arrivingDestination")) ) {
        valid = false;
    }

    return valid;
}

   
   



