import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

var inputOrPlaceholder = function inputOrPlaceholder(value, placeholder) {
  if (value !== undefined && value !== null && value !== '') {
    return React.createElement(
      'div',
      { className: 'address-input no-select' },
      value
    );
  }
  return React.createElement(
    'div',
    { className: 'address-placeholder no-select' },
    placeholder
  );
};

var FakeSearchBar = function FakeSearchBar(_ref) {
  var id = _ref.id,
      onClick = _ref.onClick,
      className = _ref.className,
      endpointAddress = _ref.endpointAddress,
      placeholder = _ref.placeholder;
  return React.createElement(
    'div',
    { id: id, onClick: onClick },
    React.createElement(
      'div',
      { className: cx('input-placeholder', className) },
      inputOrPlaceholder(endpointAddress, placeholder)
    )
  );
};

FakeSearchBar.propTypes = {
  className: PropTypes.string,
  endpointAddress: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  placeholder: PropTypes.string.isRequired
};

FakeSearchBar.displayName = 'FakeSearchBar';
export default FakeSearchBar;