import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';

import RouteNumber from './RouteNumber';

var getText = function getText(route, config) {
  var showAgency = get(config, 'agency.show', false);
  if (route.shortName) {
    return route.shortName;
  } else if (showAgency && route.agency) {
    return route.agency.name;
  }
  return '';
};

var RouteNumberContainer = function RouteNumberContainer(_ref, _ref2) {
  var config = _ref2.config;

  var className = _ref.className,
      route = _ref.route,
      isCallAgency = _ref.isCallAgency,
      props = _objectWithoutProperties(_ref, ['className', 'route', 'isCallAgency']);

  return route && React.createElement(RouteNumber, _extends({
    className: className,
    isCallAgency: isCallAgency || route.type === 715,
    mode: route.mode,
    text: getText(route, config)
  }, props));
};

RouteNumberContainer.propTypes = {
  route: PropTypes.object.isRequired,
  vertical: PropTypes.bool,
  className: PropTypes.string,
  hasDisruption: PropTypes.bool,
  fadeLong: PropTypes.bool
};

RouteNumberContainer.defaultProps = {
  className: ''
};

RouteNumberContainer.contextTypes = {
  config: PropTypes.object.isRequired
};

RouteNumberContainer.displayName = 'RouteNumberContainer';
export default RouteNumberContainer;