import PropTypes from 'prop-types';
import React from 'react';

import CardHeader from './CardHeader';
import { station as exampleStation } from './ExampleData';
import ComponentUsageExample from './ComponentUsageExample';
import Card from './Card';
import Favourite from './Favourite';

var CityBikeCard = function CityBikeCard(_ref) {
  var station = _ref.station,
      children = _ref.children,
      className = _ref.className,
      isFavourite = _ref.isFavourite,
      toggleFavourite = _ref.toggleFavourite;

  if (!station || !children || children.length === 0) {
    return false;
  }

  return React.createElement(
    Card,
    { className: className },
    React.createElement(CardHeader, {
      name: station.name,
      description: station.stationId,
      icon: 'icon-icon_citybike',
      unlinked: true,
      icons: [React.createElement(Favourite, {
        key: 'favourite',
        favourite: isFavourite,
        addFavourite: toggleFavourite
      })]
    }),
    children
  );
};

CityBikeCard.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Renders a citybike card with header and child props as content'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Basic' },
      React.createElement(
        CityBikeCard,
        { className: 'padding-small', station: exampleStation },
        'Im content of the citybike card'
      )
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Selected as favourite' },
      React.createElement(
        CityBikeCard,
        {
          className: 'padding-small',
          toggleFavourite: function toggleFavourite() {}, isFavourite: true, station: exampleStation
        },
        'Im content of the favourite citybike card'
      )
    )
  );
};

CityBikeCard.displayName = 'CityBikeCard';

CityBikeCard.propTypes = {
  station: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  toggleFavourite: PropTypes.func,
  isFavourite: PropTypes.bool
};

export default CityBikeCard;