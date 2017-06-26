import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import { FormattedMessage, intlShape } from 'react-intl';
import cx from 'classnames';

import Icon from './Icon';
import CallAgencyWarning from './CallAgencyWarning';
import FavouriteRouteContainer from './FavouriteRouteContainer';
import RoutePatternSelect from './RoutePatternSelect';
import RouteAgencyInfo from './RouteAgencyInfo';
import RouteNumber from './RouteNumber';
import { startRealTimeClient, stopRealTimeClient } from '../action/realTimeClientAction';

var RoutePage = function (_React$Component) {
  _inherits(RoutePage, _React$Component);

  function RoutePage() {
    var _temp, _this, _ret;

    _classCallCheck(this, RoutePage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onPatternChange = function (e) {
      _this.context.router.replace(decodeURIComponent(_this.props.location.pathname).replace(new RegExp(_this.props.params.patternId + '(.*)'), e.target.value));
    }, _this.changeTab = function (path) {
      _this.context.router.replace(path);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  RoutePage.prototype.componentDidMount = function componentDidMount() {
    if (this.props.route == null) {
      return;
    }
    var route = this.props.route.gtfsId.split(':');

    if (route[0].toLowerCase() === 'hsl') {
      this.context.executeAction(startRealTimeClient, {
        route: route[1]
      });
    }
  };

  RoutePage.prototype.componentWillUnmount = function componentWillUnmount() {
    var _context$getStore = this.context.getStore('RealTimeInformationStore'),
        client = _context$getStore.client;

    if (client) {
      this.context.executeAction(stopRealTimeClient, client);
    }
  };

  RoutePage.prototype.render = function render() {
    var _this2 = this;

    if (this.props.route == null) {
      /* In this case there is little we can do
       * There is no point continuing rendering as it can only
       * confuse user. Therefore redirect to Routes page */
      this.props.history.replace('/linjat');
      return null;
    }

    var activeTab = void 0;
    if (this.props.location.pathname.indexOf('/pysakit/') > -1) {
      activeTab = 'pysakit';
    } else if (this.props.location.pathname.indexOf('/aikataulu/') > -1) {
      activeTab = 'aikataulu';
    } else if (this.props.location.pathname.indexOf('/hairiot') > -1) {
      activeTab = 'hairiot';
    }

    return React.createElement(
      'div',
      null,
      this.props.route.type === 715 && React.createElement(CallAgencyWarning, { route: this.props.route }),
      React.createElement(
        'div',
        { className: 'tabs route-tabs' },
        React.createElement(
          'nav',
          { className: cx('tabs-navigation', { 'bp-large': this.context.breakpoint === 'large' }) },
          this.context.breakpoint === 'large' && React.createElement(RouteNumber, { mode: this.props.route.mode, text: this.props.route.shortName }),
          React.createElement(
            'a',
            {
              className: cx({ 'is-active': activeTab === 'pysakit' }),
              onClick: function onClick() {
                _this2.changeTab('/linjat/' + _this2.props.route.gtfsId + '/pysakit/' + (_this2.props.params.patternId || ''));
              }
            },
            React.createElement(
              'div',
              null,
              React.createElement(Icon, { img: 'icon-icon_bus-stop' }),
              React.createElement(FormattedMessage, { id: 'stops', defaultMessage: 'Stops' })
            )
          ),
          React.createElement(
            'a',
            {
              className: cx({ 'is-active': activeTab === 'aikataulu' }),
              onClick: function onClick() {
                _this2.changeTab('/linjat/' + _this2.props.route.gtfsId + '/aikataulu/' + (_this2.props.params.patternId || ''));
              }
            },
            React.createElement(
              'div',
              null,
              React.createElement(Icon, { img: 'icon-icon_schedule' }),
              React.createElement(FormattedMessage, { id: 'timetable', defaultMessage: 'Timetable' })
            )
          ),
          React.createElement(
            'a',
            {
              className: cx({
                activeAlert: this.props.route.alerts && this.props.route.alerts.length > 0,
                'is-active': activeTab === 'hairiot'
              }),
              onClick: function onClick() {
                _this2.changeTab('/linjat/' + _this2.props.route.gtfsId + '/hairiot');
              }
            },
            React.createElement(
              'div',
              null,
              React.createElement(Icon, { img: 'icon-icon_caution' }),
              React.createElement(FormattedMessage, { id: 'disruptions', defaultMessage: 'Disruptions' })
            )
          ),
          React.createElement(FavouriteRouteContainer, {
            className: 'route-page-header',
            gtfsId: this.props.route.gtfsId
          })
        ),
        this.props.params.patternId && React.createElement(RoutePatternSelect, {
          params: this.props.params,
          route: this.props.route,
          onSelectChange: this.onPatternChange,
          className: cx({ 'bp-large': this.context.breakpoint === 'large' })
        }),
        React.createElement(RouteAgencyInfo, { route: this.props.route })
      )
    );
  };

  return RoutePage;
}(React.Component);

RoutePage.contextTypes = {
  getStore: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired
  }).isRequired,
  intl: intlShape.isRequired,
  breakpoint: PropTypes.string
};
RoutePage.propTypes = {
  history: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  params: PropTypes.shape({
    patternId: PropTypes.string.isRequired
  }).isRequired
};


export default Relay.createContainer(RoutePage, {
  fragments: {
    route: function route() {
      return function (RQL_0, RQL_1) {
        return {
          children: [].concat.apply([], [{
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
            fieldName: 'type',
            kind: 'Field',
            metadata: {},
            type: 'Int'
          }, {
            children: [{
              fieldName: 'id',
              kind: 'Field',
              metadata: {
                isGenerated: true,
                isRequisite: true
              },
              type: 'ID'
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
              fieldName: 'phone',
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
          }, Relay.QL.__frag(RQL_0), Relay.QL.__frag(RQL_1)]),
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'RoutePage_RouteRelayQL',
          type: 'Route'
        };
      }(RouteAgencyInfo.getFragment('route'), RoutePatternSelect.getFragment('route'));
    }
  }
});