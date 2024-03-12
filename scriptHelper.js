// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = documentgetElementById("missionTarget");
    missionTarget.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
                 `
 }
 
 function validateInput(testInput) {
        if (testInput === "") {
            return 'Empty';
        } else if (!isNaN(testInput)) {
            return 'Is a Number';
        } else {
            return 'Not a Number';
        }
 }
 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
        let pilotStatus = document.getElementById("pilotStatus");
        let copilotStatus = document.getElementById("copilotStatus");
        let faultyItems = document.getElementById("faultyItems");
        let fuelStatus = document.getElementById("fuelStatus");
        let launchStatus = document.getElementById("launchStatus");
        let cargoStatus = document.getElementById("cargoStatus");


        // validate that all fields are filled and pushing an alert if not.
        if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty' ) {
            alert ('All fields required. Please enter all required information.')
        }
        // checks to make sure pilot and copilot are strings and fuel and cargo are numbers
        else if (validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number') {
            alert ('Number entered in Pilot and Co-pilot fields. Please enter a name.')
        }  
        else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
            alert ('Invalid entry. Please enter a numeric value for Fuel and Cargo.')
        } 
        // Add Pilot and Copilot names if all fields are correctly filled
        else {
            pilotStatus.innerHTML = `Pilot: ${pilot.value}`;
            copilotStatus.innerHTML = `Co-pilot: ${copilot.value}`;
        }

        // Change faultyItems to visible, launch Status to red text, and to display "Shuttle not ready for launch" if fuel levels is too low (< 10000)
        if (Number(fuelLevel) < 10000) {
            faultyItems.style.visibility = 'visible';
            fuelStatus.innerHTML = 'Not enough fuel for journey.'
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = 'red';
        } 
        // if cargo mass > 10000 change list to visible with an updated cargo status that states there is too much mass for shuttle to launch and change launch Status to red
        else if (Number(cargoLevel) > 10000) {
            list.style.visibility = 'visible';
            cargoStatus.innerHTML = 'Too Much Mass in Cargo Area';
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = 'red';
        }
        // if shuttle is ready to launch then change launch Status to green and display "Shuttle is ready for launch"
        else if (Number(fuelLevel) > 10000 || Number(cargoLevel) < 10000) {
            list.style.visibility = 'visible';
            launchStatus.innerHTML = 'Shuttle is ready for launch';
            launchStatus.style.color = 'green';
        }   
 }
 
 async function myFetch() {
     let planetsReturned;
 
     planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()
        });
 
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
    let randPlanet = Math.floor(Math.random() * planets.length);
    return planets[randPlanet];
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;