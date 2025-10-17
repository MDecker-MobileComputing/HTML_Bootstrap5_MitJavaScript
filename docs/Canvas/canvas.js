"use strict";


/** Referenz auf <canvas>-Element. */
let zeichenflaeche = null;

/** Referenz auf grafischen Kontext für Zeichnen in <canvas>-Element. */
let zeichenKontext = null;

let zeichenflaecheBreite = -1;
let zeichenflaecheHoehe  = -1;

/** Referenz auf <input>-Element für Schalter "Füllen". */
let schalterFuellen = null;

/** Referenz auf mit Chart.js erzeugtes Diagramm */
let chartJsDiagramm = null;


/**
 * Optionen-Objekt für Chart.js-Diagramme.
 *
 * Die Optionen responsive=false und maintainAspectRatio=false verhindern,
 * dass das Diagramm die Größe des Canvas-Elements anpasst.
 */
const chartjsOptionen = {
                            responsive: false,
                            maintainAspectRatio: false,
                            scales: {
                                y: { beginAtZero: true }
                            }
                        };


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

    registriereEventHandlerFuerForm( "kuchen"    , zeichneChartJsKuchendiagramm );
    registriereEventHandlerFuerForm( "balken"    , zeichneChartJsBalkendiagramm );
    registriereEventHandlerFuerForm( "linien"    , zeichneChartJsLiniendiagramm );

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
 * Es werden sowohl die interne Größe des Elements als auch die
 * CSS-Größe (=Größe auf Bildschirm) auf dieselben Werte gesetzt.
 *
 * siehe auch: https://stackoverflow.com/a/61902385/1364368
 *
 * Nachteil der Lösung: bei Resize verschwinden die gezeichneten Elemente wieder.
 */
function canvasGroesseSetzen() {

    zeichenflaecheBreite =  80 * window.innerWidth  / 100;
    zeichenflaecheHoehe  =  50 * window.innerHeight / 100 || 766; // 766: Fallback-Wert für innerHeight===null

    zeichenflaeche.width        = zeichenflaecheBreite;
    zeichenflaeche.height       = zeichenflaecheHoehe;
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
 * geschlossene Fläche hat. in zeichneXXX()-Funktionen, die
 * diese Funktion aufrufen, sollte "black" als strokeStyle
 * (also Farbe für den Rand der Fläche) verwendet werden.
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

    zeichenKontext.strokeStyle = "black";

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

    const radius = 0.4 * Math.min( zeichenflaecheBreite,
                                   zeichenflaecheHoehe );

    zeichenKontext.strokeStyle = "black";

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

    zeichenKontext.strokeStyle = "black";

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
 * Funktion um Bezierkurve im Canvas-Element zu zeichnen.
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


/**
 * Funktion um mit Chart.js ein Kuchendiagramm im Canvas-Element zu zeichnen.
 */
function zeichneChartJsKuchendiagramm() {

    if ( chartJsDiagramm ) { chartJsDiagramm.destroy(); }

    const datenObjekt = {
                            labels: [ "Partei A", "Partei B", "Partei C", "Ungültig" ],
                            datasets: [
                                {
                                    label: "Anzahl Stimmen",
                                    data: [ 25, 40, 66, 10 ], // absolute Zahlen, keine Prozentwerte!
                                    borderWidth: 1
                                }
                            ]
                        };

    const chartObjekt = {
                            type   : "pie",
                            data   : datenObjekt,
                            options: chartjsOptionen
                        };

    chartJsDiagramm = new Chart( zeichenKontext, chartObjekt );
}


/**
 * Funktion um mit Chart.js ein Balkendiagramm im Canvas-Element zu zeichnen.
 */
function zeichneChartJsBalkendiagramm() {

    if ( chartJsDiagramm ) { chartJsDiagramm.destroy(); }

    const datenObjekt = {

        labels: ["Firma A", "Firma B", "Firma C", "Firma D" ],
        datasets: [
            {
                label: "Verkaufszahlen 2022",
                data: [ 20500, 10300, 5100, 16300 ],
                borderWidth: 1
            },
            {
                label: "Verkaufszahlen 2023",
                data: [ 19100, 12300, 4100, 17300 ],
                borderWidth: 1
            }
        ]
    };

    const chartObjekt = {
                            type   : "bar",
                            data   : datenObjekt,
                            options: chartjsOptionen
                        };

    chartJsDiagramm = new Chart( zeichenKontext, chartObjekt );
}


/**
 * Funktion um mit Chart.js ein Balkendiagramm im Canvas-Element zu zeichnen.
 */
function zeichneChartJsLiniendiagramm() {

    if ( chartJsDiagramm ) { chartJsDiagramm.destroy(); }

    const datenObjekt = {

        labels: [ "Januar", "Februar", "März", "April", "Mai", "Juni" ],
        datasets: [
            {
                label: "Land A",
                data: [ 10, 15, 22, 40, 51, 60 ],
                borderWidth: 1
              },
              {
                label: "Land B",
                data: [ 4, 15, 8, 55, 35, 32 ],
                borderWidth: 1
              }
        ]
    };

    const chartObjekt = {
        type   : "line",
        data   : datenObjekt,
        options: chartjsOptionen
    };

    chartJsDiagramm = new Chart( zeichenKontext, chartObjekt );
}
