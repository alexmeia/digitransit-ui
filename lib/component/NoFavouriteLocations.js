import React from 'react';
import { FormattedMessage } from 'react-intl';
import ComponentUsageExample from './ComponentUsageExample';
import EmptyFavouriteLocationSlot from './EmptyFavouriteLocationSlot';

var NoFavouriteLocations = function NoFavouriteLocations() {
  return React.createElement(
    'div',
    { id: 'no-favourites-container', className: 'border-bottom' },
    React.createElement(EmptyFavouriteLocationSlot, { index: 0 }),
    React.createElement(
      'div',
      { id: 'no-favourites-container-text' },
      React.createElement(FormattedMessage, {
        id: 'no-favourite-locations',
        defaultMessage: 'Nothing here to see.'
      })
    )
  );
};

NoFavouriteLocations.displayName = 'NoFavouriteLocations';

NoFavouriteLocations.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Display usage hint for users with no favourites saved'
    ),
    React.createElement(
      ComponentUsageExample,
      null,
      React.createElement(NoFavouriteLocations, null)
    )
  );
};

export default NoFavouriteLocations;