import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Relay from 'react-relay';
import { routerShape, locationShape } from 'react-router';
import moment from 'moment';
import { intlShape } from 'react-intl';
import debounce from 'lodash/debounce';
import { route } from '../action/ItinerarySearchActions';

import TimeSelectors from './TimeSelectors';

var TimeSelectorContainer = function (_Component) {
  _inherits(TimeSelectorContainer, _Component);

  function TimeSelectorContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, TimeSelectorContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { time: _this.context.location.query.time ? moment.unix(_this.context.location.query.time) : moment(),
      arriveBy: _this.context.location.query.arriveBy === 'true',
      setTimefromProps: false
    }, _this.setArriveBy = function (_ref) {
      var target = _ref.target;
      return _this.setState({ arriveBy: target.value === 'true' }, function () {
        return _this.context.executeAction(route, {
          location: _extends({}, _this.context.location, {
            query: _extends({}, _this.context.location.query, {
              arriveBy: target.value
            })
          }),
          router: _this.context.router
        });
      });
    }, _this.dispatchChangedtime = debounce(function () {
      return _this.context.executeAction(route, {
        location: _extends({}, _this.context.location, {
          query: _extends({}, _this.context.location.query, {
            time: _this.state.time.unix(),
            arriveBy: _this.state.arriveBy
          })
        }),
        router: _this.context.router
      });
    }, 500), _this.changeTime = function (_ref2, callback) {
      var target = _ref2.target;
      return target.value ? _this.setState({
        time: moment(target.value + ' ' + _this.state.time.format('YYYY-MM-DD'), 'H:m YYYY-MM-DD'),
        setTimefromProps: false
      }, function () {
        if (typeof callback === 'function') {
          callback();
        }
        _this.dispatchChangedtime();
      }) : {};
    }, _this.changeDate = function (_ref3) {
      var target = _ref3.target;
      return _this.setState({
        time: moment(_this.state.time.format('H:m') + ' ' + target.value, 'H:m YYYY-MM-DD'),
        setTimefromProps: false
      }, _this.dispatchChangedtime);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  TimeSelectorContainer.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.context.router.listen(function (location) {
      if (location.query.time && Number(location.query.time) !== _this2.state.time.unix() && location.query.arriveBy === 'true' === _this2.state.arriveBy) {
        _this2.setState({ time: moment.unix(location.query.time) });
      } else if (location.query.arriveBy === 'true' !== _this2.state.arriveBy) {
        _this2.setState({ setTimefromProps: true });
      }
    });
  };

  TimeSelectorContainer.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    if (this.state.setTimefromProps && newProps.startTime && newProps.endTime) {
      this.setState({
        time: moment(this.state.arriveBy ? newProps.endTime : newProps.startTime),
        setTimefromProps: false
      });
    }
  };

  TimeSelectorContainer.prototype.getDates = function getDates() {
    var dates = [];
    var range = this.props.serviceTimeRange;
    var now = this.context.getStore('TimeStore').getCurrentTime();
    var MAXRANGE = 30; // limit day selection to sensible range ?
    var START = now.clone().subtract(MAXRANGE, 'd');
    var END = now.clone().add(MAXRANGE, 'd');
    var start = moment.unix(range.start);
    start = moment.min(moment.max(start, START), now); // always include today!
    var end = moment.unix(range.end);
    end = moment.max(moment.min(end, END), now); // always include today!
    var dayform = 'YYYY-MM-DD';
    var today = now.format(dayform);
    var tomorrow = now.add(1, 'd').format(dayform);
    var endValue = end.format(dayform);

    var value = void 0;
    var day = start;
    do {
      var label = void 0;
      value = day.format(dayform);
      if (value === today) {
        label = this.context.intl.formatMessage({ id: 'today', defaultMessage: 'Today' });
      } else if (value === tomorrow) {
        label = this.context.intl.formatMessage({ id: 'tomorrow', defaultMessage: 'Tomorrow' });
      } else {
        label = day.format('dd D.M');
      }
      dates.push(React.createElement(
        'option',
        { value: value, key: value },
        label
      ));
      day.add(1, 'd');
    } while (value !== endValue);

    return dates;
  };

  TimeSelectorContainer.prototype.render = function render() {
    return React.createElement(TimeSelectors, {
      arriveBy: this.state.arriveBy,
      time: this.state.time,
      setArriveBy: this.setArriveBy,
      changeTime: this.changeTime,
      changeDate: this.changeDate,
      dates: this.getDates()
    });
  };

  return TimeSelectorContainer;
}(Component);

TimeSelectorContainer.contextTypes = {
  intl: intlShape.isRequired,
  location: locationShape.isRequired,
  router: routerShape.isRequired,
  getStore: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired
};
TimeSelectorContainer.propTypes = {
  serviceTimeRange: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired
  }).isRequired
};


export default Relay.createContainer(TimeSelectorContainer, {
  fragments: {
    serviceTimeRange: function serviceTimeRange() {
      return function () {
        return {
          children: [{
            fieldName: 'start',
            kind: 'Field',
            metadata: {},
            type: 'Long'
          }, {
            fieldName: 'end',
            kind: 'Field',
            metadata: {},
            type: 'Long'
          }],
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'TimeSelectorContainer_ServiceTimeRangeRelayQL',
          type: 'serviceTimeRange'
        };
      }();
    }
  }
});