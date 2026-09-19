
"use strict";

let inputFirstName = null;
let inputLastName  = null;

let buttonGreet = null;
let buttonReset = null;


/**
 * This function is called when the document and all its resources
 * (e.g. images or stylesheets) have finished loading.
 *
 * References to the required DOM elements are retrieved and the
 * event handler functions for both buttons are registered.
 */
window.addEventListener( "load", function () {

    // Get references to the first-name and last-name inputs.
    inputFirstName = document.getElementById( "inputFirstName" );
    inputLastName  = document.getElementById( "inputLastName" );

    buttonGreet = document.getElementById( "buttonGreet" );
    buttonReset = document.getElementById( "buttonReset" );

    buttonGreet.addEventListener( "click", onButtonGreet );
    buttonReset.addEventListener( "click", onButtonReset );

    inputFirstName.addEventListener( "keydown", greetOnEnter );
    inputLastName.addEventListener(  "keydown", greetOnEnter );

    console.log( "Initialization complete." );
});


/**
 * Event handler for clicking the "Greet me!" button.
 */
function onButtonGreet() {

    const firstName = inputFirstName.value.trim();
    const lastName  = inputLastName.value.trim();

    if ( firstName === "" || lastName === "" ) {

        alert( "Please fill in both fields!" );
        return;
    }

    let fullName = firstName + " " + lastName;

    alert( "Hello " + fullName + "!" );
}


/**
 * Event handler for pressing a key in either name input.
 */
function greetOnEnter( event ) {

    if ( event.key === "Enter" ) {

        event.preventDefault();
        buttonGreet.click();
    }
}


/**
 * Event handler for clicking the "Reset" button.
 */
function onButtonReset() {

    inputFirstName.value = "";
    inputLastName.value  = "";
}
