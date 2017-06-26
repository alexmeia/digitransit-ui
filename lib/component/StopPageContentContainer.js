import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import some from 'lodash/some';
import mapProps from 'recompose/mapProps';
import getContext from 'recompose/getContext';

import StopPageTabContainer from './StopPageTabContainer';
import DepartureListHeader from './DepartureListHeader';
import DepartureListContainer from './DepartureListContainer';
import TimetableContainer from './TimetableContainer';
import Error404 from './404';

var StopPageContentOptions = function (_React$Component) {
  _inherits(StopPageContentOptions, _React$Component);

  function StopPageContentOptions(props) {
    _classCallCheck(this, StopPageContentOptions);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onDateChange = function (_ref) {
      var target = _ref.target;

      _this.props.setDate(target.value);
    };

    _this.setTab = function (val) {
      _this.setState({
        showTab: val
      });
    };

    _this.state = {
      showTab: 'right-now' // Show right-now as default
    };
    return _this;
  }

  StopPageContentOptions.prototype.render = function render() {
    // Currently shows only next departures, add Timetables
    return React.createElement(
      'div',
      { className: 'stop-page-content-wrapper' },
      React.createElement(
        'div',
        null,
        React.createElement(StopPageTabContainer, { selectedTab: this.setTab }),
        React.createElement('div', { className: 'stop-tabs-fillerline' }),
        this.state.showTab === 'right-now' && React.createElement(DepartureListHeader, null)
      ),
      this.state.showTab === 'right-now' && React.createElement(
        'div',
        { className: 'stop-scroll-container momentum-scroll' },
        React.createElement(DepartureListContainerWithProps, this.props.departureProps)
      ),
      this.state.showTab === 'timetable' && React.createElement(TimetableContainer, {
        stop: this.props.departureProps.stop,
        date: this.props.relay.variables.date,
        propsForStopPageActionBar: {
          printUrl: this.props.printUrl,
          startDate: this.props.initialDate,
          selectedDate: this.props.relay.variables.date,
          onDateChange: this.onDateChange
        }
      })
    );
  };

  return StopPageContentOptions;
}(React.Component);

StopPageContentOptions.propTypes = {
  printUrl: PropTypes.string,
  departureProps: PropTypes.shape({
    stop: PropTypes.shape({
      stoptimes: PropTypes.array
    }).isRequired
  }).isRequired,
  relay: PropTypes.shape({
    variables: PropTypes.shape({
      date: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  initialDate: PropTypes.string.isRequired,
  setDate: PropTypes.func.isRequired
};
StopPageContentOptions.defaultProps = {
  printUrl: null
};


var DepartureListContainerWithProps = mapProps(function (props) {
  return {
    stoptimes: props.stop.stoptimes,
    key: 'departures',
    className: 'stop-page momentum-scroll',
    routeLinks: true,
    infiniteScroll: true,
    isTerminal: !props.params.stopId,
    rowClasses: 'padding-normal border-bottom',
    currentTime: props.relay.variables.startTime
  };
})(DepartureListContainer);

var StopPageContent = getContext({ breakpoint: PropTypes.string.isRequired })(function (props) {
  return some(props.routes, 'fullscreenMap') && props.breakpoint !== 'large' ? null : React.createElement(StopPageContentOptions, {
    printUrl: props.stop.url,
    departureProps: props,
    relay: props.relay,
    initialDate: props.initialDate,
    setDate: props.setDate
  });
});

var StopPageContentOrEmpty = function StopPageContentOrEmpty(props) {
  if (props.stop) {
    return React.createElement(StopPageContent, props);
  }
  return React.createElement(Error404, null);
};

StopPageContentOrEmpty.propTypes = {
  stop: PropTypes.shape({
    url: PropTypes.string
  }).isRequired
};

export default Relay.createContainer(StopPageContentOrEmpty, {
  fragments: {
    stop: function stop(_ref2) {
      var date = _ref2.date;
      return function (RQL_0, RQL_1) {
        return {
          children: [].concat.apply([], [{
            fieldName: 'url',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            alias: 'stoptimes',
            calls: [{
              kind: 'Call',
              metadata: {
                type: 'Long'
              },
              name: 'startTime',
              value: {
                kind: 'CallVariable',
                callVariableName: 'startTime'
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
                kind: 'CallVariable',
                callVariableName: 'numberOfDepartures'
              }
            }],
            children: [].concat.apply([], [Relay.QL.__frag(RQL_0)]),
            fieldName: 'stoptimesWithoutPatterns',
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
          }, Relay.QL.__frag(RQL_1)]),
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'StopPageContentContainer_StopRelayQL',
          type: 'Stop'
        };
      }(DepartureListContainer.getFragment('stoptimes'), TimetableContainer.getFragment('stop', { date: date }));
    }
  },

  initialVariables: {
    startTime: 0,
    timeRange: 3600 * 12,
    numberOfDepartures: 100,
    date: null
  }
});