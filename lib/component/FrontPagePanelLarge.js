import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import NearbyTabLabel from './NearbyTabLabel';
import FavouritesTabLabelContainer from './FavouritesTabLabelContainer';
import ComponentUsageExample from './ComponentUsageExample';

var FrontPagePanelLarge = function FrontPagePanelLarge(_ref) {
  var selectedPanel = _ref.selectedPanel,
      nearbyClicked = _ref.nearbyClicked,
      favouritesClicked = _ref.favouritesClicked,
      children = _ref.children;

  var tabClasses = ['bp-large', 'h4'];
  var nearbyClasses = ['nearby-routes'];
  var favouritesClasses = ['favourites'];

  if (selectedPanel === 1) {
    nearbyClasses.push('selected');
  } else {
    favouritesClasses.push('selected');
  }

  return React.createElement(
    'div',
    { className: 'fpcfloat no-select' },
    React.createElement(
      'ul',
      { className: 'tabs-row bp-large cursor-pointer' },
      React.createElement(NearbyTabLabel, {
        classes: cx(tabClasses, nearbyClasses),
        onClick: nearbyClicked
      }),
      React.createElement(FavouritesTabLabelContainer, {
        classes: cx(tabClasses, favouritesClasses),
        onClick: favouritesClicked
      })
    ),
    children
  );
};

var noop = function noop() {};

FrontPagePanelLarge.displayName = 'FrontPagePanelLarge';

FrontPagePanelLarge.description = function () {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'p',
      null,
      'Front page tabs for large display.'
    ),
    React.createElement(
      'div',
      { style: { width: '340px' } },
      React.createElement(
        ComponentUsageExample,
        { description: 'Front page tabs' },
        React.createElement(FrontPagePanelLarge, { selectedPanel: 2, nearbyClicked: noop, favouritesClicked: noop })
      )
    )
  );
};

FrontPagePanelLarge.propTypes = {
  selectedPanel: PropTypes.number.isRequired,
  nearbyClicked: PropTypes.func.isRequired,
  favouritesClicked: PropTypes.func.isRequired,
  children: PropTypes.node
};

FrontPagePanelLarge.defaultProps = {
  selectedPanel: 1
};

export default FrontPagePanelLarge;