import _extends from 'babel-runtime/helpers/extends';
/* eslint-disable no-unused-vars */

// Example configuration for config.*.js to enable pelias search and mapping functionality
var exampleConfig = {
  // ...
  search: {
    usePeliasStops: true, // enable to use pelias to search for stops
    mapPeliasModality: true, // enable to map pelias stops to otp
    peliasMapping: { // mapping values
      onstreetBus: 'BUS',
      onstreetTram: 'TRAM',
      airport: 'AIRPORT',
      railStation: 'RAIL',
      metroStation: 'SUBWAY',
      busStation: 'BUS',
      tramStation: 'TRAM',
      harbourPort: 'FERRY',
      ferryPort: 'FERRY',
      ferryStop: 'FERRY',
      liftStation: 'FUNICULAR'
    },
    peliasLayer: function peliasLayer() {
      return 'stop';
    }, // function to change layer
    peliasLocalization: function peliasLocalization(feature) {
      // localization example; showing locality (county) in label and name
      var localized = _extends({}, feature);
      localized.properties.label = feature.properties.name + ', ' + feature.properties.locality;
      localized.properties.name = feature.properties.name + ', ' + feature.properties.locality;
      return localized;
    }
  }
  // ...
};

export default (function (features, config) {
  if (!config.search.mapPeliasModality) {
    return features;
  }

  var mapping = config.search.peliasMapping;
  return features.map(function (feature) {
    var mappedFeature = _extends({}, feature);
    var categories = feature.properties.category;
    if (categories) {
      for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        if (category in mapping) {
          mappedFeature.properties.mode = mapping[category];

          if (config.search.peliasLayer) {
            mappedFeature.properties.layer = config.search.peliasLayer(category);
          }
          break;
        }
      }
    }
    if (config.search.peliasLocalization) {
      return config.search.peliasLocalization(mappedFeature);
    }
    return mappedFeature;
  });
});