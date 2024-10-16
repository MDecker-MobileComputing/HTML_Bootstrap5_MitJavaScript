"use strict";

let selectStadt = null;

let buttonAntwortPruefen = null;

let modalErgebnis          = null;
let modalErgebnisTitel     = null;
let modalErgebnisNachricht = null;


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


    // Bootstrap bietet eine eigene Klasse, mit der ein Modal anhand der ID erholt werden kann
    modalErgebnis = new bootstrap.Modal('#modalErgebnis', {} );
    if ( !modalErgebnis ) {

        console.error( "Konnte das Modal-Element für das Ergebnis nicht finden!" );
    }

    modalErgebnisTitel = document.getElementById( "modalErgebnisTitel" );
    if ( !modalErgebnisTitel ) {

        console.error( "Konnte das Titel-Element für das Ergebnis-Modal nicht finden!" );
    }

    modalErgebnisNachricht = document.getElementById( "modalErgebnisNachricht" );
    if ( !modalErgebnisNachricht ) {

        console.error( "Konnte das Nachrichten-Element für das Ergebnis-Modal nicht finden!" );
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

            modalErgebnisTitel.innerText     = "Fehler";
            modalErgebnisNachricht.innerText = "Bitte wählen Sie eine Stadt aus.";
            break;

        case "hamburg":

            modalErgebnisTitel.innerText     = "Richtig";
            modalErgebnisNachricht.innerText = "Hamburg liegt tatsächlich nördlicher als Amsterdam und London.";
            break;

        default:
            modalErgebnisTitel.innerText     = "Falsch";
            modalErgebnisNachricht.innerText = "Denken Sie nochmal nach!";
            selectStadt.value = "keine";
    }

    modalErgebnis.show();
}
