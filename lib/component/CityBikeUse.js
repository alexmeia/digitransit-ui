import PropTypes from 'prop-types';
import React from 'react';

import { FormattedMessage } from 'react-intl';

import ComponentUsageExample from './ComponentUsageExample';
import { lang as exampleLang } from './ExampleData';

var CityBikeUse = function CityBikeUse(_ref, context) {
  var lang = _ref.lang;
  return React.createElement(
    'div',
    { className: 'city-bike-use-container' },
    React.createElement(
      'p',
      { className: 'sub-header-h4 text-center' },
      React.createElement(FormattedMessage, {
        id: 'citybike-register-required',
        defaultMessage: 'To use city bikes, you need to register'
      })
    ),
    React.createElement(
      'a',
      { href: context.config.cityBike.useUrl[lang] },
      React.createElement(
        'button',
        { className: 'use-bike-button cursor-pointer' },
        React.createElement(FormattedMessage, { id: 'use-citybike', defaultMessage: 'Start using' })
      )
    )
  );
};

CityBikeUse.displayName = 'CityBikeUse';

CityBikeUse.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Renders use citybike component'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(CityBikeUse, { lang: exampleLang })
    )
  );
};

CityBikeUse.propTypes = {
  lang: PropTypes.string.isRequired
};

CityBikeUse.contextTypes = {
  config: PropTypes.object.isRequired
};

export default CityBikeUse;