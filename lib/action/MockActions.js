/* eslint-disable import/prefer-default-export */

import range from 'lodash/range';

import { geolocatonCallback } from './PositionActions';

var follow = false;

export function createMock(actionContext, payload, done) {
  window.mock = { data: {} };

  window.mock.data.position = {
    coords: {
      latitude: 60.1992,
      longitude: 24.9402,
      heading: 0
    }
  };

  window.mock.geolocation = {
    demo: function demo() {
      var from = window.mock.data.position.coords;

      var to = {
        latitude: 60.1716,
        longitude: 24.9406
      };

      var steps = 180;
      var track = range(steps).map(function (i) {
        var f = i / steps;
        var variation = Math.random() * 0.0001 - 0.00005;
        var lat = f * to.latitude + (1 - f) * from.latitude + variation;
        var lon = f * to.longitude + (1 - f) * from.longitude + variation;

        return {
          latitude: lat,
          longitude: lon
        };
      });

      follow = {
        track: track,
        index: 0,
        interval: setInterval(window.mock.geolocation.followTrack, 1000)
      };
    },
    followTrack: function followTrack() {
      var position = void 0;
      var i = follow.index || 0;

      if (follow.track && i < follow.track.length) {
        position = follow.track[i];
        follow.index += 1;
        window.mock.geolocation.setCurrentPosition(position.latitude, position.longitude);
      } else {
        clearInterval(follow.interval);
        follow = false;
      }
    },


    move: function move(dlat, dlon, heading) {
      window.mock.data.position.coords.latitude += dlat;
      window.mock.data.position.coords.longitude += dlon;

      if (heading) {
        window.mock.data.position.coords.heading = heading;
      }

      window.mock.geolocation.notify();
    },

    setCurrentPosition: function setCurrentPosition(lat, lon, heading, disableDebounce) {
      window.mock.data.position.coords.latitude = lat;
      window.mock.data.position.coords.longitude = lon;

      if (heading) {
        window.mock.data.position.coords.heading = heading;
      }

      window.mock.geolocation.notify(disableDebounce);
    },

    notify: function notify(disableDebounce, notifyDone) {
      return actionContext.executeAction(geolocatonCallback, { pos: window.mock.data.position, disableDebounce: disableDebounce }, notifyDone);
    }
  };

  window.mock.geolocation.notify(true, done);
}