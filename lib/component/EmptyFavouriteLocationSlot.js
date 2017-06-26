import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import AddIcon from './AddIcon';
import ComponentUsageExample from './ComponentUsageExample';

var EmptyFavouriteLocationSlot = function EmptyFavouriteLocationSlot(_ref) {
  var index = _ref.index;
  return React.createElement(
    Link,
    {
      id: 'add-new-favourite-' + index,
      to: '/suosikki/uusi',
      className: 'cursor-pointer no-decoration',
      key: 'add-new-favourite-' + index
    },
    React.createElement(
      'div',
      { className: 'new-favourite-button-content' },
      React.createElement(AddIcon, null),
      React.createElement(
        'p',
        { className: 'add-location-text' },
        React.createElement(FormattedMessage, { id: 'add-location', defaultMessage: 'Add location' })
      )
    )
  );
};

EmptyFavouriteLocationSlot.displayName = 'EmptyFavouriteLocationSlot';

EmptyFavouriteLocationSlot.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Renders a empty favourite location slot component'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'none' },
      React.createElement(EmptyFavouriteLocationSlot, null)
    )
  );
};

EmptyFavouriteLocationSlot.propTypes = {
  index: PropTypes.number.isRequired
};

export default EmptyFavouriteLocationSlot;