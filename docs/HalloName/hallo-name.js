
"use strict";

let inputVorname  = null;
let inputNachname = null;

let buttonBegruessen    = null;
let buttonZuruecksetzen = null;


/**
 * Diese Funktion wird aufgerufen, wenn das Dokument inkl. aller
 * Ressourcen (z.B. Bilder oder Stylesheets) geladen wurde.
 *
 * Es werden Referenzen auf die benötigten DOM-Elemente geholt und
 * die Event-Handler-Funktionen für die beiden Buttons registriert.
 */
window.addEventListener("load", function () {

    // get reference to <input> with id=inputVorname
    inputVorname  = document.getElementById("inputVorname");
    inputNachname = document.getElementById("inputNachname");

    buttonBegruessen    = document.getElementById("buttonBegruessen");
    buttonZuruecksetzen = document.getElementById("buttonZuruecksetzen");

    buttonBegruessen.addEventListener(    "click", onButtonBegruessen    );
    buttonZuruecksetzen.addEventListener( "click", onButtonZuruecksetzen );

    console.log( "Initialisierung abgeschlossen." );
});


/**
 * Event-Handler-Funktion für das Klicken auf den Button "Begrüße mich!".
 */
function onButtonBegruessen() {

    const vorname  = inputVorname.value.trim();
    const nachname = inputNachname.value.trim();

    if (vorname === "" || nachname === "") {

        alert("Bitte beide Felder ausfüllen!");
        return;
    }

    let nameGesamt = vorname + " " + nachname;

    alert("Hallo " + nameGesamt + "!");
}


/**
 * Event-Handler-Funktion für das Klicken auf den Button "Zurücksetzen".
 */
function onButtonZuruecksetzen() {

    inputVorname.value  = "";
    inputNachname.value = "";
}
