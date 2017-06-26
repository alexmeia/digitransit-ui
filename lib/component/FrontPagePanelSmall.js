import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FormattedMessage } from 'react-intl';
import Icon from './Icon';
import ComponentUsageExample from './ComponentUsageExample';
import NearbyTabLabel from './NearbyTabLabel';
import FavouritesTabLabelContainer from './FavouritesTabLabelContainer';

var FrontPagePanelSmall = function FrontPagePanelSmall(_ref) {
  var selectedPanel = _ref.selectedPanel,
      nearbyClicked = _ref.nearbyClicked,
      favouritesClicked = _ref.favouritesClicked,
      closePanel = _ref.closePanel,
      children = _ref.children;

  var heading = void 0;
  var tabClasses = ['hover'];
  var nearbyClasses = ['nearby-routes', 'h4'];
  var favouritesClasses = ['favourites', 'h4'];

  if (selectedPanel === 1) {
    heading = React.createElement(FormattedMessage, { id: 'near-you', defaultMessage: 'Near you' });
    nearbyClasses.push('selected');
  } else if (selectedPanel === 2) {
    heading = React.createElement(FormattedMessage, { id: 'your-favourites', defaultMessage: 'Your favourites' });
    favouritesClasses.push('selected');
  }

  var top = React.createElement(
    'div',
    { className: 'panel-top' },
    React.createElement(
      'div',
      { className: 'panel-heading' },
      React.createElement(
        'h2',
        null,
        heading
      )
    ),
    React.createElement(
      'div',
      { className: 'close-icon', onClick: closePanel },
      React.createElement(Icon, { img: 'icon-icon_close' })
    )
  );

  var content = selectedPanel ? React.createElement(
    'div',
    { className: 'frontpage-panel-wrapper', key: 'panel' },
    top,
    children
  ) : undefined;

  return React.createElement(
    'div',
    { className: 'frontpage-panel-container no-select' },
    React.createElement(
      ReactCSSTransitionGroup,
      {
        transitionName: 'frontpage-panel-wrapper',
        transitionEnterTimeout: 300,
        transitionLeaveTimeout: 300
      },
      content
    ),
    React.createElement(
      'ul',
      { className: 'tabs-row cursor-pointer' },
      React.createElement(NearbyTabLabel, {
        classes: cx(tabClasses, nearbyClasses),
        onClick: nearbyClicked
      }),
      React.createElement(FavouritesTabLabelContainer, {
        classes: cx(tabClasses, favouritesClasses),
        onClick: favouritesClicked
      })
    )
  );
};

var noop = function noop() {};

FrontPagePanelSmall.displayName = 'FrontPagePanelSmall';

FrontPagePanelSmall.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Front page tabs for small display.'
    ),
    React.createElement(
      ComponentUsageExample,
      { description: 'Front page tabs' },
      React.createElement(FrontPagePanelSmall, { closePanel: noop, favouritesClicked: noop, nearbyClicked: noop })
    )
  );
};

FrontPagePanelSmall.propTypes = {
  selectedPanel: PropTypes.number,
  nearbyClicked: PropTypes.func.isRequired,
  favouritesClicked: PropTypes.func.isRequired,
  closePanel: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default FrontPagePanelSmall;