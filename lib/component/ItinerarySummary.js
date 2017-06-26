import PropTypes from 'prop-types';
import React from 'react';
import Duration from './Duration';
import WalkDistance from './WalkDistance';

var ItinerarySummary = function ItinerarySummary(_ref) {
  var itinerary = _ref.itinerary,
      children = _ref.children;
  return React.createElement(
    'div',
    { className: 'itinerary-summary' },
    React.createElement(Duration, { duration: itinerary.duration, className: 'duration--itinerary-summary' }),
    children,
    React.createElement(WalkDistance, { walkDistance: itinerary.walkDistance })
  );
};

ItinerarySummary.description = function () {
  return "Displays itinerary summary row; itinerary's duration and walk distance";
};

ItinerarySummary.propTypes = {
  itinerary: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

ItinerarySummary.displayName = 'ItinerarySummary';

export default ItinerarySummary;