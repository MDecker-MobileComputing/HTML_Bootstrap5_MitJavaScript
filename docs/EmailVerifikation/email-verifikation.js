"use strict";


let inputLokalerTeil    = null;
let inputDomain         = null;
let inputTopLevelDomain = null;


/**
 * Diese Funktion wird aufgerufen, wenn das Dokument inkl. aller
 * Ressourcen (z.B. Bilder oder Stylesheets) geladen wurde.
 */
window.addEventListener("load", function () {

    let buttonPruefen = document.getElementById( "buttonPruefen" );
    if ( buttonPruefen ) {

        buttonPruefen.addEventListener( "click", onPruefenButton );

    } else {

        console.error( "Button 'Überprüfen' nicht gefunden!" );
    }

    let buttonLoeschen = document.getElementById( "buttonLoeschen" );
    if ( buttonLoeschen ) {

        buttonLoeschen.addEventListener( "click", onLoeschenButton );

    } else {

        console.error( "Button 'Zurücksetzen' nicht gefunden!" );
    }

    inputLokalerTeil = document.getElementById( "inputLokalerTeil" );
    if ( !inputLokalerTeil ) {

        console.error( "Eingabefeld für lokalen Teil der Email-Adresse nicht gefunden!" );
    }

    inputDomain = document.getElementById( "inputDomain" );
    if ( !inputDomain ) {

        console.error( "Eingabefeld für Domain-Teil der Email-Adresse nicht gefunden!" );
    }

    inputTopLevelDomain = document.getElementById( "inputTopLevelDomain" );
    if ( !inputTopLevelDomain ) {

        console.error( "Eingabefeld für Top-Level-Domain-Teil der Email-Adresse nicht gefunden!" );
    }


    console.log( "Initialisierung abgeschlossen." );
});



/**
 * Event-Handler für den Klick auf den Button "Überprüfen".
 */
function onPruefenButton() {

    console.log( "Email-Adresse wird überprüft..." );
}


/**
 * Event-Handler für den Klick auf den Button "Zurücksetzen".
 */
function onLoeschenButton() {

    console.log( "Eingabefelder werden zurückgesetzt ..." );

    inputLokalerTeil.value    = "";
    inputDomain.value         = "";
    inputTopLevelDomain.value = "";    
}

