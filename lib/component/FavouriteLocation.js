import _extends from 'babel-runtime/helpers/extends';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';

import ComponentUsageExample from './ComponentUsageExample';
import Icon from './Icon';
import DepartureTime from './DepartureTime';
import RouteNumber from './RouteNumber';
import { favouriteLocation as favouriteLocationExample } from './ExampleData';

var FavouriteLocation = function FavouriteLocation(_ref) {
  var favourite = _ref.favourite,
      className = _ref.className,
      currentTime = _ref.currentTime,
      departureTime = _ref.departureTime,
      firstTransitLeg = _ref.firstTransitLeg,
      clickFavourite = _ref.clickFavourite;
  var locationName = favourite.locationName,
      id = favourite.id,
      lat = favourite.lat,
      lon = favourite.lon,
      selectedIconId = favourite.selectedIconId;


  var departureTimeComponent = void 0;
  if (departureTime && currentTime < departureTime) {
    // Departure is in the future
    departureTimeComponent = React.createElement(DepartureTime, {
      departureTime: departureTime,
      realtime: firstTransitLeg && firstTransitLeg.realTime,
      currentTime: currentTime,
      className: 'time--small'
    });
  } else {
    departureTimeComponent = React.createElement(
      'div',
      { className: 'favourite-location-content-placeholder time--small' },
      '--:--'
    );
  }

  // Show either route number and when it departs from nearest stop,
  // or icon indicating that the itinerary is just walking.
  var info = void 0;
  if (firstTransitLeg && firstTransitLeg.route) {
    info = React.createElement(
      'div',
      { className: 'favourite-location-departure' },
      React.createElement(RouteNumber, {
        mode: firstTransitLeg.mode,
        realtime: firstTransitLeg.realTime,
        text: firstTransitLeg.route.shortName
      }),
      '\xA0',
      departureTimeComponent
    );
  } else {
    info = React.createElement(Icon, { img: 'icon-icon_walk', viewBox: '6 0 40 40' });
  }

  return React.createElement(
    'div',
    {
      'data-swipeable': 'true',
      className: cx('favourite-location-content', className),
      onClick: function onClick() {
        return clickFavourite(locationName, lat, lon);
      }
    },
    React.createElement(
      'div',
      { className: 'favourite-location-arrival' },
      React.createElement(Icon, { className: 'favourite-location-icon', img: selectedIconId }),
      React.createElement(
        'div',
        { className: 'favourite-location-name' },
        locationName
      )
    ),
    info,
    React.createElement(
      Link,
      {
        onClick: function onClick(e) {
          e.stopPropagation();
        },
        to: '/suosikki/muokkaa/' + id,
        className: 'cursor-pointer no-decoration'
      },
      React.createElement(
        'div',
        { className: 'favourite-edit-icon-click-area' },
        React.createElement(Icon, { className: 'favourite-edit-icon', img: 'icon-icon_edit' })
      )
    )
  );
};

FavouriteLocation.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Renders a favourite location component'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'first leg is with a bus' },
      React.createElement(FavouriteLocation, _extends({
        clickFavourite: function clickFavourite() {}
      }, favouriteLocationExample))
    )
  );
};

FavouriteLocation.propTypes = {
  favourite: PropTypes.object,
  addFavourite: PropTypes.func,
  clickFavourite: PropTypes.func,
  className: PropTypes.string,
  departureTime: PropTypes.number,
  currentTime: PropTypes.number,
  firstTransitLeg: PropTypes.object
};

FavouriteLocation.displayName = 'FavouriteLocation';

export default FavouriteLocation;