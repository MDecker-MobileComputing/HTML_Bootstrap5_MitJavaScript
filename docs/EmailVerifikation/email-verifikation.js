"use strict";


let inputLokalerTeil    = null;
let inputDomain         = null;
let inputTopLevelDomain = null;

let alertErfolg = null;


/**
 * Diese Funktion wird aufgerufen, wenn das Dokument inkl. aller
 * Ressourcen (z.B. Bilder oder Stylesheets) geladen wurde.
 */
window.addEventListener("load", function () {

    let buttonPruefen = document.getElementById( "buttonPruefen" );
    if ( buttonPruefen ) {

        buttonPruefen.addEventListener( "click", onPruefenButton );

    } else {

        console.error( "Button 'Überprüfen' nicht gefunden!" );
    }

    let buttonLoeschen = document.getElementById( "buttonLoeschen" );
    if ( buttonLoeschen ) {

        buttonLoeschen.addEventListener( "click", onLoeschenButton );

    } else {

        console.error( "Button 'Zurücksetzen' nicht gefunden!" );
    }

    inputLokalerTeil = document.getElementById( "inputLokalerTeil" );
    if ( !inputLokalerTeil ) {

        console.error( "Eingabefeld für lokalen Teil der Email-Adresse nicht gefunden!" );
    }

    inputDomain = document.getElementById( "inputDomain" );
    if ( !inputDomain ) {

        console.error( "Eingabefeld für Domain-Teil der Email-Adresse nicht gefunden!" );
    }

    inputTopLevelDomain = document.getElementById( "inputTopLevelDomain" );
    if ( !inputTopLevelDomain ) {

        console.error( "Eingabefeld für Top-Level-Domain-Teil der Email-Adresse nicht gefunden!" );
    }

    alertErfolg = document.getElementById( "alertErfolg" );
    if ( !alertErfolg ) {

        console.error( "Alert für Erfolgsfall nicht gefunden!" );
    }

    console.log( "Initialisierung abgeschlossen." );
});



/**
 * Event-Handler für den Klick auf den Button "Überprüfen".
 */
function onPruefenButton() {

    validInvalidZuruecksetzen();

    const valid1 = checkLokalerTeil();
    const valid2 = checkDomainTeil();
    const valid3 = checkTopLevelDomain();

    const validGesamt = valid1 && valid2 && valid3;
    if ( validGesamt ) {

        alertErfolg.classList.remove( "d-none" );
    }
}


/**
 * Lokalen Teil (Teil 1) der Email-Adresse überprüfen.
 * 
 * @returns {boolean} true, wenn der lokale Teil gültig ist, sonst false.
 */
function checkLokalerTeil() {

    const regexLokalerTeil = /^[a-z0-9.]{1,64}$/;

    const lokalerTeil = inputLokalerTeil.value.toLowerCase();
    if ( regexLokalerTeil.test( lokalerTeil ) ) {

        inputLokalerTeil.classList.add( "is-valid" );
        return true;

    } else {

        inputLokalerTeil.classList.add( "is-invalid" );
        return false;
    }        
}


/**
 * Domain-Teil (Teil 2) der Email-Adresse überprüfen.
 * 
 * @return {boolean} true, wenn der Domain-Teil gültig ist, sonst false.
 */
function checkDomainTeil() {

    const regexDomain = /^[a-z][a-z0-9-]{0,61}[a-z0-9]$/;

    const domain = inputDomain.value.toLowerCase();
    if ( regexDomain.test( domain ) ) {

        inputDomain.classList.add( "is-valid" );
        return true;

    } else {

        inputDomain.classList.add( "is-invalid" );
        return false;
    }
}


/**
 * Top-Level-Domain (Teil 3) überprüfen.
 * 
 * @return {boolean} true, wenn die Top-Level-Domain gültig ist, sonst false.
 */
function checkTopLevelDomain() {

    // Max-Länge nach: https://stackoverflow.com/questions/9238640/
    const regexTopLevelDomain = /^[a-z]{2,63}$/;

    const topLevelDomain = inputTopLevelDomain.value.toLowerCase();
    if ( regexTopLevelDomain.test( topLevelDomain ) ) {

        inputTopLevelDomain.classList.add( "is-valid" );
        return true;

    } else {

        inputTopLevelDomain.classList.add( "is-invalid" );
        return false;
    }
}


/**
 * Event-Handler für den Klick auf den Button "Zurücksetzen".
 */
function onLoeschenButton() {

    inputLokalerTeil.value    = "";
    inputDomain.value         = "";
    inputTopLevelDomain.value = "";    

    alertErfolg.classList.add( "d-none" );

    validInvalidZuruecksetzen();
}


/**
 * CSS-Klasse .is-valid und .is-invalid von den Eingabefeldern entfernen.
 */
function validInvalidZuruecksetzen() {

    inputLokalerTeil.classList.remove(    "is-valid", "is-invalid" );
    inputDomain.classList.remove(         "is-valid", "is-invalid" );
    inputTopLevelDomain.classList.remove( "is-valid", "is-invalid" );
}