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
    
             //if/else if statement for when the map is not downloaded by the user
        //dates become a string without time so that they can get back into the input date field when updating a trip
        //here if user did not upload a map
        //data-id in the main div is used to get the object's id and use it in update and delete functions later
         //the new trip form is not ready for uploading a map neither for selecting preferences and geolocation when creating a trip so this output does not show either map or preferences and geolocation
            let obj = element.attributes;
        
        
            if (!obj.tripMap2.data) {
           

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
        //here if the user has downloaded a map, and there's geolocation and preferences linked to the trip
    
    else if (obj.tripMap2.data) {
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

//getToken tries to login to get a token back, it gets the user login details and creates an object of it, and sends in JSON format to the API
async function getToken() {
    
    let valid = true;

    //if the login details are not valid, get token stops
    if ( !validateLogin() ) valid = false;

    //if the trips details are not valid, get token stops
    if ( !validateTrips() ) valid = false;

    if (!valid) return null;

    //url to the Strapi's userlist
    const urlUser = "http://localhost:1337/api/auth/local/";
    
    const user = document.getElementById("user").value;
    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;
    
    //creates an object with the info given by the user with the username, email and password
    let userObject = {
        identifier : user,
        email : email,
        password : password
    }
    
    //calls the API with the user info 
    let userResponse = await fetch(urlUser,
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObject)
    });
    
    
    let userJson = await userResponse.json();
    console.log(userJson);
    
    //checks if the object has a token, if so, the function postTrip will work
    if (userJson.jwt) return userJson.jwt;
//if no, the login does not work and the user gets an error message
    else {

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

    //calls getToken to get an authentification key
    //if getToken did not work, the function postTrip stops
    let token = await getToken();
    if (!token) return;

/*await postImage();*/
   

        //url to the strapi's trips collection
        const urlTrips = "http://localhost:1337/api/trips/";
        
        // get the data from the new trip form
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
    
    
    
        
        //create an object with the included data from the new trip form
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
        
        //calls the API and post the data
        let TripsResponse = await fetch(urlTrips,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token //including the token from getToken
            },
            body: JSON.stringify(TripsObject)
        });
        
        let tripsJson = await TripsResponse.json();
        
        console.log(tripsJson);
    
       //Calls getDataFromStrapi to get all the trips and the new trip at the end
        await getDataFromStrapi();
    
        }
    
       
    //Functions to validate data in the new trip form

function userValidate(comp) {
    //checks if there's a username

    let valid = true;

    if (comp.value.length == 0) {
        //failed validation
        valid = false;
    }

    //if it did not work, error message
    if (!valid) {
        document.getElementById("userError").innerText = "Please write your username";
        return false;
        //if it worked, empty error message
    } else {
        document.getElementById("userError").innerText = "";
        return true;
    }
}


//email validation - checks if it's a mail address 
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

//password validation - checks if it's at least 5 characters long
function passwordValidate(comp) {

    let valid = true;

    if (comp.value.length <= 4) {
        valid = false;
    }

    if (!valid) {
        document.getElementById("passwordError").innerText = "Please write a password of minimum 5 characters";
        return false;
    } else {
        document.getElementById("passwordError").innerText = "";
        return true;
    }
}

//validation of the login details - if one of them fails - the conclusion is false
function validateLogin() {
    let valid = true;

    if (!userValidate(document.getElementById("user"))) {
        valid = false;
    }

     if (!emailValidate(document.getElementById("email"))) {
        valid = false;
    }

    if (!passwordValidate(document.getElementById("password"))) {
        valid = false;
    }

    return valid;
}

//validation of the trip name - there should be a value and the name should not only have numbers in it
function tripNameValidate(comp) {

    let valid = true;

    if (comp.value.length == 0) {
        valid = false;
        document.getElementById("tripNameError").innerText = "Please give a name to your trip";
    }

    if ( !isNaN( comp.value ) && comp.value.length != 0) {
        valid = false;
        document.getElementById("tripNameError").innerText = "The name cannot contain numbers";
    }

    if (valid) {
        document.getElementById("tripNameError").innerText = "";
    }

    return valid;
}

//validation of the trip description - there should be a value in the field
function tripDescriptionValidate(comp) {
    

    let valid = true;

    if (comp.value.length == 0) {
        valid = false;
        document.getElementById("tripDescriptionError").innerText = "Please describe your trip";
    }

  
    if (valid) {
        document.getElementById("tripDescriptionError").innerText = "";
    }

    return valid;
}

//validation of the trip dates - checking if there is a date with form name and input field name
function tripLeavingDatesValidate(comp) {
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

function tripArrivingDatesValidate(comp) {
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

//validation of the number of seats - checking if there is number of seats with the form name and the input field name
function tripSeatsValidate(comp) {
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

//validation of the leaving destination - checking if there is a value
function tripLeavingDestinationValidate(comp) {

    let valid = true;

    if (comp.value.length == 0) {
        valid = false;
        document.getElementById("tripLeavingDestinationError").innerText = "Please tell fellow travelers where you will be leaving";
    }

  
    if (valid) {
        document.getElementById("tripLeavingDestinationError").innerText = "";
    }

    return valid;
}


//validation of the arriving destination - checking if there is a value
function tripArrivingDestinationValidate(comp) {

    let valid = true;

    if (comp.value.length == 0) {
        valid = false;
        document.getElementById("tripArrivingDestinationError").innerText = "Please tell fellow travelers where you will be arriving";
    }

  
    if (valid) {
        document.getElementById("tripArrivingDestinationError").innerText = "";
    }

    return valid;
}
//function to check if any validation function of the trip form did not work - if so the function validate trips results into false and the postTrip function stops
function validateTrips() {
    let valid = true;

    //Validate TripName
    if ( !tripNameValidate(document.getElementById("name")) ) {
        valid = false;
    }

    //Validate TripDescription
    if ( !tripDescriptionValidate(document.getElementById("description")) ) {
        valid = false;
    }

    //Validate TripLeavingDates
    if ( !tripLeavingDatesValidate(document.getElementById("tripDates-leaving")) ) {
        valid = false;
    }

    //Validate TripArrivingDates
    if ( !tripArrivingDatesValidate(document.getElementById("tripDates-leaving")) ) {
        valid = false;
    }

    //Validate TripSeats
    if ( !tripSeatsValidate(document.getElementById("tripDates-leaving")) ) {
        valid = false;
    }
     //Validate TripLeavingDestination
     if ( !tripLeavingDestinationValidate(document.getElementById("leavingDestination")) ) {
        valid = false;
    }

      //Validate TripArrivingDestination
      if ( !tripArrivingDestinationValidate(document.getElementById("arrivingDestination")) ) {
        valid = false;
    }

    return valid;
}

   