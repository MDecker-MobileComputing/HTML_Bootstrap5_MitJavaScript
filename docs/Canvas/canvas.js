"use strict";

/** Referenz auf <canvas>-Element */
let zeichenKontext = null;

let zeichenflaecheBreite = -1;
let zeichenflaecheHoehe  = -1;


/**
 * Diese Funktion wird aufgerufen, wenn das Dokument inkl. aller
 * Ressourcen (z.B. Bilder oder Stylesheets) geladen wurde.
 *
 * Es werden Referenzen auf die benötigten DOM-Elemente geholt und
 * die Event-Handler-Funktionen registriert.
 */
window.addEventListener( "load", function () {

    const zeichenflaeche = document.getElementById( "zeichenflaeche" );
    if ( !zeichenflaeche ) {

        console.error( "Canvas-Element nicht gefunden." );

    } else {

        zeichenflaecheBreite = zeichenflaeche.width;
        zeichenflaecheHoehe  = zeichenflaeche.height;

        zeichenKontext = zeichenflaeche.getContext( "2d" );
        if ( !zeichenKontext ) {

            console.error('2D-Zeichenkontext konnte nicht abgerufen werden.');
        }
    }

    registriereEventHandlerFuerForm( "diagonalen", zeichneDiagonalen );
    registriereEventHandlerFuerForm( "dreieck"   , zeichneDreieck    );
    registriereEventHandlerFuerForm( "rechteck"  , zeichneRechteck   );

    console.log( "Initialisierung abgeschlossen." );
});


/**
 * Event-Handler-Funktion für Event "click" setzen.
 *
 * @param {*} id ID des Elements, für das die Event-Handler-Funktion gesetzt werden soll
 *
 * @param {*} eventHandlerFunktion Event-Handler-Funktion
 */
function registriereEventHandlerFuerForm( id, eventHandlerFunktion ) {

    const element = document.getElementById( id )
    if ( element ) {

        element.addEventListener( "click",  eventHandlerFunktion );
        console.log( `Event-Handler für ID "${id}" registriert.` );

    } else {

        console.error( `Element mit ID "${id}" nicht gefunden.` );
    }
}


/**
 * Zeichenfläche löschen, sollte zu Beginn von jeder zeichneXXX()-Funktion
 * aufgerufen werden.
 */
function zeichenflaecheLoeschen() {

    zeichenKontext.clearRect( 0, 0,
                              zeichenflaecheBreite,
                              zeichenflaecheHoehe );
}


/**
 * Funktion um Diagonalen auf Canvas einzuzeichnen.
 */
function zeichneDiagonalen() {

    zeichenflaecheLoeschen();

    zeichenKontext.strokeStyle = "red";

    zeichenKontext.beginPath();
    zeichenKontext.moveTo( 0, 0 );
    zeichenKontext.lineTo( zeichenflaecheBreite, zeichenflaecheHoehe );
    zeichenKontext.stroke();


    zeichenKontext.strokeStyle = "blue";

    zeichenKontext.beginPath();
    zeichenKontext.moveTo( 0, zeichenflaecheHoehe );
    zeichenKontext.lineTo( zeichenflaecheBreite, 0 );
    zeichenKontext.stroke();
}


/**
 * Funktion um Dreieck auf Canvas einzuzeichnen.
 */
function zeichneDreieck() {

    zeichenflaecheLoeschen();

    const abstandRand = 5;

    // Punkt A: oben mitte
    const ax = zeichenflaecheBreite / 2;
    const ay = abstandRand;

    // Punkt B: links unten
    const bx = abstandRand;
    const by = zeichenflaecheHoehe - abstandRand;

    // Punkt C: rechts unten
    const cx = zeichenflaecheBreite - abstandRand;
    const cy = by;

    zeichenKontext.fillStyle   = "#ff00ff"; // violett
    zeichenKontext.strokeStyle = "black";

    zeichenKontext.beginPath();
    zeichenKontext.moveTo( ax, ay );
    zeichenKontext.lineTo( bx, by );
    zeichenKontext.lineTo( cx, cy );
    zeichenKontext.closePath();

    zeichenKontext.stroke(); // Rand zeichnen
    zeichenKontext.fill();   // Figur füllen
}


function zeichneRechteck() {

    zeichenflaecheLoeschen();

    const abstandRand = 5;

    const breite = zeichenflaecheBreite - 2*abstandRand;
    const hoehe  = zeichenflaecheHoehe  - 2*abstandRand;

    zeichenKontext.strokeStyle = "red";

    // Rechteck zeichnen
    zeichenKontext.beginPath();
    zeichenKontext.rect(
        abstandRand,  // x
        abstandRand,  // y
        breite,
        hoehe
    );
    zeichenKontext.stroke();
}
