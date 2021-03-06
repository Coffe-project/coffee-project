"use strict";
// creates div for each array entry
function renderCoffee(coffee) {
    var html = '<div class="coffee card">';
    // html += '<td>' + coffee.id + '</td>';
    html += '<div>';
    html += '<div class="card-header">' + coffee.name + '</div>';
    html += '<ul class="list-group list-group-flush"><li>' + capitalizeFirstLetter(coffee.roast) + '</li></ul>';
    html += '</div>';
    html += '</div>';
    html +='<br>';
    return html;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// takes values from renderCoffee function and creates them into strings
function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i <= coffees.length -1; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

// creates an array of selected inputs, and creates array based on those inputs
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    if (selectedRoast === "all"){
        holdingDiv.innerHTML = renderCoffees(coffees);
        return;
    }
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
    });
    holdingDiv.innerHTML = renderCoffees(filteredCoffees);
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var holdingDiv = document.querySelector('#holder');
var submitButton = document.querySelector('#submit');
var coffeeSubmit = document.querySelector('#newSubmit');
var roastSelection = document.querySelector('#roast-selection');
var newRoast = document.querySelector('#new-roast-selection');
var coffeeName = document.querySelector('#newCoffeeName');
var coffeeSearch = document.getElementById('coffeeSearch');
var textDump = "";
var i = coffees.length;

function coffeeAdd (){
    var coffee = {id: 0, name: 'Coffee Name', roast: 'light'};
    coffee.id = i + 1;
    coffee.name = coffeeName.value;
    coffee.roast = newRoast.value;
    coffees.push(coffee);
    holdingDiv.innerHTML = renderCoffees(coffees);

}

// logs key inputs into a single string called text dump, then compares textDump to each array object name
function coffeeFind(e){
    textDump += e.key.toLowerCase();
    // textDump += e.key;
    var filteredCoffees = [];
    console.log(e.key);
    coffees.forEach(function (coffee) {
        if(coffee.name.toLowerCase().startsWith(textDump)){
            filteredCoffees.push(coffee)
        }
        holdingDiv.innerHTML=renderCoffees(filteredCoffees);
    })

}
coffeeSearch.addEventListener("keypress", coffeeFind);
// when backspace it pressed, puts textDump into an array, pops last entry,
// and then joins back as a string
coffeeSearch.addEventListener('keyup', function (e) {
    if (e.key === 'Backspace'){
        textDump = textDump.split('');
        textDump.pop();
        textDump = textDump.join('');
        if (textDump === ''){
            holdingDiv.innerHTML = renderCoffees(coffees);
        }
    }
});


holdingDiv.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
coffeeSubmit.addEventListener('click', coffeeAdd);
