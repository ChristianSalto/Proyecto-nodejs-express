'use strict';

const i18n = require('i18n');
const path = require('path');


module.exports = function () {
    i18n.configure({
        locales: ['en', 'es'],
        directory: path.join(__dirname, '..', 'locales'),
        defaultLocale: 'en',
        autoReload: true, // recargar ficheros de idiomas si cambian
        syncFiles: true, // crear literales en todos los locales
        cookie: 'main-language',
    });

    // por si usamos i18n en scripts:
    i18n.setLocale('en');
    return i18n;
}