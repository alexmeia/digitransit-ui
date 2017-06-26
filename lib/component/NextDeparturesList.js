import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import sortBy from 'lodash/sortBy';
import Distance from './Distance';
import RouteNumber from './RouteNumber';
import RouteDestination from './RouteDestination';
import DepartureTime from './DepartureTime';

// TODO: Alerts aren't showing properly
// Need to implement logic as per DepartureListContainer
function NextDeparturesList(props) {
  var departures = props.departures.map(function (originalDeparture) {
    var distance = originalDeparture.distance;

    // TODO: use util or util Component
    var roundedDistance = distance < 1000 ? (distance - distance % 10) / 1000 : (distance - distance % 100) / 1000;

    var departure = Object.assign({}, originalDeparture, { roundedDistance: roundedDistance });

    if (departure.stoptime == null || departure.stoptime.stoptimes.length === 0) {
      return departure;
    }

    var firstTime = departure.stoptime.stoptimes[0];

    departure.sorttime = firstTime.serviceDay + (firstTime.realtime ? firstTime.realtimeDeparture : firstTime.scheduledDeparture);

    return departure;
  });

  var departureObjs = sortBy(departures, ['roundedDistance', 'sorttime']).map(function (departure) {
    var stoptime = departure.stoptime;

    var departureTimes = stoptime.stoptimes.map(function (departureTime) {
      var canceled = departureTime.realtimeState === 'CANCELED';
      var key = stoptime.pattern.route.gtfsId + ':' + stoptime.pattern.headsign + ':\n        ' + departureTime.realtimeDeparture;

      return React.createElement(DepartureTime, {
        key: key,
        departureTime: departureTime.serviceDay + departureTime.realtimeDeparture,
        realtime: departureTime.realtime,
        currentTime: props.currentTime,
        canceled: canceled
      });
    });

    // TODO: Should this be its own view component?
    return React.createElement(
      Link,
      {
        to: '/linjat/' + stoptime.pattern.route.gtfsId + '/pysakit/' + stoptime.pattern.code,
        key: stoptime.pattern.code
      },
      React.createElement(
        'div',
        { className: 'next-departure-row padding-vertical-normal border-bottom' },
        React.createElement(Distance, { distance: departure.distance }),
        React.createElement(RouteNumber, {
          mode: stoptime.pattern.route.mode,
          text: stoptime.pattern.route.shortName,
          hasDisruption: departure.hasDisruption
        }),
        React.createElement(RouteDestination, {
          mode: stoptime.pattern.route.mode,
          destination: stoptime.pattern.headsign || stoptime.pattern.route.longName
        }),
        departureTimes
      )
    );
  });

  return React.createElement(
    'div',
    null,
    departureObjs
  );
}

NextDeparturesList.propTypes = {
  departures: PropTypes.array.isRequired,
  currentTime: PropTypes.number.isRequired
};

export default NextDeparturesList;

export var relayFragment = function () {
  return {
    children: [{
      children: [{
        fieldName: 'code',
        kind: 'Field',
        metadata: {},
        type: 'String'
      }, {
        fieldName: 'headsign',
        kind: 'Field',
        metadata: {},
        type: 'String'
      }, {
        children: [{
          fieldName: 'gtfsId',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }, {
          fieldName: 'shortName',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }, {
          fieldName: 'longName',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }, {
          fieldName: 'mode',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }, {
          fieldName: 'id',
          kind: 'Field',
          metadata: {
            isGenerated: true,
            isRequisite: true
          },
          type: 'ID'
        }],
        fieldName: 'route',
        kind: 'Field',
        metadata: {
          canHaveSubselections: true,
          inferredRootCallName: 'node',
          inferredPrimaryKey: 'id'
        },
        type: 'Route'
      }, {
        fieldName: 'id',
        kind: 'Field',
        metadata: {
          isGenerated: true,
          isRequisite: true
        },
        type: 'ID'
      }],
      fieldName: 'pattern',
      kind: 'Field',
      metadata: {
        canHaveSubselections: true,
        inferredRootCallName: 'node',
        inferredPrimaryKey: 'id'
      },
      type: 'Pattern'
    }, {
      children: [{
        fieldName: 'realtimeState',
        kind: 'Field',
        metadata: {},
        type: 'RealtimeState'
      }, {
        fieldName: 'realtimeDeparture',
        kind: 'Field',
        metadata: {},
        type: 'Int'
      }, {
        fieldName: 'scheduledDeparture',
        kind: 'Field',
        metadata: {},
        type: 'Int'
      }, {
        fieldName: 'realtime',
        kind: 'Field',
        metadata: {},
        type: 'Boolean'
      }, {
        fieldName: 'serviceDay',
        kind: 'Field',
        metadata: {},
        type: 'Long'
      }],
      fieldName: 'stoptimes',
      kind: 'Field',
      metadata: {
        canHaveSubselections: true,
        isPlural: true
      },
      type: 'Stoptime'
    }],
    id: Relay.QL.__id(),
    kind: 'Fragment',
    metadata: {},
    name: 'NextDeparturesListRelayQL',
    type: 'StoptimesInPattern'
  };
}();