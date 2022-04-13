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
    
                //if/else if statement for when geolocation and preferences are not submitted by the user
             //the new trip form is not ready for selecting preferences and geolocation when creating a trip so this output does not show preferences and geolocation


                
        //dates become a string without time so that they can get back into the input date field when updating a trip
        //data-id in the main div is used to get the object's id and use it in update and delete functions later
            let obj = element.attributes;
        
        
            if (!obj.geolocation.data && !obj.preferences.data[0] && !obj.preferences.data[1]) {
          
           
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


                <img src=${apiUrl}${obj.tripMap2.data[0].attributes.formats.large.url} class="trip-image"/> 

                <p class="sorry">Unfortunately, no preferences or geolocation have been submitted by the user.</p>
                </div>
                </div>
                <button id="edit">Edit</button>
            </div>
           

             
            `;
        }
    
            //here if there's geolocation and preferences linked to the trip - which is true for the data already ready in strapi database
    

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
   
   //Writes the output into the div tripsFetched
   document.getElementById("tripsFetched").innerHTML = output;

//when edit button is pressed, the form comes up with the trip data in it, thanks to the button's parent element
   document.getElementById("tripsFetched").addEventListener('click', (e) => {
        e.preventDefault();
        let editButtonIsPressed = e.target.id == 'edit';
    
        
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

        <div class="newtripform">
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
        <label for="seats">Seats:</label><br>
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
        <label for="tripDates-arriving">Arriving on:</label><br>
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

        <!-- The update map function is not ready -->
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
        //below: the info from the trip to update becomes the value of each input field in the form
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
    else {
        //if no, the login does not work and the user gets an error message


        document.getElementById("userError").innerText = "Unfortunately it did not work";

        return null;
    }
};

async function deleteTrip() {
    let deleteUrl="http://localhost:1337/api/trips";

    //gets token from getToken
    //if the token is not coming, the delete function stops
    let token = await getToken();
    if (!token) return;

    //gets id from the object through parent element dataset id which is in the main div of the displayed object
    let id = document.getElementById("delete").parentElement.dataset.id;

    //calls the API with the token and the id 
    
    await fetch(`${deleteUrl}/${id}`,
        {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token 
            }
        })

    //reload the page with the trips data and without the deleted trip
    .then(res => res.json())
            .then(() => location.reload())

}

async function updateTrip() {
    let updateUrl="http://localhost:1337/api/trips";

   //gets token from getToken
    //if the token is not coming, the delete function stops
    let token = await getToken();
    if (!token) return;

     //gets id from the object through parent element dataset id which is in the main div of the displayed object
    let id = document.getElementById("button").parentElement.dataset.id;
   

    //gets the data from the input fields
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

    //creates an object with the data - single types and components
    let TripsObject = {
       
        data : {
           
            TripDates: {
                
            
        },
        TripDestinations: {
        
          
        },
        
    }}

    //fills the data with the info from the input fields
  
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
   
   
    //calls the API with the token and the object's id to update
    await fetch(`${updateUrl}/${id}`,
    {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token 
        },
        body: JSON.stringify(TripsObject)
    })
//reloads the page with all the trips and the updated trip
    .then(res => res.json())
            .then(() => location.reload())
    
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

   