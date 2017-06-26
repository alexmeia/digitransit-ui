import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { intlShape } from 'react-intl';

import RouteHeader from '../../RouteHeader';

import { addFavouriteRoute } from '../../../action/FavouriteActions';

var RouteMarkerPopup = function (_React$Component) {
  _inherits(RouteMarkerPopup, _React$Component);

  function RouteMarkerPopup() {
    var _temp, _this, _ret;

    _classCallCheck(this, RouteMarkerPopup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.addAsFavouriteRoute = function (e) {
      e.stopPropagation();
      _this.props.context.executeAction(addFavouriteRoute, _this.props.trip.route.gtfsId);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  RouteMarkerPopup.prototype.getChildContext = function getChildContext() {
    return {
      router: this.props.context.router
    };
  };

  RouteMarkerPopup.prototype.render = function render() {
    var patternPath = '/linjat/' + this.props.trip.route.gtfsId + '/pysakit';
    var tripPath = patternPath;

    if (this.props.trip.fuzzyTrip) {
      patternPath += '/' + this.props.trip.fuzzyTrip.pattern.code;
      tripPath = patternPath + '/' + this.props.trip.fuzzyTrip.gtfsId;
    }

    return React.createElement(
      'div',
      { className: 'card' },
      React.createElement(RouteHeader, {
        route: this.props.trip.route,
        pattern: this.props.trip.fuzzyTrip && this.props.trip.fuzzyTrip.pattern,
        trip: this.props.message.tripStartTime,
        favourite: this.props.favourite,
        addFavouriteRoute: this.addAsFavouriteRoute
      }),
      React.createElement(
        'div',
        { className: 'bottom location' },
        React.createElement(
          Link,
          { to: tripPath },
          this.props.context.intl.formatMessage({ id: 'trip-information', defaultMessage: 'Trip Information' })
        ),
        React.createElement('br', null),
        React.createElement(
          Link,
          { to: patternPath, className: 'route' },
          this.props.context.intl.formatMessage({ id: 'view-route', defaultMessage: 'View Route' })
        )
      )
    );
  };

  return RouteMarkerPopup;
}(React.Component);

RouteMarkerPopup.childContextTypes = {
  router: PropTypes.object.isRequired
};
RouteMarkerPopup.propTypes = {
  context: PropTypes.shape({
    router: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    executeAction: PropTypes.func.isRequired
  }).isRequired,
  trip: PropTypes.shape({
    route: PropTypes.shape({
      gtfsId: PropTypes.string.isRequired
    }).isRequired,
    fuzzyTrip: PropTypes.shape({
      gtfsId: PropTypes.string,
      pattern: PropTypes.shape({
        code: PropTypes.string.isRequired
      })
    })
  }).isRequired,
  favourite: PropTypes.bool,
  message: PropTypes.shape({
    mode: PropTypes.string.isRequired,
    tripStartTime: PropTypes.string.isRequired
  }).isRequired
};


var RouteMarkerPopupWithFavourite = connectToStores(RouteMarkerPopup, ['FavouriteRoutesStore'], function (context, props) {
  return {
    favourite: context.getStore('FavouriteRoutesStore').isFavourite(props.trip.route.gtfsId)
  };
});

export default Relay.createContainer(RouteMarkerPopupWithFavourite, {
  fragments: {
    trip: function trip() {
      return function () {
        return {
          children: [{
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
                fieldName: 'headsign',
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
                fieldName: 'stops',
                kind: 'Field',
                metadata: {
                  canHaveSubselections: true,
                  inferredRootCallName: 'node',
                  inferredPrimaryKey: 'id',
                  isPlural: true
                },
                type: 'Stop'
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
          }, {
            calls: [{
              kind: 'Call',
              metadata: {},
              name: 'id',
              value: {
                kind: 'CallVariable',
                callVariableName: 'route'
              }
            }],
            children: [{
              fieldName: 'gtfsId',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
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
              fieldName: 'longName',
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
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'RouteMarkerPopup_TripRelayQL',
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