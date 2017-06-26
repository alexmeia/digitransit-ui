import PropTypes from 'prop-types';
import React from 'react';
import CityBikeAvailability from './CityBikeAvailability';
import CityBikeUse from './CityBikeUse';
import ComponentUsageExample from './ComponentUsageExample';
import { station as exampleStation, lang as exampleLang } from './ExampleData';

var CityBikeContent = function CityBikeContent(_ref, _ref2) {
  var station = _ref.station,
      lang = _ref.lang;
  var config = _ref2.config;
  return React.createElement(
    'div',
    { className: 'city-bike-container' },
    React.createElement(CityBikeAvailability, {
      bikesAvailable: station.bikesAvailable,
      totalSpaces: station.bikesAvailable + station.spacesAvailable,
      fewAvailableCount: config.cityBike.fewAvailableCount
    }),
    React.createElement(CityBikeUse, { lang: lang })
  );
};

CityBikeContent.displayName = 'CityBikeContent';

CityBikeContent.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Renders content of a citybike card'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(CityBikeContent, { station: exampleStation, lang: exampleLang })
    )
  );
};

CityBikeContent.propTypes = {
  station: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired
};

CityBikeContent.contextTypes = {
  config: PropTypes.object.isRequired
};

export default CityBikeContent;