import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import some from 'lodash/some';

import RouteListHeader from './RouteListHeader';
import RouteStopListContainer from './RouteStopListContainer';

var PatternStopsContainer = function (_React$Component) {
  _inherits(PatternStopsContainer, _React$Component);

  function PatternStopsContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, PatternStopsContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.toggleFullscreenMap = function () {
      if (some(_this.props.routes, function (route) {
        return route.fullscreenMap;
      })) {
        _this.context.router.goBack();
        return;
      }
      _this.context.router.push(_this.props.location.pathname + '/kartta');
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  PatternStopsContainer.prototype.render = function render() {
    if (!this.props.pattern) return false;

    if (some(this.props.routes, function (route) {
      return route.fullscreenMap;
    }) && this.context.breakpoint !== 'large') {
      return React.createElement('div', { className: 'route-page-content' });
    }

    return React.createElement(
      'div',
      { className: 'route-page-content' },
      React.createElement(RouteListHeader, {
        key: 'header',
        className: this.context.breakpoint === 'large' && 'bp-large'
      }),
      React.createElement(RouteStopListContainer, {
        key: 'list',
        pattern: this.props.pattern,
        patternId: this.props.pattern.code
      })
    );
  };

  return PatternStopsContainer;
}(React.Component);

PatternStopsContainer.propTypes = {
  pattern: PropTypes.shape({
    code: PropTypes.string.isRequired
  }).isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({
    fullscreenMap: PropTypes.bool
  }).isRequired).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};
PatternStopsContainer.contextTypes = {
  router: PropTypes.object.isRequired,
  breakpoint: PropTypes.string.isRequired
};


export default Relay.createContainer(PatternStopsContainer, {
  initialVariables: {
    patternId: null
  },
  fragments: {
    pattern: function pattern(_ref) {
      var patternId = _ref.patternId;
      return function (RQL_0) {
        return {
          children: [].concat.apply([], [{
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
          }, Relay.QL.__frag(RQL_0)]),
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'PatternStopsContainer_PatternRelayQL',
          type: 'Pattern'
        };
      }(RouteStopListContainer.getFragment('pattern', { patternId: patternId }));
    }
  }
});