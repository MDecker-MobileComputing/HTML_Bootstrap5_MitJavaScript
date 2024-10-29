"use strict";


/** Referenz auf <canvas>-Element. */
let zeichenflaeche = null;

/** Referenz auf grafischen Kontext für Zeichnen in <canvas>-Element. */
let zeichenKontext = null;

let zeichenflaecheBreite = -1;
let zeichenflaecheHoehe  = -1;

/** Referenz auf <input>-Element für Schalter "Füllen". */
let schalterFuellen = null;


/**
 * Diese Funktion wird aufgerufen, wenn das Dokument inkl. aller
 * Ressourcen (z.B. Bilder oder Stylesheets) geladen wurde.
 *
 * Es werden Referenzen auf die benötigten DOM-Elemente geholt und
 * die Event-Handler-Funktionen registriert.
 */
window.addEventListener( "load", function() {

    zeichenflaeche = document.getElementById( "zeichenflaeche" );
    if ( !zeichenflaeche ) {

        console.error( "Canvas-Element nicht gefunden." );

    } else {

        zeichenKontext = zeichenflaeche.getContext( "2d" );
        if ( !zeichenKontext ) {

            console.error( "2D-Zeichenkontext konnte nicht abgerufen werden." );
        }

        canvasGroesseSetzen();
    }


    schalterFuellen = document.getElementById( "schalterFuellen" );
    if ( !schalterFuellen ) {

        console.error( "Schalter 'Füllen' nicht gefunden." );
    }

    registriereEventHandlerFuerForm( "diagonalen", zeichneDiagonalen  );
    registriereEventHandlerFuerForm( "dreieck"   , zeichneDreieck     );
    registriereEventHandlerFuerForm( "rechteck"  , zeichneRechteck    );
    registriereEventHandlerFuerForm( "kreis"     , zeichneKreis       );
    registriereEventHandlerFuerForm( "ellipse"   , zeichneEllipse     );
    registriereEventHandlerFuerForm( "bezier"    , zeichneBezierkurve );

    console.log( "Initialisierung abgeschlossen." );
});


/**
 * Event-Handler-Funktion für Event "resize"; wird aufgerufen,
 * wenn die Größe des Viewports geändert wird.
 */
window.addEventListener( "resize", function() {

    canvasGroesseSetzen();
});


/**
 * Größe von <canvas>-Element programmatisch in Abhängigkeit aktueller
 * Viewport-Größe setzen, damit keine unscharfen Linien entstehen.
 *
 * siehe auch: https://stackoverflow.com/a/61902385/1364368
 *
 * Nachteil der Lösung: bei Resize verschwinden die gezeichneten Elemente wieder.
 */
function canvasGroesseSetzen() {

    zeichenflaecheBreite =  80 * window.innerWidth  / 100;
    zeichenflaecheHoehe  =  50 * window.innerHeight / 100 || 766; // 766: Fallback-Wert

    zeichenflaeche.width  = zeichenflaecheBreite;
    zeichenflaeche.height = zeichenflaecheHoehe;
    zeichenflaeche.style.width  = zeichenflaecheBreite;
    zeichenflaeche.style.height = zeichenflaecheHoehe;

    console.log( "Canvas-Größe wurde neu gesetzt." );
}


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
 * Zeichenfläche löschen; sollte zu Beginn von jeder
 * zeichneXXX()-Funktion aufgerufen werden.
 */
function zeichenflaecheLoeschen() {

    zeichenKontext.clearRect( 0, 0,
                              zeichenflaecheBreite,
                              zeichenflaecheHoehe );
}


/**
 * Funktion um gezeichnete Form zu füllen, aber nur,
 * wenn dies mit dem Schalter vom Nutzer aktiviert ist.
 * Diese Funktion darf nur am Ende von zeichneXXX()-Funktionen
 * aufgerufen werden, die eine Form zeichnen, die eine
 * geschlossene Fläche hat.
 */
function beiBedarfFuellen() {

    if ( schalterFuellen.checked ) {

        zeichenKontext.fillStyle = "orange";
        zeichenKontext.fill();
    }
}


/**
 * Funktion um Diagonalen auf Canvas einzuzeichnen.
 */
function zeichneDiagonalen() {

    zeichenflaecheLoeschen();

    // Diagonale 1: von links oben nach rechts unten
    zeichenKontext.strokeStyle = "red";
    zeichenKontext.beginPath();
    zeichenKontext.moveTo( 0, 0 );
    zeichenKontext.lineTo( zeichenflaecheBreite, zeichenflaecheHoehe );
    zeichenKontext.stroke();


    // Diagonale 2: von links unten nach rechts oben
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

    zeichenKontext.strokeStyle = "black";

    zeichenKontext.beginPath();
    zeichenKontext.moveTo( ax, ay );
    zeichenKontext.lineTo( bx, by );
    zeichenKontext.lineTo( cx, cy );
    zeichenKontext.closePath();

    zeichenKontext.stroke(); // Rand zeichnen

    beiBedarfFuellen();
}


/**
 * Funktion um Rechteck auf Canvas zu zeichnen.
 */
function zeichneRechteck() {

    zeichenflaecheLoeschen();

    const abstandRand = 10;

    const breite = zeichenflaecheBreite - 2*abstandRand;
    const hoehe  = zeichenflaecheHoehe  - 2*abstandRand;

    zeichenKontext.strokeStyle = "red";

    // Rechteck zeichnen
    zeichenKontext.beginPath();
    zeichenKontext.rect( abstandRand,  // x
                         abstandRand,  // y
                         breite, hoehe );
    zeichenKontext.stroke();

    beiBedarfFuellen();
}


/**
 * Funktion um Kreis auf Canvas zu zeichnen.
 */
function zeichneKreis() {

    zeichenflaecheLoeschen();

    const mittelpunktX = zeichenflaecheBreite / 2;
    const mittelpunktY = zeichenflaecheHoehe  / 2;

    const radius = Math.min( zeichenflaecheBreite, zeichenflaecheHoehe ) * 0.4;

    zeichenKontext.strokeStyle = "green";

    zeichenKontext.beginPath();
    zeichenKontext.arc( mittelpunktX, mittelpunktY,
                        radius,
                        0,          // Startwinkel
                        2 * Math.PI // Endwinkel
                      );
    zeichenKontext.stroke();

    beiBedarfFuellen();
}


/**
 * Funktion um Ellpise auf Canvas zu zeichnen.
 */
function zeichneEllipse() {

    zeichenflaecheLoeschen();

    const mittelpunktX = zeichenflaecheBreite / 2;
    const mittelpunktY = zeichenflaecheHoehe  / 2;

    const radiusHorizontal = zeichenflaecheBreite * 0.5 * 0.9;
    const radiusVertikal   = zeichenflaecheHoehe  * 0.5 * 0.4;

    zeichenKontext.strokeStyle = "green";

    zeichenKontext.beginPath();
    zeichenKontext.ellipse( mittelpunktX    , mittelpunktY,
                            radiusHorizontal, radiusVertikal,
                            0,          // Rotation
                            0,          // Startwinkel
                            2 * Math.PI // Endwinkel
                          );
    zeichenKontext.stroke();

    beiBedarfFuellen();
}


/**
 * Funktion um Bezierkurve auf Canvas zu zeichnen.
 */
function zeichneBezierkurve() {

    zeichenflaecheLoeschen();

    const startpunktX = 0;
    const startpunktY = 0;
    const endpunktX   = zeichenflaecheBreite;
    const endpunktY   = zeichenflaecheHoehe;

    // Kontrollpunkt 1
    const kp1x = zeichenflaecheBreite * 0.2;
    const kp1y = zeichenflaecheHoehe  * 0.8;

    // Kontrollpunkt 2
    const kp2x = zeichenflaecheBreite * 0.8;
    const kp2y = zeichenflaecheHoehe  * 0.2;

    zeichenKontext.strokeStyle = "red";

    zeichenKontext.beginPath();
    zeichenKontext.moveTo( startpunktX, startpunktY );
    zeichenKontext.bezierCurveTo( kp1x, kp1y, kp2x, kp2y, endpunktX, endpunktY );
    zeichenKontext.stroke();
}
