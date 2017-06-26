import PropTypes from 'prop-types';
import React from 'react';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs';
import uniq from 'lodash/uniq';
import cx from 'classnames';

import routeCompare from '../util/route-compare';
import RouteNumber from './RouteNumber';

function RouteList(props) {
  var routeObjs = toPairs(groupBy(props.routes, function (route) {
    return route.mode.toLowerCase();
  })).map(function (_ref) {
    var mode = _ref[0],
        routes = _ref[1];
    return React.createElement(
      'div',
      { key: mode, className: mode },
      React.createElement(RouteNumber, {
        mode: mode,
        text: ' ' + uniq(routes.sort(routeCompare).filter(function (route) {
          return route.shortName;
        }).map(function (route) {
          return route.shortName;
        })).join(', ')
      })
    );
  });

  return React.createElement(
    'div',
    { className: cx('route-list', props.className) },
    routeObjs
  );
}

RouteList.propTypes = {
  className: PropTypes.string,
  routes: PropTypes.shape({
    mode: PropTypes.string.isRequired,
    shortName: PropTypes.string
  }).isRequired
};

export default RouteList;