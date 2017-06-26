import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import some from 'lodash/some';
import cx from 'classnames';

import { getStartTime } from '../util/timeUtils';
import TripListHeader from './TripListHeader';
import TripStopListContainer from './TripStopListContainer';

function TripStopsContainer(props, _ref) {
  var breakpoint = _ref.breakpoint;

  var tripStartTime = getStartTime(props.trip.stoptimesForDate[0].scheduledDeparture);

  var fullscreen = some(props.routes, function (route) {
    return route.fullscreenMap;
  });

  return React.createElement(
    'div',
    {
      className: cx('route-page-content', {
        'fullscreen-map': fullscreen && breakpoint !== 'large'
      })
    },
    React.createElement(TripListHeader, { key: 'header', className: breakpoint === 'large' && 'bp-large' }),
    React.createElement(TripStopListContainer, {
      key: 'list',
      trip: props.trip,
      tripStart: tripStartTime,
      fullscreenMap: fullscreen
    })
  );
}

TripStopsContainer.propTypes = {
  pattern: PropTypes.object.isRequired,
  trip: PropTypes.shape({
    stoptimesForDate: PropTypes.arrayOf(PropTypes.shape({
      scheduledDeparture: PropTypes.number.isRequired
    }).isRequired).isRequired
  }).isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({
    fullscreenMap: PropTypes.bool
  })).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

TripStopsContainer.contextTypes = {
  breakpoint: PropTypes.string
};

export default Relay.createContainer(TripStopsContainer, {
  fragments: {
    trip: function trip() {
      return function (RQL_0) {
        return {
          children: [].concat.apply([], [{
            children: [{
              fieldName: 'scheduledDeparture',
              kind: 'Field',
              metadata: {},
              type: 'Int'
            }],
            fieldName: 'stoptimesForDate',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              isPlural: true
            },
            type: 'Stoptime'
          }, {
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isGenerated: true,
              isRequisite: true
            },
            type: 'ID'
          }, Relay.QL.__frag(RQL_0)]),
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'TripStopsContainer_TripRelayQL',
          type: 'Trip'
        };
      }(TripStopListContainer.getFragment('trip'));
    },
    pattern: function pattern() {
      return function () {
        return {
          children: [{
            fieldName: 'id',
            kind: 'Field',
            metadata: {
              isRequisite: true
            },
            type: 'ID'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'TripStopsContainer_PatternRelayQL',
          type: 'Pattern'
        };
      }();
    }
  }
});