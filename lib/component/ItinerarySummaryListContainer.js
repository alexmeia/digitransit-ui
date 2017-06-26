import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { FormattedMessage } from 'react-intl';
import SummaryRow from './SummaryRow';

function ItinerarySummaryListContainer(props) {
  if (props.itineraries && props.itineraries.length > 0) {
    var open = props.open && Number(props.open);
    var summaries = props.itineraries.map(function (itinerary, i) {
      return React.createElement(
        SummaryRow,
        {
          refTime: props.searchTime,
          key: i // eslint-disable-line react/no-array-index-key
          , hash: i,
          data: itinerary,
          passive: i !== props.activeIndex,
          currentTime: props.currentTime,
          onSelect: props.onSelect,
          onSelectImmediately: props.onSelectImmediately,
          intermediatePlaces: props.relay.route.params.intermediatePlaces
        },
        i === open && props.children
      );
    });

    return React.createElement(
      'div',
      { className: 'summary-list-container momentum-scroll' },
      summaries
    );
  } else if (!props.relay.route.params.from.lat || !props.relay.route.params.from.lon || !props.relay.route.params.to.lat || !props.relay.route.params.to.lon) {
    return React.createElement(
      'div',
      { className: 'summary-list-container summary-no-route-found' },
      React.createElement(FormattedMessage, {
        id: 'no-route-start-end',
        defaultMessage: 'Please select origin and destination.'
      })
    );
  }
  return React.createElement(
    'div',
    { className: 'summary-list-container summary-no-route-found' },
    React.createElement(FormattedMessage, {
      id: 'no-route-msg',
      defaultMessage: 'Unfortunately no routes were found for your journey. ' + 'Please change your origin or destination address.'
    })
  );
}

ItinerarySummaryListContainer.propTypes = {
  searchTime: PropTypes.number.isRequired,
  itineraries: PropTypes.array,
  activeIndex: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSelectImmediately: PropTypes.func.isRequired,
  open: PropTypes.number,
  children: PropTypes.node,
  relay: PropTypes.shape({
    route: PropTypes.shape({
      params: PropTypes.shape({
        to: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number,
          address: PropTypes.string.isRequired
        }).isRequired,
        from: PropTypes.shape({
          lat: PropTypes.number,
          lon: PropTypes.number,
          address: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

export default Relay.createContainer(ItinerarySummaryListContainer, {
  fragments: {
    itineraries: function itineraries() {
      return function () {
        return {
          children: [{
            fieldName: 'walkDistance',
            kind: 'Field',
            metadata: {},
            type: 'Float'
          }, {
            fieldName: 'startTime',
            kind: 'Field',
            metadata: {},
            type: 'Long'
          }, {
            fieldName: 'endTime',
            kind: 'Field',
            metadata: {},
            type: 'Long'
          }, {
            children: [{
              fieldName: 'realTime',
              kind: 'Field',
              metadata: {},
              type: 'Boolean'
            }, {
              fieldName: 'transitLeg',
              kind: 'Field',
              metadata: {},
              type: 'Boolean'
            }, {
              fieldName: 'startTime',
              kind: 'Field',
              metadata: {},
              type: 'Long'
            }, {
              fieldName: 'endTime',
              kind: 'Field',
              metadata: {},
              type: 'Long'
            }, {
              fieldName: 'mode',
              kind: 'Field',
              metadata: {},
              type: 'Mode'
            }, {
              fieldName: 'distance',
              kind: 'Field',
              metadata: {},
              type: 'Float'
            }, {
              fieldName: 'duration',
              kind: 'Field',
              metadata: {},
              type: 'Float'
            }, {
              fieldName: 'rentedBike',
              kind: 'Field',
              metadata: {},
              type: 'Boolean'
            }, {
              fieldName: 'intermediatePlace',
              kind: 'Field',
              metadata: {},
              type: 'Boolean'
            }, {
              children: [{
                fieldName: 'mode',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'shortName',
                kind: 'Field',
                metadata: {},
                type: 'String'
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
              children: [{
                children: [{
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
                  fieldName: 'stop',
                  kind: 'Field',
                  metadata: {
                    canHaveSubselections: true,
                    inferredRootCallName: 'node',
                    inferredPrimaryKey: 'id'
                  },
                  type: 'Stop'
                }, {
                  fieldName: 'pickupType',
                  kind: 'Field',
                  metadata: {},
                  type: 'PickupDropoffType'
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
              fieldName: 'trip',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true,
                inferredRootCallName: 'node',
                inferredPrimaryKey: 'id'
              },
              type: 'Trip'
            }, {
              children: [{
                fieldName: 'name',
                kind: 'Field',
                metadata: {},
                type: 'String'
              }, {
                fieldName: 'lat',
                kind: 'Field',
                metadata: {},
                type: 'Float'
              }, {
                fieldName: 'lon',
                kind: 'Field',
                metadata: {},
                type: 'Float'
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
                fieldName: 'stop',
                kind: 'Field',
                metadata: {
                  canHaveSubselections: true,
                  inferredRootCallName: 'node',
                  inferredPrimaryKey: 'id'
                },
                type: 'Stop'
              }],
              fieldName: 'from',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true
              },
              type: 'Place'
            }, {
              children: [{
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
                fieldName: 'stop',
                kind: 'Field',
                metadata: {
                  canHaveSubselections: true,
                  inferredRootCallName: 'node',
                  inferredPrimaryKey: 'id'
                },
                type: 'Stop'
              }],
              fieldName: 'to',
              kind: 'Field',
              metadata: {
                canHaveSubselections: true
              },
              type: 'Place'
            }],
            fieldName: 'legs',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              isPlural: true
            },
            type: 'Leg'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {
            plural: true
          },
          name: 'ItinerarySummaryListContainer_ItinerariesRelayQL',
          type: 'Itinerary'
        };
      }();
    }
  }
});