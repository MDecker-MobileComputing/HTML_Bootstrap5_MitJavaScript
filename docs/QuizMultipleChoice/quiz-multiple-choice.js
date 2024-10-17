"use strict";

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

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    console.log( "Initialisierung abgeschlossen." );
});


/**
 * Event-Handler-Funktion für das Klicken auf den Button "Antwort prüfen".
 */
function onButtonAntwortPruefen() {

    const antwortArray = [];

    const alleCheckboxen = document.querySelectorAll( ".form-check-input" );
    alleCheckboxen.forEach(function (checkbox) {

        if (checkbox.checked) {

            antwortArray.push( checkbox.id );
        }
    });
    console.log( "Ausgewählte Checkboxen:", antwortArray );

    if ( antwortArray.length === 0 ) {

        modalErgebnisTitel.innerText     = "Fehler";
        modalErgebnisNachricht.innerText = "Bitte wählen Sie mindestens eine Antwort aus.";

    } else if ( antwortArray.length === 2                 &&
                antwortArray.includes( "checkboxMerkur" ) &&
                antwortArray.includes( "checkboxVenus"  ) ) {

        modalErgebnisTitel.innerText     = "Richtige Antwort";
        modalErgebnisNachricht.innerText = "Herzlichen Glückwunsch!";

    } else {

        modalErgebnisTitel.innerText     = "Falsche Antwort";
        modalErgebnisNachricht.innerText = "Denken Sie nochmal nach!";

        // alle Checkboxen abwählen
        alleCheckboxen.forEach(function (checkbox) {

            checkbox.checked = false;
        });
    }

    modalErgebnis.show();
}
