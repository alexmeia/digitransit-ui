import PropTypes from 'prop-types';
import React from 'react';
import IconWithIcon from './IconWithIcon';
import ComponentUsageExample from './ComponentUsageExample';

var IconWithBigCaution = function IconWithBigCaution(_ref) {
  var id = _ref.id,
      img = _ref.img,
      className = _ref.className;
  return React.createElement(IconWithIcon, {
    id: id,
    className: className,
    img: img,
    subIcon: 'icon-icon_caution',
    subIconClassName: 'subicon-caution'
  });
};

IconWithBigCaution.displayName = 'IconWithBigCaution';

IconWithBigCaution.description = function () {
  return React.createElement(
    ComponentUsageExample,
    { description: 'Bus with caution' },
    React.createElement(
      'div',
      { style: { paddingLeft: '5px' } },
      React.createElement(IconWithBigCaution, { className: 'bus', img: 'icon-icon_bus' })
    )
  );
};

IconWithBigCaution.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  img: PropTypes.string.isRequired
};

IconWithBigCaution.defaultProps = {
  id: 'IconWithBigCaution-default-id',
  className: ''
};

export default IconWithBigCaution;