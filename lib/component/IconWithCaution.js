import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import ComponentUsageExample from './ComponentUsageExample';

var IconWithCaution = function IconWithCaution(props) {
  return React.createElement(
    'svg',
    { id: props.id, viewBox: '0 0 40 40', className: cx('icon', props.className) },
    React.createElement('use', {
      xlinkHref: '#' + props.img
    }),
    React.createElement('use', {
      xlinkHref: '#icon-icon_caution',
      transform: 'scale(0.6,0.6)',
      y: '30',
      style: { color: 'white', fill: 'red' }
    })
  );
};

IconWithCaution.description = function () {
  return React.createElement(
    ComponentUsageExample,
    { description: 'Bus with caution' },
    React.createElement(IconWithCaution, { className: 'bus', img: 'icon-icon_bus' })
  );
};

IconWithCaution.displayName = 'IconWithCaution';

IconWithCaution.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  img: PropTypes.string.isRequired
};

export default IconWithCaution;