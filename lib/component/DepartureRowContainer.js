import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import filter from 'lodash/filter';

import RouteNumberContainer from './RouteNumberContainer';
import Distance from './Distance';
import RouteDestination from './RouteDestination';
import DepartureTime from './DepartureTime';
import ComponentUsageExample from './ComponentUsageExample';
import { isCallAgencyDeparture } from '../util/legUtils';

var departureRowContainerFragment = function departureRowContainerFragment() {
  return function () {
    return {
      children: [{
        children: [{
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
            fieldName: 'color',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            children: [{
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                isRequisite: true
              },
              type: 'ID'
            }, {
              fieldName: 'effectiveStartDate',
              kind: 'Field',
              metadata: {},
              type: 'Long'
            }, {
              fieldName: 'effectiveEndDate',
              kind: 'Field',
              metadata: {},
              type: 'Long'
            }],
            fieldName: 'alerts',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id',
              isPlural: true
            },
            type: 'Alert'
          }, {
            children: [{
              fieldName: 'name',
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
            fieldName: 'agency',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id'
            },
            type: 'Agency'
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
          fieldName: 'code',
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
        fieldName: 'pattern',
        kind: 'Field',
        metadata: {
          canHaveSubselections: true,
          inferredRootCallName: 'node',
          inferredPrimaryKey: 'id'
        },
        type: 'Pattern'
      }, {
        calls: [{
          kind: 'Call',
          metadata: {
            type: 'Long'
          },
          name: 'startTime',
          value: {
            kind: 'CallVariable',
            callVariableName: 'currentTime'
          }
        }, {
          kind: 'Call',
          metadata: {},
          name: 'timeRange',
          value: {
            kind: 'CallVariable',
            callVariableName: 'timeRange'
          }
        }, {
          kind: 'Call',
          metadata: {},
          name: 'numberOfDepartures',
          value: {
            kind: 'CallValue',
            callValue: 2
          }
        }],
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
          fieldName: 'realtimeArrival',
          kind: 'Field',
          metadata: {},
          type: 'Int'
        }, {
          fieldName: 'scheduledArrival',
          kind: 'Field',
          metadata: {},
          type: 'Int'
        }, {
          fieldName: 'pickupType',
          kind: 'Field',
          metadata: {},
          type: 'PickupDropoffType'
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
        }, {
          fieldName: 'stopHeadsign',
          kind: 'Field',
          metadata: {},
          type: 'String'
        }, {
          children: [{
            fieldName: 'code',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'platformCode',
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
          fieldName: 'stop',
          kind: 'Field',
          metadata: {
            canHaveSubselections: true,
            inferredRootCallName: 'node',
            inferredPrimaryKey: 'id'
          },
          type: 'Stop'
        }, {
          children: [{
            fieldName: 'gtfsId',
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
          fieldName: 'trip',
          kind: 'Field',
          metadata: {
            canHaveSubselections: true,
            inferredRootCallName: 'node',
            inferredPrimaryKey: 'id'
          },
          type: 'Trip'
        }],
        fieldName: 'stoptimes',
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
      }],
      id: Relay.QL.__id(),
      kind: 'Fragment',
      metadata: {},
      name: 'DepartureRowContainerRelayQL',
      type: 'DepartureRow'
    };
  }();
};

var hasActiveDisruption = function hasActiveDisruption(t, alerts) {
  return filter(alerts, function (alert) {
    return alert.effectiveStartDate < t && t < alert.effectiveEndDate;
  }).length > 0;
};

var DepartureRow = function DepartureRow(props) {
  var departure = props.departure;
  var departureTimes = void 0;
  var headsign = void 0;
  if (departure.stoptimes) {
    departureTimes = departure.stoptimes.map(function (departureTime) {
      headsign = departureTime.stopHeadsign;
      var canceled = departureTime.realtimeState === 'CANCELED';
      var key = departure.pattern.route.gtfsId + ':' + departure.pattern.headsign + ':\n        ' + departureTime.realtimeDeparture;

      return React.createElement(DepartureTime, {
        key: key,
        departureTime: departureTime.serviceDay + departureTime.realtimeDeparture,
        realtime: departureTime.realtime,
        currentTime: props.currentTime,
        canceled: canceled
      });
    });
  }

  return React.createElement(
    'div',
    { className: 'next-departure-row padding-vertical-normal border-bottom' },
    React.createElement(
      Link,
      {
        to: '/linjat/' + departure.pattern.route.gtfsId + '/pysakit/' + departure.pattern.code,
        key: departure.pattern.code
      },
      React.createElement(Distance, { distance: props.distance }),
      React.createElement(RouteNumberContainer, {
        route: departure.pattern.route,
        hasDisruption: hasActiveDisruption(props.currentTime, departure.pattern.route.alerts),
        isCallAgency: isCallAgencyDeparture(departure.stoptimes[0])
      }),
      React.createElement(RouteDestination, {
        mode: departure.pattern.route.mode,
        destination: headsign || departure.pattern.route.longName
      }),
      departureTimes
    )
  );
};

DepartureRow.displayName = 'DepartureRow';

DepartureRow.propTypes = {
  departure: PropTypes.object.isRequired,
  distance: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  timeRange: PropTypes.number.isRequired
};

var exampleDeparture1 = {
  pattern: {
    code: '28',
    headSign: 'Tampere',
    route: {
      gtfsId: '123',
      mode: 'RAIL',
      shortName: 'IC28'
    }
  },
  stoptimes: [{
    realtimeDeparture: 6900,
    realtime: true,
    serviceDay: 1473670000
  }, {
    realtimeDeparture: 8000,
    realtime: false,
    serviceDay: 1473670000
  }]
};

var exampleDeparture2 = {
  pattern: {
    code: '154',
    headSign: 'Kamppi',
    route: {
      gtfsId: '123',
      mode: 'BUS',
      shortName: '154'
    }
  },
  stoptimes: [{
    realtimeDeparture: 7396,
    realtime: true,
    serviceDay: 1473670000,
    realtimeState: 'CANCELED'
  }, {
    realtimeDeparture: 9000,
    realtime: false,
    serviceDay: 1473670000
  }]
};

DepartureRow.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      ComponentUsageExample,
      { description: 'example' },
      React.createElement(DepartureRow, {
        departure: exampleDeparture1,
        distance: 123,
        currentTime: 1473676196
      })
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'with cancellation' },
      React.createElement(DepartureRow, {
        departure: exampleDeparture2,
        distance: 123,
        currentTime: 1473676196
      })
    )
  );
};

export { DepartureRow };

export default Relay.createContainer(DepartureRow, {
  fragments: {
    departure: departureRowContainerFragment
  },

  initialVariables: {
    currentTime: 0,
    timeRange: 0
  }
});