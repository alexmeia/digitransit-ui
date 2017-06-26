import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import padStart from 'lodash/padStart';
import FilterTimeTableModal from './FilterTimeTableModal';
import TimeTableOptionsPanel from './TimeTableOptionsPanel';
import TimetableRow from './TimetableRow';
import StopPageActionBar from './StopPageActionBar';
import ComponentUsageExample from './ComponentUsageExample';

var Timetable = function (_React$Component) {
  _inherits(Timetable, _React$Component);

  function Timetable(props) {
    _classCallCheck(this, Timetable);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.componentWillReceiveProps = function () {
      if (_this.props.stop.gtfsId !== _this.state.oldStopId) {
        _this.resetStopOptions(_this.props.stop.gtfsId);
      }
    };

    _this.setRouteVisibilityState = function (val) {
      _this.setState({ showRoutes: val.showRoutes });
    };

    _this.resetStopOptions = function (id) {
      _this.setState({ showRoutes: [], showFilterModal: false, oldStopId: id });
    };

    _this.showModal = function (val) {
      _this.setState({ showFilterModal: val });
    };

    _this.mapStopTimes = function (stoptimesObject) {
      return stoptimesObject.map(function (stoptime) {
        return stoptime.stoptimes.filter(function (st) {
          return st.pickupType !== 'NONE';
        }).map(function (st) {
          return {
            id: stoptime.pattern.code,
            name: stoptime.pattern.route.shortName || stoptime.pattern.route.agency.name,
            scheduledDeparture: st.scheduledDeparture,
            serviceDay: st.serviceDay
          };
        });
      }).reduce(function (acc, val) {
        return acc.concat(val);
      }, []);
    };

    _this.groupArrayByHour = function (stoptimesArray) {
      return groupBy(stoptimesArray, function (stoptime) {
        return Math.floor(stoptime.scheduledDeparture / (60 * 60));
      });
    };

    _this.setRouteVisibilityState = _this.setRouteVisibilityState.bind(_this);
    _this.state = {
      showRoutes: [],
      showFilterModal: false,
      oldStopId: _this.props.stop.gtfsId
    };
    return _this;
  }

  Timetable.prototype.render = function render() {
    var _this2 = this;

    var timetableMap = this.groupArrayByHour(this.mapStopTimes(this.props.stop.stoptimesForServiceDate));

    return React.createElement(
      'div',
      { style: { maxHeight: '100%', display: 'flex', flexDirection: 'column', flexGrow: '1' } },
      React.createElement(
        'div',
        { className: 'timetable', style: { display: 'flex', flexDirection: 'column', maxHeight: '100%', flexGrow: '1' } },
        this.state.showFilterModal === true ? React.createElement(FilterTimeTableModal, {
          stop: this.props.stop,
          setRoutes: this.setRouteVisibilityState,
          showFilterModal: this.showModal,
          showRoutesList: this.state.showRoutes
        }) : null,
        React.createElement(
          'div',
          { className: 'timetable-topbar' },
          React.createElement(TimeTableOptionsPanel, {
            showRoutes: this.state.showRoutes,
            showFilterModal: this.showModal,
            stop: this.props.stop
          }),
          React.createElement(StopPageActionBar, {
            printUrl: this.props.propsForStopPageActionBar.printUrl,
            startDate: this.props.propsForStopPageActionBar.startDate,
            selectedDate: this.props.propsForStopPageActionBar.selectedDate,
            onDateChange: this.props.propsForStopPageActionBar.onDateChange
          })
        ),
        React.createElement(
          'div',
          { className: 'momentum-scroll', style: { flex: '1' } },
          Object.keys(timetableMap).sort(function (a, b) {
            return a - b;
          }).map(function (hour) {
            return React.createElement(TimetableRow, {
              key: hour,
              title: padStart(hour % 24, 2, '0'),
              stoptimes: timetableMap[hour],
              showRoutes: _this2.state.showRoutes,
              timerows: timetableMap[hour].sort(function (time1, time2) {
                return time1.scheduledDeparture - time2.scheduledDeparture;
              }).map(function (time) {
                return _this2.state.showRoutes.filter(function (o) {
                  return o === time.name || o === time.id;
                }).length > 0 && moment.unix(time.serviceDay + time.scheduledDeparture).format('HH');
              }).filter(function (o) {
                return o === padStart(hour % 24, 2, '0');
              })
            });
          })
        )
      )
    );
  };

  return Timetable;
}(React.Component);

Timetable.propTypes = {
  stop: PropTypes.shape({
    url: PropTypes.string,
    gtfsId: PropTypes.string,
    stoptimesForServiceDate: PropTypes.arrayOf(PropTypes.shape({
      pattern: PropTypes.shape({
        route: PropTypes.shape({
          shortName: PropTypes.string,
          mode: PropTypes.string.isRequired,
          agency: PropTypes.shape({
            name: PropTypes.string.isRequired
          }).isRequired
        }).isRequired
      }).isRequired,
      stoptimes: PropTypes.arrayOf(PropTypes.shape({
        scheduledDeparture: PropTypes.number.isRequired,
        serviceDay: PropTypes.number.isRequired
      })).isRequired
    })).isRequired
  }).isRequired,
  propsForStopPageActionBar: PropTypes.shape({
    printUrl: PropTypes.string.isRequired,
    startDate: PropTypes.string,
    selectedDate: PropTypes.string,
    onDateChange: PropTypes.function
  }).isRequired
};


Timetable.displayName = 'Timetable';
var exampleStop = {
  gtfsId: '123124234',
  name: '1231213',
  url: '1231231',
  stoptimesForServiceDate: [{
    pattern: {
      headsign: 'Pornainen',
      route: {
        shortName: '787K',
        agency: {
          name: 'Helsingin seudun liikenne'
        },
        mode: 'BUS'
      }
    },
    stoptimes: [{
      scheduledDeparture: 60180,
      serviceDay: 1495659600
    }]
  }, {
    pattern: {
      route: {
        mode: 'BUS',
        agency: {
          name: 'Helsingin seudun liikenne'
        }
      }
    },
    stoptimes: [{
      scheduledDeparture: 61180,
      serviceDay: 1495659600
    }]
  }]
};

Timetable.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Renders a timetable'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: '' },
      React.createElement(Timetable, { stop: exampleStop, propsForStopPageActionBar: { printUrl: 'http://www.hsl.fi' } })
    )
  );
};

export default Timetable;