/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';

// import i18next from 'https://deno.land/x/i18next/index.js'
// or import i18next from 'https://raw.githubusercontent.com/i18next/i18next/master/src/index.js'
// or import i18next from 'https://cdn.jsdelivr.net/gh/i18next/i18next/src/index.js'
import { loadTranslations } from '@angular/localize';
import { isDevMode } from '@angular/core';

// All translation objects: must be json files for runtime-conditions! (XLF not supported)
// import * as en from "./locale/messages.json";
// import * as es from "./locale/messages.es.json";



// // Non-official translation loader to switch languages at runtime in development mode
// if(isDevMode()){
//     // console.warn(i18next)
//   let translations = {} as {translations:Record<string, string>};
//   let lang = localStorage.getItem("lang");
// //   if(lang === "en"){
// //     translations = en;
// //   } else if (lang === "es"){
// //     translations = es;
// //   };
//   console.warn("333")
//   translations = en;

//   // load translations at runtime
//   loadTranslations(translations["translations"]);
// }
/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes recent versions of Safari, Chrome (including
 * Opera), Edge on the desktop, and iOS and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 * because those flags need to be set before `zone.js` being loaded, and webpack
 * will put import in the top of bundle, so user need to create a separate file
 * in this directory (for example: zone-flags.ts), and put the following flags
 * into that file, and then add the following code before importing zone.js.
 * import './zone-flags';
 *
 * The flags allowed in zone-flags.ts are listed here.
 *
 * The following flags will work for all browsers.
 *
 * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
 * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
 * (window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
 *
 *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
 *  with the following flag, it will bypass `zone.js` patch for IE/Edge
 *
 *  (window as any).__Zone_enable_cross_context_check = true;
 *
 */

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js';  // Included with Angular CLI.


/***************************************************************************************************
 * APPLICATION IMPORTS
 */
