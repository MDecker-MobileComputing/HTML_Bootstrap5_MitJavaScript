"use strict";

let buttonAntwortPruefen = null;

let selectStadt = null;


/**
 * Diese Funktion wird aufgerufen, wenn das Dokument inkl. aller
 * Ressourcen (z.B. Bilder oder Stylesheets) geladen wurde.
 */
window.addEventListener("load", function () {

    buttonAntwortPruefen = document.getElementById( "buttonAntwortPruefen" );
    if ( buttonAntwortPruefen ) { // != null && != undefined

        buttonAntwortPruefen.addEventListener( "click", onButtonAntwortPruefen );

    } else {

        console.error( "Konnte den Button 'Antwort prüfen' nicht finden!" );
    }


    // Selection-Element mit CSS-Selection statt ID holen
    selectStadt = document.querySelector( ".container-sm .form-select" );
    if ( !selectStadt ) {

        console.error( "Konnte das Select-Element für die Stadt nicht finden!" );
    }

    console.log( "Initialisierung abgeschlossen." );
});


/**
 * Event-Handler-Funktion für das Klicken auf den Button "Antwort prüfen".
 */
function onButtonAntwortPruefen() {

    const valueStadt = selectStadt.value;

    switch ( valueStadt ) {

        case "keine":
            alert( "Bitte eine Stadt auswählen." );
            break;

        case "hamburg":
            alert( "Richtig! Hamburg liegt nördlicher als Amsterdam und London." );
            break;

        default:
            alert( "Leider falsch. Bitte versuche es noch einmal." );
            selectStadt.value = "keine";
    }
}
