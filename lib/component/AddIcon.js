import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import ComponentUsageExample from './ComponentUsageExample';

var AddIcon = function AddIcon(_ref) {
  var id = _ref.id;
  return React.createElement(
    'svg',
    { id: id, viewBox: '0 0 40 40', className: cx('icon') },
    React.createElement('circle', { strokeWidth: '2', stroke: 'currentColor', fill: 'currentColor', cx: '20', cy: '20', r: '19' }),
    React.createElement('use', {
      xlinkHref: '#icon-icon_plus',
      transform: 'scale(0.7,0.7)',
      y: '8',
      x: '8',
      style: { color: 'white', fill: 'white' }
    })
  );
};

AddIcon.description = function () {
  return React.createElement(
    ComponentUsageExample,
    { description: 'Add icon' },
    React.createElement(AddIcon, null)
  );
};

AddIcon.displayName = 'IconWithCaution';

AddIcon.propTypes = {
  id: PropTypes.string
};

export default AddIcon;