"use strict";

/**
 * Ein Objekt dieser Klasse repräsentiert ein Zahlenpaar, bestehend aus einer Lottozahl
 * und einer Zufallszahl. Die Zufallszahl wird bei der Erzeugung des Objekts generiert.
 * Die Zahlenpaare werden nach der Zufallszahl sortiert werden.
 */
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

/** Button, um die bereits erzeugten Lottozahlen zu löschen. */
let buttonLoeschen = null;

/* <div>-Element, zu dem <input>-Elemente mit den Lottozahlen hinzugefügt werden. */
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

    buttonLoeschen = document.getElementById( "buttonLoeschen" );
    if ( buttonLoeschen ) {

        buttonLoeschen.addEventListener( "click", onLoeschenButton );

    } else {

        console.error( "Button 'Löschen' nicht gefunden!" );
    }

    divErgebnis = document.getElementById( "divErgebnis" );
    if ( !divErgebnis ) {

        console.error( "Konnte das 'div'-Element für die Ergebnisanzeige nicht finden!" );
    }

    console.log( "Initialisierung abgeschlossen." );
});


/**
 * Event-Handler für den Klick auf den "Löschen"-Button zur Erzeugung der Lottozahlen.
 */
function onLoeschenButton() {

    // remove all child nodes of divErgebnis
    divErgebnis.innerHTML = "";

    buttonLoeschen.classList.add( "d-none" );
}


/**
 * Event-Handler für den Klick auf den "Los"-Button zur Erzeugung der Lottozahlen.
 *
 * Die Lottozahlen werden in Readonly-<input>-Element dargestellt, weil man bei Copy&Paste
 * dann nicht aus Versehen über den Rand hinaus kopiert.
 */
function onLosButton() {

    const anzahl = inputAnzahl.value;

    for (let i = 1; i <= anzahl; i++) {

        const ergebnisString = lottoZahlenErzeugen();

        const inputElement = document.createElement( "input" );

        inputElement.value    = " " + ergebnisString;
        inputElement.readOnly = true;
        inputElement.disabled = true;
        inputElement.type     = "text";

        inputElement.classList.add( "form-control" );
        inputElement.classList.add( "mb-2"         );
        inputElement.classList.add( "col-md-3"     );

        divErgebnis.appendChild( inputElement );
    }

    buttonLoeschen.classList.remove( "d-none" );
}


/**
 * Funktion gibt einen String mit einem zufälligen Tipp für das Lotto 6 aus 49 zurück.
 * Die Zahlen sind aufsteigend sortiert.
 *
 * @returns {string} String mit 6 Zahlen, getrennt durch Kommas.
 *                   Beispiel: "3, 7, 12, 19, 23, 49"
 */
function lottoZahlenErzeugen() {

    const zahlenPaarArray = [];

    for ( let i = 1; i <= 49; i++ ) {

        let zahlenPaar = new ZahlenPaar( i );
        zahlenPaarArray.push( zahlenPaar );
    }

    // Elemente in zahlenPaarArray nach Zufallszahl sortieren
    zahlenPaarArray.sort( (a, b) => a.zufallszahl - b.zufallszahl );

    // erste 6 Zahlen holen
    const ergebnisArray = [];
    for ( let i = 0; i < 6; i++ ) {

        ergebnisArray.push( zahlenPaarArray[i].zahl );
    }

    ergebnisArray.sort( (a, b) => a - b );

    const ergebnisString = ergebnisArray.join( ", " );
    return ergebnisString;
}
