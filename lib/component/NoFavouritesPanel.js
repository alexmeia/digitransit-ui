import React from 'react';
import { FormattedMessage } from 'react-intl';

var NoFavouritesPanel = function NoFavouritesPanel() {
  return React.createElement(
    'div',
    { className: 'nofavs row' },
    React.createElement(
      'div',
      { className: 'small-12 columns' },
      React.createElement(
        'div',
        { className: 'nofavs-p black text-center' },
        React.createElement('div', { className: 'nofavs-img' }),
        React.createElement(FormattedMessage, {
          id: 'no-favourites',
          defaultMessage: 'Use the star buttons to add routes or stops to your favorites. Your favorites are shown on this page.'
        })
      )
    )
  );
};

export default NoFavouritesPanel;