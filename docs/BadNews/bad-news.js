"use strict";

let divNachrichten    = null;
let checkboxNurInland = null;
let rangeAnzahl       = null;
let divAnzahl         = null;


/**
 * Diese Funktion wird aufgerufen, wenn das Dokument inkl. aller
 * Ressourcen (z.B. Bilder oder Stylesheets) geladen wurde.
 */
window.addEventListener("load", function () {

    let buttonLaden = document.getElementById( "buttonNewsHolen" );
    if ( buttonLaden ) {

        buttonLaden.addEventListener( "click", onButtonNachrichtenLaden );

    } else {

        console.error( "Button 'Nachrichten laden' nicht gefunden!" );
    }

    let buttonZuruecksetzen = document.getElementById( "buttonZuruecksetzen" );
    if ( buttonZuruecksetzen ) {

        buttonZuruecksetzen.addEventListener( "click", onButtonZuruecksetzen );

    } else {

        console.error( "Button 'Zurücksetzen' nicht gefunden!" );
    }

    divNachrichten = document.getElementById( "listGroupNachrichten" );
    if ( !divNachrichten ) {

        console.error( "Wurzelelement für Nachrichtenliste nicht gefunden!" );
    }

    checkboxNurInland = document.getElementById( "checkboxNurInland" );
    if ( !checkboxNurInland ) {

        console.error( "Checkbox für 'Nur Inland' nicht gefunden!" );
    }

    rangeAnzahl = document.getElementById( "rangeAnzahl" );
    if ( rangeAnzahl ) {

        rangeAnzahl.addEventListener( "input", onNeueAnzahl );

    } else {

        console.error( "Range-Element 'Anzahl' nicht gefunden!" );
    }

    divAnzahl = document.getElementById( "divAnzahl" );
    if ( !divAnzahl ) {

        console.error( "Element für Anzeige der Anzahl nicht gefunden!" );
    }

    console.log( "Initialisierung abgeschlossen." );
});


/**
 * Event-Handler-Funktion für Änderungen am Range-Element für die Anzahl der
 * Schlagzeilen.
 */
function onNeueAnzahl() {

    const anzahl = rangeAnzahl.value;
    divAnzahl.textContent = anzahl;
}


/**
 * Event-Handler für Button zum Zurücksetzen der Anwendung.
 */
function onButtonZuruecksetzen() {

    // Evtl. angezeigte Nachrichten löschen
    divNachrichten.innerHTML = "";

    // Eingabefelder zurücksetzen
    rangeAnzahl.value         = 5;
    onNeueAnzahl();

    checkboxNurInland.checked = false;
}


/**
 * Event-Handler für Button zum Laden von Nachrichten von Web-API.
 * Doku der Web-API: https://api.el-decker.de/badnews_doku.html
 */
async function onButtonNachrichtenLaden() {

    divNachrichten.innerHTML = "";

    const anzahl    = rangeAnzahl.value;
    const nurInland = checkboxNurInland.checked;
    const url       = `https://api.el-decker.de/badnews.php?anzahl=${anzahl}&nur_inland=${nurInland}`;

    console.log( "Nachrichten werden von Web-API geladen ..." );

    try {

        const antwort = await fetch( url );
        if (!antwort.ok) {

            throw new Error( "Fehler beim Laden der Nachrichten: " + antwort.status );
        }

        const antwortJSON = await antwort.json();
        nachrichtenAnzeigen( antwortJSON.items, nurInland );
    }
    catch (fehler) {

        console.error( "Fehler beim Laden der Nachrichten: " + fehler );
    }
}

/**
 * Diese Funktion zeigt die Nachrichten in der Liste an.
 */
function nachrichtenAnzeigen(schlagzeilenItems, nurInland) {

    for (let i = 0; i < schlagzeilenItems.length; i++) {

        const schlagzeileText = schlagzeilenItems[i].schlagzeile;
        const istInland       = schlagzeilenItems[i].inland;

        const divNachricht = document.createElement( "li" );
        divNachricht.classList.add( "list-group-item",
                                    "d-flex",
                                    "justify-content-between",
                                    "align-items-center"
                                  );
        divNachricht.textContent = schlagzeileText;

        if ( !nurInland ) {

            const badge = document.createElement( "span" );
            badge.classList.add( "badge", "ms-2" );
            if ( istInland ) {

                badge.classList.add( "bg-primary" ); // blau
                badge.textContent = "Inland";

            } else {

                badge.classList.add( "bg-success" ); // grün
                badge.textContent = "Welt";
            }

            divNachricht.appendChild( badge );
        }

        divNachrichten.appendChild( divNachricht );
    }

}