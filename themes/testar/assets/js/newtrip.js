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
    
    //Kontrollerar om object har Token.
    //Token ligger under attribut jwt
    //Om så; inloggning är korrekt. Fortsätt till funktion postData med token som parameter.
    if (userJson.jwt) return userJson.jwt;

    else {
        //Inloggningen har misslyckats. Skriv ut errormeddelande från Strapi.js
        //let errMessage = userJson.error.message;

        document.getElementById("userError").innerText = "Unfortunately it did not work";

        return null;
    }
    }
    
    /*async function postImage() {
        const urlUpload = "http://localhost:1337/api/upload";



    const formElement = document.getElementById('imageentry');

    const request = new XMLHttpRequest();

    const formData = new FormData();

    const formElements = formElement.elements;

    const data = {};

    for (let i = 0; i < formElements.length; i++) {
      const currentElement = formElements[i];
      if (!['file'].includes(currentElement.type)) {
        data[currentElement.name] = currentElement.value;
      } else if (currentElement.type === 'file') {
        for (let i = 0; i < currentElement.files.length; i++) {
          const file = currentElement.files[i];
          formData.append(`files.${currentElement.name}`, file, file.name);
        }
      }
    }

    formData.append('data', JSON.stringify(data));

    request.open('POST', `${urlUpload}/trips`);

    request.send(formData);
  }*/


   

    async function postTrip() {

    //Anropa GetToken() för att få en inloggnings-nyckel.
    //Om detta misslyckas, avbryt funktionen.
    let token = await getToken();
    if (!token) return;

/*await postImage();*/
   

        //URL till Strapi trips collection.
        const urlTrips = "http://localhost:1337/api/trips/";
        
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
    
        //Anropa "GetDataFromStrapi" för att skriva ut ny tabell
        await getDataFromStrapi();
    
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

   