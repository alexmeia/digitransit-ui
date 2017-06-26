import _extends from 'babel-runtime/helpers/extends';
import { locationToOTP } from '../util/otpStrings';
import { getRoutePath } from '../util/path';

// eslint-disable-next-line import/prefer-default-export
export function route(actionContext, payload, done) {
  var to = void 0;
  var from = void 0;
  var geoString = void 0;
  var geolocation = actionContext.getStore('PositionStore').getLocationState();
  var origin = actionContext.getStore('EndpointStore').getOrigin();
  var destination = actionContext.getStore('EndpointStore').getDestination();

  if ((origin.lat || origin.useCurrentPosition && geolocation.hasLocation) && (destination.lat || destination.useCurrentPosition && geolocation.hasLocation)) {
    geoString = locationToOTP(Object.assign({
      address: 'Oma sijainti'
    }, geolocation));

    if (origin.useCurrentPosition) {
      from = geoString;
    } else {
      from = locationToOTP(origin);
    }

    if (destination.useCurrentPosition) {
      to = geoString;
    } else {
      to = locationToOTP(destination);
    }

    var path = getRoutePath(from, to);
    if (payload && payload.router && payload.location) {
      // Checks if the user is making the first search from the
      // main page
      if (payload.location.pathname.indexOf('/reitti') === 0) {
        payload.router.replace(_extends({}, payload.location, {
          state: _extends({}, payload.location.state, {
            summaryPageSelected: 0
          }),
          pathname: path
        }));
      } else {
        // Will be ran when doing the first search from the main page
        payload.router.push(_extends({}, payload.location, { pathname: path }));
      }
    }
  }

  done();
}