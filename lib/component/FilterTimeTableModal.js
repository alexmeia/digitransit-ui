import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import groupBy from 'lodash/groupBy';
import intersection from 'lodash/intersection';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import Icon from './Icon';

var FilterTimeTableModal = function (_React$Component) {
  _inherits(FilterTimeTableModal, _React$Component);

  function FilterTimeTableModal(props) {
    _classCallCheck(this, FilterTimeTableModal);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.toggleAllRoutes = function () {
      if (_this.state.allRoutes === true) {
        _this.setState({
          allRoutes: false
        });
        _this.updateParent({ showRoutes: [] });
      } else {
        _this.setState({
          allRoutes: true,
          showRoutes: []
        });
        _this.updateParent({ showRoutes: [] });
      }
    };

    _this.handleCheckbox = function (routesToAdd) {
      var oldHiddenRoutes = _this.state.showRoutes.length > 0 ? _this.state.showRoutes.slice() : [];
      var newVal = routesToAdd;
      if (oldHiddenRoutes.length > 0) {
        newVal = intersection(oldHiddenRoutes, routesToAdd).length === 0 ? oldHiddenRoutes.concat(routesToAdd) : oldHiddenRoutes.filter(function (o) {
          return routesToAdd.indexOf(o) < 0;
        });
      }
      if (newVal.length === 0) {
        _this.updateParent({ showRoutes: newVal, allRoutes: true });
        _this.setState({ showRoutes: newVal, allRoutes: true });
      } else {
        _this.updateParent({ showRoutes: newVal });
        _this.setState({ allRoutes: false, showRoutes: newVal });
      }
    };

    _this.constructRouteDivs = function (val) {
      var routeDivs = [];
      var LONG_LINE_NAME = 5;
      val.forEach(function (o) {
        return routeDivs.push(React.createElement(
          'div',
          {
            key: o.codes[0],
            className: 'route-row'
          },
          React.createElement(
            'div',
            { className: 'checkbox-container' },
            React.createElement('input', {
              type: 'checkbox',
              checked: intersection(_this.state.showRoutes, o.codes).length > 0,
              id: 'input-' + o.codes[0],
              onChange: function onChange() {
                return _this.handleCheckbox(o.codes);
              }
            }),
            React.createElement('label', { htmlFor: 'input-' + o.codes[0] })
          ),
          React.createElement(
            'div',
            { className: 'route-mode' },
            React.createElement(Icon, {
              className: o.mode.toLowerCase(),
              img: 'icon-icon_' + o.mode.toLowerCase()
            })
          ),
          React.createElement(
            'div',
            {
              className: 'route-number ' + o.mode.toLowerCase() + ' ' + cx({ 'overflow-fade': (o.shortName ? o.shortName : o.agency) && (o.shortName ? o.shortName : o.agency).length > LONG_LINE_NAME })
            },
            o.shortName ? o.shortName : o.agency
          ),
          React.createElement(
            'div',
            { className: 'route-headsign' },
            o.headsign
          )
        ));
      });
      return routeDivs;
    };

    _this.closeModal = function (e) {
      if (e.target === document.getElementById('stopmodal-relative-overlay')) {
        _this.props.showFilterModal(false);
      }
    };

    _this.constructRoutes = function () {
      var patternGroups = groupBy(_this.props.stop.stoptimesForServiceDate.map(function (a) {
        return a.pattern;
      }), function (pattern) {
        return JSON.stringify([pattern.headsign, pattern.route.shortName, pattern.route.mode, pattern.route.agency.name]);
      });

      var mappedGroups = Object.entries(patternGroups).map(function (_ref) {
        var key = _ref[0],
            group = _ref[1];
        return [JSON.parse(key), group.map(function (pattern) {
          return pattern.code;
        })];
      });
      var cleanedUpavailableRoutes = mappedGroups.map(function (o) {
        var obj = {};
        obj.headsign = o[0][0];
        obj.shortName = o[0][1];
        obj.mode = o[0][2];
        obj.agency = o[0][3];
        obj.codes = o[1];
        return obj;
      });

      return cleanedUpavailableRoutes;
    };

    _this.state = {
      showRoutes: _this.props.showRoutesList,
      allRoutes: _this.props.showRoutesList.length === 0 && true
    };
    return _this;
  }

  FilterTimeTableModal.prototype.updateParent = function updateParent(newOptions) {
    this.props.setRoutes({
      showRoutes: newOptions.showRoutes
    });
  };

  FilterTimeTableModal.prototype.render = function render() {
    var _this2 = this;

    // const availableRoutes = (
    //    this.props.stop.stoptimesForServiceDate).map(o => Object.assign(o.pattern),
    //    );
    var routes = this.constructRoutes();
    var routeList = this.constructRouteDivs(routes);
    return React.createElement(
      'div',
      null,
      React.createElement('div', { className: 'filter-stop-modal-overlay' }),
      React.createElement(
        'div',
        { className: 'filter-stop-modal-fixed-container', onClick: function onClick(e) {
            return _this2.closeModal(e);
          } },
        React.createElement(
          'div',
          { className: 'filter-stop-modal-relative-container', id: 'stopmodal-relative-overlay' },
          React.createElement(
            'div',
            { className: 'filter-stop-modal' },
            React.createElement(
              'div',
              { className: 'filter-stop-modal-return', id: 'stopmodal-return', onClick: function onClick() {
                  return _this2.props.showFilterModal(false);
                } },
              React.createElement(
                'div',
                { className: 'filter-stop-modal-return-icon' },
                React.createElement(Icon, {
                  img: 'icon-icon_arrow-left'
                })
              ),
              React.createElement(
                'div',
                { className: 'filter-stop-modal-return-header' },
                React.createElement(FormattedMessage, {
                  id: 'show-routes',
                  defaultMessage: 'Show Lines'
                })
              )
            ),
            React.createElement(
              'div',
              { className: 'all-routes-header' },
              React.createElement(
                'div',
                { className: 'checkbox-container' },
                React.createElement('input', {
                  type: 'checkbox',
                  id: 'input-all-routes',
                  checked: this.state.allRoutes,
                  onClick: function onClick(e) {
                    return _this2.state.allRoutes === true && e.preventDefault();
                  },
                  onChange: function onChange(e) {
                    _this2.toggleAllRoutes(e);
                  }
                }),
                React.createElement('label', { htmlFor: 'input-all-routes' })
              ),
              React.createElement(
                'div',
                { className: 'all-routes-header-title' },
                React.createElement(FormattedMessage, {
                  id: 'all-routes',
                  defaultMessage: 'All lines'
                })
              )
            ),
            React.createElement(
              'div',
              { className: 'routes-container' },
              routeList.length > 0 ? routeList : null
            )
          )
        )
      )
    );
  };

  return FilterTimeTableModal;
}(React.Component);

FilterTimeTableModal.propTypes = {
  stop: React.PropTypes.object,
  setRoutes: React.PropTypes.func,
  showFilterModal: React.PropTypes.func,
  showRoutesList: React.PropTypes.array
};


export default FilterTimeTableModal;