import PropTypes from 'prop-types';
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage } from 'react-intl';
import { routerShape, locationShape } from 'react-router';

import { startLocationWatch } from '../action/PositionActions';
import PositionStore from '../store/PositionStore';
import Icon from './Icon';
import { setUseCurrent } from '../action/EndpointActions';
import Loading from './Loading';

var GeopositionSelector = function GeopositionSelector(_ref, context) {
  var origin = _ref.origin,
      status = _ref.status,
      searchModalIsOpen = _ref.searchModalIsOpen;

  /* States:
   * - locationing hasn't been started
   * . locationing in progress
   * . locationing denied
   * . locationing failed
   * - locationing succeeded
   */

  // sets origin to 'current locationä if search modal is not open
  if ((status === PositionStore.STATUS_FOUND_LOCATION || status === PositionStore.STATUS_FOUND_ADDRESS) && !searchModalIsOpen && !origin.userSetPosition && !origin.useCurrentPosition) {
    context.executeAction(setUseCurrent, {
      target: 'origin',
      keepSelectedLocation: true, // don't overwrite if user has already set a location
      router: context.router,
      location: context.location
    });
  }

  if (status === PositionStore.STATUS_NO_LOCATION) {
    return React.createElement(
      'div',
      { className: 'splash-locationing-button-container' },
      React.createElement(
        'button',
        { id: 'splash-locationing-button', className: 'noborder standalone-btn', tabIndex: '0', onClick: function onClick() {
            return context.executeAction(startLocationWatch);
          } },
        React.createElement(Icon, { className: 'icon-positioning', img: 'icon-icon_position' }),
        React.createElement(FormattedMessage, {
          id: 'splash-use-positioning',
          defaultMessage: 'Use location services'
        })
      )
    );
  } else if (status === PositionStore.STATUS_SEARCHING_LOCATION) {
    return React.createElement(
      'div',
      { id: 'geoposition-selector' },
      React.createElement(Loading, null),
      React.createElement(
        'div',
        { className: 'spinner-caption' },
        React.createElement(FormattedMessage, { id: 'splash-locating', defaultMessage: 'Detecting location' }),
        '\u2026'
      )
    );
  } else if (status === PositionStore.STATUS_GEOLOCATION_DENIED) {
    return React.createElement(
      'div',
      { id: 'splash-positioning-message' },
      React.createElement(FormattedMessage, {
        id: 'splash-geolocation-denied-message',
        defaultMessage: 'You have not enabled location services. You can enable location services in your browser or phone settings.'
      })
    );
  } else if (status === PositionStore.STATUS_GEOLOCATION_WATCH_TIMEOUT) {
    return React.createElement(
      'div',
      { id: 'splash-positioning-message' },
      React.createElement(FormattedMessage, {
        id: 'splash-geolocation-watch-timeout-message',
        defaultMessage: 'Detecting your location is taking longer than expected. Have you accepted your browser\u2019s request to access your location?'
      })
    );
  } else if (status === PositionStore.STATUS_GEOLOCATION_NOT_SUPPORTED) {
    return React.createElement(
      'div',
      { id: 'splash-positioning-message' },
      React.createElement(FormattedMessage, {
        id: 'splash-geolocation-not-supported-message',
        defaultMessage: 'Location services unavailable.'
      })
    );
  } else if (status === PositionStore.STATUS_GEOLOCATION_PROMPT) {
    return React.createElement(
      'div',
      { id: 'splash-positioning-message' },
      React.createElement(FormattedMessage, {
        id: 'splash-geolocation-prompt-message',
        defaultMessage: 'Accept your browser\u2019s request to access your location.'
      })
    );
  }
  return null;
};

GeopositionSelector.propTypes = {
  status: PropTypes.string.isRequired,
  searchModalIsOpen: PropTypes.bool.isRequired,
  origin: PropTypes.object
};

GeopositionSelector.contextTypes = {
  executeAction: PropTypes.func.isRequired,
  router: routerShape.isRequired,
  location: locationShape.isRequired
};

export default connectToStores(GeopositionSelector, ['PositionStore', 'EndpointStore'], function (context) {
  return { status: context.getStore('PositionStore').getLocationState().status,
    origin: context.getStore('EndpointStore').getOrigin() };
});