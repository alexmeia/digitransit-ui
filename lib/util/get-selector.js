/* eslint-disable no-restricted-syntax, no-continue */

export default function getSelector(mode) {
  var selector = mode.toLowerCase();
  for (var index in document.styleSheets) {
    // Use hasOwnProperty from the {} to make sure styleSheets hasn't overridden it
    if ({}.hasOwnProperty.call(document.styleSheets, index)) {
      try {
        for (var index2 in document.styleSheets[index].cssRules) {
          if ({}.hasOwnProperty.call(document.styleSheets[index].cssRules, index2)) {
            var ref = document.styleSheets[index].cssRules[index2].selectorText;
            // A bug in minifier messes the selectors in production mode...
            if (ref && ref.split(',').map(function (s) {
              return s.trim();
            }).indexOf(selector) > -1) {
              return document.styleSheets[index].cssRules[index2];
            }
          }
        }
      } catch (err) {
        continue;
      }
    }
  }
  return false;
}