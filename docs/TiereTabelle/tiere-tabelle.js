"use strict";


let tabelleTiere = null;

let tabellenZeilenPflanzenfresser = null;
let tabellenZeilenHaustiere       = null;


/**
 * Diese Funktion wird aufgerufen, wenn das Dokument inkl. aller
 * Ressourcen (z.B. Bilder oder Stylesheets) geladen wurde.
 */
window.addEventListener( "load", function () {

    const radioButtonsArray = document.querySelectorAll( "input[name='radioGruppe']" );
    radioButtonsArray.forEach( radioButton => {

        radioButton.addEventListener( "change", onRadioButtonAenderung );
    });

    tabelleTiere = document.querySelector( ".table" );
    if ( !tabelleTiere ) {

        console.error( "Konnte die Tabelle nicht finden!" );
    }

    tabellenZeilenPflanzenfresser = document.querySelectorAll( ".pflanzenfresser" );
    if ( tabellenZeilenPflanzenfresser ) {

        console.log( `Anzahl Pflanzenfresser: ${tabellenZeilenPflanzenfresser.length}` );

    } else {

        console.error( "Konnte die Tabellenzeilen mit Pflanzenfressern nicht finden!" );
    }


    tabellenZeilenHaustiere = document.querySelectorAll( ".haustier" );
    if ( tabellenZeilenHaustiere ) {

        console.log( `Anzahl Haustiere: ${tabellenZeilenHaustiere.length}` );

    } else {

        console.error( "Konnte die Tabellenzeilen mit Haustieren nicht finden!" );
    }


    console.log( "Initialisierung abgeschlossen." );
});


/**
 * Event-Handler-Funktion, die aufgerufen wird, wenn ein anderer RadioButton
 * ausgewählt wird.
 */
function onRadioButtonAenderung(event) {

    const valueGewaehlterRadioButton = event.target.value;

    console.log( "Ausgewählter RadioButton:", valueGewaehlterRadioButton );

    tabelleZuruecksetzen();

    switch ( valueGewaehlterRadioButton ) {

        case "pflanzenfresser":
            tabellenZeilenPflanzenfresser.forEach( zeile => {
                zeile.classList.add( "table-primary" );
            });
        break;

        case "haustiere":
            tabellenZeilenHaustiere.forEach( zeile => {
                zeile.classList.add( "table-info" );
            });
        break;

        case "zebra":
            tabelleTiere.classList.add( "table-striped" );
            break;

        default:
            console.log( `Interner Fehler: Unerwarteter Wert des Radio-Buttons: "${valueGewaehlterRadioButton}"` );
    }
}


/**
 * Tabula-Rasa-Funktion, die die Hervorhebung der Tabelle zurücksetzt.
 */
function tabelleZuruecksetzen() {

    tabelleTiere.classList.remove( "table-striped" );

    tabellenZeilenPflanzenfresser.forEach( zeile => {
        zeile.classList.remove( "table-primary" );
    });

    tabellenZeilenHaustiere.forEach( zeile => {
        zeile.classList.remove( "table-info" );
    });

}