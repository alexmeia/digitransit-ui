import PropTypes from 'prop-types';
import React from 'react';
import IconWithTail from './IconWithTail';
import ComponentUsageExample from './ComponentUsageExample';

var SelectedIconWithTail = function SelectedIconWithTail(_ref) {
  var img = _ref.img,
      fullscreenMap = _ref.fullscreenMap;
  return React.createElement(
    IconWithTail,
    {
      img: img,
      className: 'selected-tail-icon',
      rotate: 180,
      scrollIntoView: fullscreenMap
    },
    React.createElement(
      'svg',
      null,
      React.createElement('circle', { strokeWidth: '2', r: '16', cx: '40', cy: '40', fill: 'rgba(0,0,0,0)', stroke: '#575757' }),
      React.createElement('use', { xlinkHref: '#icon-icon_good-availability', transform: 'translate(47,22) scale(0.15) ' }),
      React.createElement('circle', { strokeWidth: '1', r: '6', cx: '53', cy: '28', fill: 'rgba(0,0,0,0)', stroke: '#fff' })
    )
  );
};

SelectedIconWithTail.displayName = 'SelectedIconWithTail';

SelectedIconWithTail.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Shows an selected (vehicle) icon that cconsists of IconWithTail and a green ckecked mark and a greyish circle on top of it.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(SelectedIconWithTail, { className: 'bus selected-tail-icon', img: 'icon-icon_bus-live' })
    )
  );
};

SelectedIconWithTail.propTypes = {
  img: PropTypes.string.isRequired,
  fullscreenMap: PropTypes.bool
};

export default SelectedIconWithTail;