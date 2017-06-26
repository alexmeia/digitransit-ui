import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import PropTypes from 'prop-types';
import React from 'react';
import { routerShape } from 'react-router';
import getContext from 'recompose/getContext';
import AppBarSmall from './AppBarSmall';
import AppBarLarge from './AppBarLarge';

var AppBarContainer = function AppBarContainer(_ref) {
  var breakpoint = _ref.breakpoint,
      router = _ref.router,
      args = _objectWithoutProperties(_ref, ['breakpoint', 'router']);

  return breakpoint !== 'large' && React.createElement(AppBarSmall, _extends({}, args, { showLogo: router.isActive('/') })) || React.createElement(AppBarLarge, _extends({}, args, { titleClicked: function titleClicked() {
      return router.push('/lahellasi');
    }
  }));
};

var WithContext = getContext({ router: routerShape.isRequired,
  breakpoint: PropTypes.string.isRequired })(AppBarContainer);

WithContext.propTypes = {
  disableBackButton: PropTypes.bool,
  title: PropTypes.node
};

export default WithContext;