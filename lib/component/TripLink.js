import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import cx from 'classnames';
import IconWithTail from './IconWithTail';

function TripLink(props) {
  var icon = React.createElement(IconWithTail, {
    className: cx(props.mode, 'tail-icon'),
    img: 'icon-icon_' + props.mode + '-live',
    rotate: 180
  });

  if (props.trip.trip) {
    return React.createElement(
      Link,
      {
        to: '/linjat/' + props.trip.trip.route.gtfsId + '/pysakit/' + props.trip.trip.pattern.code + '/' + props.trip.trip.gtfsId,
        className: 'route-now-content'
      },
      icon
    );
  }

  console.warn('Unable to match trip', props);
  return React.createElement(
    'span',
    { className: 'route-now-content' },
    icon
  );
}

TripLink.propTypes = {
  trip: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};

export default Relay.createContainer(TripLink, {
  fragments: {
    trip: function trip() {
      return function () {
        return {
          children: [{
            alias: 'trip',
            calls: [{
              kind: 'Call',
              metadata: {},
              name: 'route',
              value: {
                kind: 'CallVariable',
                callVariableName: 'route'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'direction',
              value: {
                kind: 'CallVariable',
                callVariableName: 'direction'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'time',
              value: {
                kind: 'CallVariable',
                callVariableName: 'time'
              }
            }, {
              kind: 'Call',
              metadata: {},
              name: 'date',
              value: {
                kind: 'CallVariable',
                callVariableName: 'date'
              }
            }],
            children: [{
              fieldName: 'gtfsId',
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
            fieldName: 'fuzzyTrip',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              inferredRootCallName: 'node',
              inferredPrimaryKey: 'id'
            },
            type: 'Trip'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'TripLink_TripRelayQL',
          type: 'QueryType'
        };
      }();
    }
  },
  initialVariables: {
    route: null,
    direction: null,
    date: null,
    time: null
  }
});