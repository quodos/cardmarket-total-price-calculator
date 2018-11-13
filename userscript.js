// ==UserScript==
// @name         MKM wants list price calculator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Calculates and prints the total value of a want list in cardmarket.com.
// @author       Thomas Wilhelm
// @include      https://www.cardmarket.com/en/Magic/MainPage/showWants*
// @include      https://www.cardmarket.com/de/Magic/MainPage/showWants*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const rows = document.querySelectorAll('table.MKMTable.wantsTable tbody tr');
    let totalPrice = 0.0;

    Array.prototype.forEach.call(rows, function(el, i){
        const cells = el.children;
        const value = parseFloat(cells[12].querySelector('div').textContent.replace(',', '.'));
        totalPrice += value;
    });

    const footer = document.querySelector('table.MKMTable.wantsTable tfoot tr td');
    footer.style.textAlign = 'right';
    footer.innerHTML = `Gesamtpreis: <strong>&euro; ${totalPrice.toFixed(2)}</strong>`;
    console.log(totalPrice);
})();
