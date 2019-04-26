// ==UserScript==
// @name         cardmarket.com wants list price calculator
// @namespace    http://tampermonkey.net/
// @version      0.3.0
// @description  Calculates and prints the total value of a want list in cardmarket.com.
// @author       Thomas Wilhelm <https://thomaswilhelm.at>
// @include      https://www.cardmarket.com/en/Magic/MainPage/showWants*
// @include      https://www.cardmarket.com/de/Magic/MainPage/showWants*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const rows = document.querySelectorAll('table.MKMTable.wantsTable tbody tr');
    let totalPrice = 0.0;
    let totalPriceWithoutBasics = 0.0;

    if (rows.length) {
        Array.prototype.forEach.call(rows, function(el, i){
            const cells = el.children;
            let amount = parseInt(cells[10].textContent);
            if (!amount || amount === NaN) {
                amount = 1;
            }
            const value = parseFloat(cells[12].querySelector('div').textContent.replace(',', '.')) * amount;
            totalPrice += value;

            // Ingore cards matching this regex
            const basicLands = /^(island|insel|forest|wald|mountain|gebirge|plains|ebene|swamp|sumpf)(\s\(version\s[0-9]\))?$/gi;
            const cardName = cells[2].querySelector('a').textContent;
            if (basicLands.test(cardName) === false) {
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
    }
})();
