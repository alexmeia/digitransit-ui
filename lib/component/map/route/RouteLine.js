import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';

import StopMarker from '../non-tile-layer/StopMarker';
import StopCardHeaderContainer from '../../StopCardHeaderContainer';
import LocationMarker from '../LocationMarker';
import Line from '../Line';

import { isBrowser } from '../../../util/browser';

var RouteLine = function (_React$Component) {
  _inherits(RouteLine, _React$Component);

  function RouteLine() {
    _classCallCheck(this, RouteLine);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  RouteLine.prototype.render = function render() {
    var _this2 = this;

    if (!isBrowser || !this.props.pattern) {
      return false;
    }

    var objs = [];
    var modeClass = this.props.pattern.route.mode.toLowerCase();

    if (!this.props.thin) {
      // We are drawing a background line under an itinerary line,
      // so we don't want many markers cluttering the map
      objs.push(React.createElement(LocationMarker, {
        key: 'from',
        position: this.props.pattern.stops[0],
        className: 'from'
      }));

      objs.push(React.createElement(LocationMarker, {
        key: 'to',
        position: this.props.pattern.stops[this.props.pattern.stops.length - 1],
        className: 'to'
      }));
    }

    var filteredIds = this.props.filteredStops ? this.props.filteredStops.map(function (stop) {
      return stop.stopId;
    }) : [];

    var markers = this.props.pattern ? this.props.pattern.stops.filter(function (stop) {
      return !filteredIds.includes(stop.gtfsId);
    }).map(function (stop) {
      return React.createElement(StopMarker, {
        stop: stop,
        key: stop.gtfsId,
        mode: modeClass + (_this2.props.thin ? ' thin' : ''),
        thin: _this2.props.thin
      });
    }) : false;

    return React.createElement(
      'div',
      { style: { display: 'none' } },
      objs,
      React.createElement(Line, {
        key: 'line',
        geometry: this.props.pattern.geometry || this.props.pattern.stops,
        mode: modeClass,
        thin: this.props.thin
      }),
      markers
    );
  };

  return RouteLine;
}(React.Component);

RouteLine.propTypes = {
  pattern: PropTypes.object.isRequired,
  thin: PropTypes.bool,
  filteredStops: PropTypes.array
};


export default Relay.createContainer(RouteLine, {
  fragments: {
    pattern: function pattern() {
      return function (RQL_0) {
        return {
          children: [{
            children: [{
              fieldName: 'lat',
              kind: 'Field',
              metadata: {},
              type: 'Float'
            }, {
              fieldName: 'lon',
              kind: 'Field',
              metadata: {},
              type: 'Float'
            }],
            fieldName: 'geometry',
            kind: 'Field',
            metadata: {
              canHaveSubselections: true,
              isPlural: true
            },
            type: 'Coordinates'
          }, {
            children: [{
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
            children: [].concat.apply([], [{
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
              fieldName: 'name',
              kind: 'Field',
              metadata: {},
              type: 'String'
            }, {
              fieldName: 'gtfsId',
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
            }, Relay.QL.__frag(RQL_0)]),
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
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'RouteLine_PatternRelayQL',
          type: 'Pattern'
        };
      }(StopCardHeaderContainer.getFragment('stop'));
    }
  }
});