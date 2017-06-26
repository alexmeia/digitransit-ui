import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';

var InfoIcon = function InfoIcon(_ref) {
  var stop = _ref.stop;
  return React.createElement(
    Link,
    { href: '/pysakit/' + stop.gtfsId + '/info' },
    React.createElement(
      'span',
      { className: 'cursor-pointer' },
      React.createElement(Icon, { className: 'info', img: 'icon-icon_info' })
    )
  );
};

InfoIcon.propTypes = {
  stop: PropTypes.object.isRequired
};

InfoIcon.displayName = 'InfoIcon';

var exampleStop = {
  code: '4611',
  gtfsId: 'HSL:1541157',
  name: 'Kaivonkatsojanpuisto',
  desc: 'Kaivonkatsojantie'
};

InfoIcon.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      ComponentUsageExample,
      { description: 'basic' },
      React.createElement(InfoIcon, { stop: exampleStop })
    )
  );
};

export default InfoIcon;