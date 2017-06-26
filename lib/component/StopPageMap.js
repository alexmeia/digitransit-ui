import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay';
import some from 'lodash/some';

import Map from './map/Map';
import SelectedStopPopup from './map/popups/SelectedStopPopup';
import SelectedStopPopupContent from './SelectedStopPopupContent';
import Icon from './Icon';

var getFullscreenTogglePath = function getFullscreenTogglePath(fullscreenMap, params) {
  return '/' + (params.stopId ? 'pysakit' : 'terminaalit') + '/' + (params.stopId ? params.stopId : params.terminalId) + (fullscreenMap ? '' : '/kartta');
};

var toggleFullscreenMap = function toggleFullscreenMap(fullscreenMap, params, router) {
  if (fullscreenMap) {
    router.goBack();
    return;
  }
  router.push(getFullscreenTogglePath(fullscreenMap, params));
};

var fullscreenMapOverlay = function fullscreenMapOverlay(fullscreenMap, params, router) {
  return !fullscreenMap && React.createElement('div', {
    className: 'map-click-prevent-overlay',
    key: 'overlay',
    onClick: function onClick() {
      toggleFullscreenMap(fullscreenMap, params, router);
    }
  });
};

var fullscreenMapToggle = function fullscreenMapToggle(fullscreenMap, params, router) {
  return React.createElement(
    'div',
    { className: 'fullscreen-toggle', onClick: function onClick() {
        toggleFullscreenMap(fullscreenMap, params, router);
      } },
    React.createElement(Icon, { img: 'icon-icon_maximize', className: 'cursor-pointer' })
  );
};

var StopPageMap = function StopPageMap(_ref, _ref2) {
  var stop = _ref.stop,
      routes = _ref.routes,
      params = _ref.params;
  var breakpoint = _ref2.breakpoint,
      router = _ref2.router;

  if (!stop) return false;

  var fullscreenMap = some(routes, 'fullscreenMap');
  var leafletObjs = [];
  var children = [];

  if (breakpoint === 'large') {
    leafletObjs.push(React.createElement(
      SelectedStopPopup,
      { lat: stop.lat, lon: stop.lon, key: 'SelectedStopPopup' },
      React.createElement(SelectedStopPopupContent, { stop: stop })
    ));
  } else {
    children.push(fullscreenMapOverlay(fullscreenMap, params, router));
    children.push(fullscreenMapToggle(fullscreenMap, params, router));
  }

  var showScale = fullscreenMap || breakpoint === 'large';

  return React.createElement(
    Map,
    {
      className: 'full',
      lat: stop.lat,
      lon: stop.lon,
      zoom: !params.stopId || stop.platformCode ? 18 : 16,
      showStops: true,
      hilightedStops: [params.stopId],
      leafletObjs: leafletObjs,
      showScaleBar: showScale
    },
    children
  );
};

StopPageMap.contextTypes = {
  breakpoint: PropTypes.string.isRequired,
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired
};

StopPageMap.propTypes = {
  stop: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    platformCode: PropTypes.string
  }).isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({
    fullscreenMap: PropTypes.string
  }).isRequired).isRequired,
  params: PropTypes.oneOfType([PropTypes.shape({ stopId: PropTypes.string.isRequired }).isRequired, PropTypes.shape({ terminalId: PropTypes.string.isRequired }).isRequired]).isRequired
};

export default Relay.createContainer(StopPageMap, {
  fragments: {
    stop: function stop() {
      return function () {
        return {
          children: [{
            fieldName: 'lat',
            kind: 'Field',
            metadata: {},
            type: 'Float'
          }, {
            fieldName: 'lon',
            kind: 'Field',
            metadata: {},
            type: 'Float'
          }, {
            fieldName: 'platformCode',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'name',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'code',
            kind: 'Field',
            metadata: {},
            type: 'String'
          }, {
            fieldName: 'desc',
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
          id: Relay.QL.__id(),
          kind: 'Fragment',
          metadata: {},
          name: 'StopPageMap_StopRelayQL',
          type: 'Stop'
        };
      }();
    }
  }
});