import _extends from 'babel-runtime/helpers/extends';
import { routerShape, locationShape } from 'react-router';

import mapProps from 'recompose/mapProps';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';

import without from 'lodash/without';

import ViaPointBar from './ViaPointBar';

var getRouterContext = getContext({
  router: routerShape.isRequired,
  location: locationShape.isRequired
});

var mapFunctions = mapProps(function (_ref) {
  var className = _ref.className,
      router = _ref.router,
      location = _ref.location;
  return {
    className: className,
    removeViaPoint: function removeViaPoint() {
      return router.replace(_extends({}, location, {
        query: without(location.query, 'intermediatePlaces')
      }));
    },
    openSearchModal: function openSearchModal() {
      return router.push(_extends({}, location, {
        state: _extends({}, location.state, {
          viaPointSearchModalOpen: 1,
          customizeSearchOffcanvas: true
        })
      }));
    },
    intermediatePlaces: location.query && location.query.intermediatePlaces
  };
});

var ViaPointBarContainer = compose(getRouterContext, mapFunctions)(ViaPointBar);

export default ViaPointBarContainer;