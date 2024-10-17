"use strict";


class ZahlenPaar {

    /**
     * Lottozahl zusammen mit Zufallszahl erzeugen.
     *
     * @param {*} zahl Lottozahl zwischen 1 und 49
     */
    constructor( zahl ) {

        this._zahl        = zahl;
        this._zufallszahl = Math.random();
    }

    get zahl() { return this._zahl; }

    get zufallszahl() { return this._zufallszahl; }
}


/** <input>-Element für Eingabe Anzahl der zu erzeugenden Lottozahlen.  */
let inputAnzahl = null;

let divErgebnis = null;


/**
 * Diese Funktion wird aufgerufen, wenn das Dokument inkl. aller
 * Ressourcen (z.B. Bilder oder Stylesheets) geladen wurde.
 */
window.addEventListener("load", function () {

    inputAnzahl = document.getElementById( "inputAnzahl" );
    if ( !inputAnzahl ) {

        console.error( "Konnte das Eingabefeld für die Anzahl nicht finden!" );
    }

    let losButton = document.getElementById( "buttonLos" );
    if ( losButton ) {

        losButton.addEventListener( "click", onLosButton );

    } else {

        console.error( "Button 'Los' nicht gefunden!" );
    }

    divErgebnis = document.getElementById( "divErgebnis" );
    if ( !divErgebnis ) {

        console.error( "Konnte das 'div'-Element für die Ergebnisanzeige nicht finden!" );
    }

    console.log( "Initialisierung abgeschlossen." );
});


/**
 * Event-Handler für den Klick auf den "Los"-Button zur Erzeugung der Lottozahlen.
 */
function onLosButton() {

    const anzahl = inputAnzahl.value;

    for (let i = 1; i <= anzahl; i++) {

        const ergebnisArray = lottoZahlenErzeugen();
        console.log( `Ergebnis: ${ergebnisArray}` );
    }
}


/**
 * Funktion gibt einen Array mit einem zufälligen Tipp für das Lotto 6 aus 49 zurück.
 * Die Zahlen sind aufsteigend sortiert.
 */
function lottoZahlenErzeugen() {

    const zahlenPaarArray = [];

    for ( let i = 1; i <= 49; i++ ) {

        let zahlenPaar = new ZahlenPaar( i );
        zahlenPaarArray.push( zahlenPaar );
    }

    // Elemente in zahlenPaarArray nach Zufallszahl sortieren
    zahlenPaarArray.sort( (a, b) => a.zufallszahl - b.zufallszahl );

    // erste 6 Elemente holen
    const ergebnisArray = [];
    for ( let i = 0; i < 6; i++ ) {

        ergebnisArray.push( zahlenPaarArray[i].zahl );
    }

    ergebnisArray.sort( (a, b) => a - b );

    return ergebnisArray;
}