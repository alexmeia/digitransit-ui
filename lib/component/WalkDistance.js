import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Icon from './Icon';

function WalkDistance(props) {
  var roundedWalkDistanceInM = Math.round(props.walkDistance / 100) * 100;
  var roundedWalkDistanceInKm = (roundedWalkDistanceInM / 1000).toFixed(1);

  var walkDistance = roundedWalkDistanceInM < 1000 ? roundedWalkDistanceInM + 'm' : roundedWalkDistanceInKm + 'km';

  var icon = 'icon-' + (props.icon || 'icon_walk');

  return React.createElement(
    'span',
    { className: cx(props.className), style: { whiteSpace: 'nowrap' } },
    React.createElement(Icon, { img: icon }),
    React.createElement(
      'span',
      { className: 'walk-distance' },
      '\xA0',
      walkDistance
    )
  );
}

WalkDistance.description = 'Displays the total walk distance of the itinerary in precision of 10 meters. ' + 'Requires walkDistance in meters as props. Displays distance in km if distance is 1000 or above';

WalkDistance.propTypes = {
  walkDistance: PropTypes.number.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string
};

WalkDistance.displayName = 'WalkDistance';
export default WalkDistance;