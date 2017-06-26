import PropTypes from 'prop-types';
import React from 'react';

import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';

var subIconTemplate = { fontSize: '65%', position: 'absolute', bottom: '-0.3em', left: '-0.3em' };
var IconWithIcon = function IconWithIcon(_ref) {
  var id = _ref.id,
      className = _ref.className,
      img = _ref.img,
      subIcon = _ref.subIcon,
      subIconClassName = _ref.subIconClassName;
  return React.createElement(
    'span',
    { style: { position: 'relative' }, id: id, className: className },
    React.createElement(
      'span',
      null,
      React.createElement(Icon, { img: img })
    ),
    subIcon && React.createElement(
      'span',
      { className: subIconClassName, style: subIconTemplate },
      React.createElement(Icon, { img: subIcon })
    )
  );
};

IconWithIcon.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      ComponentUsageExample,
      { description: 'Bus with caution' },
      React.createElement(
        'div',
        { style: { paddingLeft: '5px' } },
        React.createElement(IconWithIcon, {
          className: 'bus',
          img: 'icon-icon_bus',
          subIcon: 'icon-icon_caution',
          subIconClassName: 'subicon-caution'
        })
      )
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Bus with call agency caution' },
      React.createElement(
        'div',
        { style: { paddingLeft: '5px' } },
        React.createElement(IconWithIcon, { className: 'bus', img: 'icon-icon_bus', subIcon: 'icon-icon_call' })
      )
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Bus with call agency caution, with 5em base font size' },
      React.createElement(
        'div',
        { style: { fontSize: '5em', paddingLeft: '5px' } },
        React.createElement(IconWithIcon, { className: 'bus', img: 'icon-icon_bus', subIcon: 'icon-icon_call' })
      )
    )
  );
};

IconWithIcon.displayName = 'IconWithIcon';

IconWithIcon.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  img: PropTypes.string.isRequired,
  subIcon: PropTypes.string,
  subIconClassName: PropTypes.string
};

IconWithIcon.defaultProps = {
  id: '',
  subIcon: '',
  className: '',
  subIconClassName: '',
  subIconStyle: {}
};

export default IconWithIcon;