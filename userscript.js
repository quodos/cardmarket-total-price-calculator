// ==UserScript==
// @name         MKM wants list price calculator
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Calculates and prints the total value of a want list in cardmarket.com.
// @author       Thomas Wilhelm
// @include      https://www.cardmarket.com/en/Magic/MainPage/showWants*
// @include      https://www.cardmarket.com/de/Magic/MainPage/showWants*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const rows = document.querySelectorAll('table.MKMTable.wantsTable tbody tr');
    // Ingore cards matching this regex
    const ignore = /^(((Island)$|(Island \(Ver))|((Insel)$|(Insel \(Ver))|((Mountain)$|(Mountain \(Ver))|((Gebirge)$|(Gebirge \(Ver))|((Forest)$|(Forest \(Ver))|((Wald)$|(Wald \(Ver))|((Plains)$|(Plains \(Ver))|((Ebene)$|(Ebene \(Ver))|((Swamp)$|(Swamp \(Ver))|((Sumpf)$|(Sumpf \(Ver)))/g;
    let totalPrice = 0.0;
    let totalPriceWithoutBasics = 0.0;

    Array.prototype.forEach.call(rows, function(el, i){
        const cells = el.children;
        const value = parseFloat(cells[12].querySelector('div').textContent.replace(',', '.'));
        totalPrice += value;

        const cardName = cells[2].querySelector('a').textContent;
        if (ignore.test(cardName) === false) {
            totalPriceWithoutBasics += value;
        }
    });

    const footer = document.querySelector('table.MKMTable.wantsTable tfoot tr td');
    footer.style.textAlign = 'right';
    if (totalPrice === totalPriceWithoutBasics) {
        footer.innerHTML = `Gesamtpreis: <strong>&euro; ${totalPrice.toFixed(2)}</strong>`;
    } else {
        footer.innerHTML = `Gesamtpreis: <strong>&euro; ${totalPrice.toFixed(2)}</strong> / Ohne Standardländer: <strong>&euro; ${totalPriceWithoutBasics.toFixed(2)}</strong>`;
    }

    console.log(totalPrice, totalPriceWithoutBasics);
})();
