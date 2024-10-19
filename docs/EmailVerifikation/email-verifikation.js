"use strict";


/**
 * Diese Funktion wird aufgerufen, wenn das Dokument inkl. aller
 * Ressourcen (z.B. Bilder oder Stylesheets) geladen wurde.
 */
window.addEventListener("load", function () {

    let pruefenButton = document.getElementById( "pruefenButton" );
    if ( pruefenButton ) {

        pruefenButton.addEventListener( "click", onLosButton );

    } else {

        console.error( "Button 'Los' nicht gefunden!" );
    }

    console.log( "Initialisierung abgeschlossen." );
});



/**
 * Event-Handler für den Klick auf den Button "Email-Adresse überprüfen".
 */
function onLosButton() {

}

