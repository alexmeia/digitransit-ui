import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import uniqBy from 'lodash/uniqBy';
import Icon from './Icon';

var TimeTableOptionsPanel = function (_React$Component) {
  _inherits(TimeTableOptionsPanel, _React$Component);

  function TimeTableOptionsPanel(props) {
    _classCallCheck(this, TimeTableOptionsPanel);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.getRouteNames = function (routes) {
      var arr = [];
      _this.props.stop.stoptimesForServiceDate.forEach(function (o) {
        if (routes.filter(function (v) {
          return v === o.pattern.code;
        }).length > 0) {
          arr.push({
            id: o.pattern.code,
            shortName: o.pattern.route.shortName,
            agencyName: o.pattern.route.agency.name
          });
        }
      });
      return uniqBy(arr, function (key) {
        return key.shortName === null ? key.agencyName : key.shortName;
      });
    };

    _this.state = {
      showRoutes: []
    };
    return _this;
  }

  TimeTableOptionsPanel.prototype.render = function render() {
    var _this2 = this;

    var routeNames = this.getRouteNames(this.props.showRoutes);
    var showRoutesDiv = routeNames.map(function (o) {
      return React.createElement(
        'div',
        { key: o.id, className: 'showroute-number' },
        o.shortName ? o.shortName : o.agencyName
      );
    });
    var stopVehicle = this.props.stop.stoptimesForServiceDate[0].pattern.route.mode.toLowerCase();
    return React.createElement(
      'div',
      { className: 'timetable-options-panel' },
      React.createElement(
        'div',
        { className: 'timetable-showroutes' },
        React.createElement(
          'div',
          { className: 'showroutes-icon' },
          React.createElement(Icon, {
            img: 'icon-icon_' + stopVehicle,
            className: 'showroutes-icon-svg'
          })
        ),
        React.createElement(
          'div',
          { className: 'showroutes-header', onClick: function onClick() {
              return _this2.props.showFilterModal(true);
            } },
          React.createElement(FormattedMessage, {
            id: 'show-routes',
            defaultMessage: 'Show Lines'
          })
        ),
        React.createElement(
          'div',
          { className: 'showroutes-list' },
          showRoutesDiv.length > 0 && showRoutesDiv,
          showRoutesDiv.length === 0 && React.createElement(FormattedMessage, {
            id: 'all-routes',
            defaultMessage: 'All Lines'
          })
        )
      )
    );
  };

  return TimeTableOptionsPanel;
}(React.Component);

TimeTableOptionsPanel.propTypes = {
  stop: React.PropTypes.object,
  showRoutes: React.PropTypes.array,
  showFilterModal: React.PropTypes.func
};


export default TimeTableOptionsPanel;