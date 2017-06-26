import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import unzip from 'lodash/unzip';
import { isBrowser, isImperial } from './browser';

/* eslint-disable global-require */
var L = isBrowser ? require('leaflet') : null;
/* eslint-enable global-require */

function toRad(deg) {
  return deg * (Math.PI / 180);
}

function toDeg(rad) {
  return rad * (180 / Math.PI);
}

export function getBearing(lat1, lng1, lat2, lng2) {
  var lonScale = Math.cos(toRad((lat1 + lat2) / 2));
  var dy = lat2 - lat1;
  var dx = (lng2 - lng1) * lonScale;
  return (toDeg(Math.atan2(dx, dy)) + 360) % 360;
}

export function getLatLng(lat, lon) {
  return new L.LatLng(lat, lon);
}

export function getDistanceToNearestStop(lat, lon, stops) {
  var myPos = new L.LatLng(lat, lon);
  var minDist = Number.MAX_VALUE;
  var minStop = null;

  stops.forEach(function (stop) {
    var stopPos = new L.LatLng(stop.lat, stop.lon);
    var distance = myPos.distanceTo(stopPos);

    if (distance < minDist) {
      minDist = distance;
      minStop = stop;
    }
  });

  return { stop: minStop, distance: minDist };
}

export function getDistanceToFurthestStop(coordinates, stops) {
  return stops.map(function (stop) {
    return {
      stop: stop,
      distance: coordinates.distanceTo(new L.LatLng(stop.lat, stop.lon))
    };
  }).reduce(function (previous, current) {
    return current.distance > previous.distance ? current : previous;
  }, { stop: null, distance: 0 });
}

export function displayImperialDistance(meters) {
  var feet = meters * 3.2808399;

  /* eslint-disable yoda */

  if (feet < 100) {
    return Math.round(feet / 10) * 10 + ' ft'; // Tens of feet
  } else if (feet < 1000) {
    return Math.round(feet / 50) * 50 + ' ft'; // fifty feet
  }
  return Math.round(feet / 528) / 10 + ' mi'; // tenth of a mile
}

export function displayDistance(meters, config) {
  if (isImperial(config)) {
    return displayImperialDistance(meters);
  }
  if (meters < 100) {
    return Math.round(meters / 10) * 10 + ' m'; // Tens of meters
  } else if (meters < 1000) {
    return Math.round(meters / 50) * 50 + ' m'; // fifty meters
  } else if (meters < 10000) {
    return Math.round(meters / 100) * 100 / 1000 + ' km'; // hudreds of meters
  } else if (meters < 100000) {
    return Math.round(meters / 1000) + ' km'; // kilometers
  }
  return Math.round(meters / 10000) * 10 + ' km'; // tens of kilometers
}

/* eslint-enable yoda */

// Return the bounding box of a latlon array of length > 0
// If the box is smaller than 0.002x0.002, add padding
export function boundWithMinimumArea(points) {
  if (!points || !points[0]) {
    return null;
  }

  var _unzip = unzip(points.filter(function (_ref) {
    var lat = _ref[0],
        lon = _ref[1];
    return !isNaN(lat) && !isNaN(lon);
  })),
      lats = _unzip[0],
      lons = _unzip[1];

  var minlat = Math.min.apply(Math, lats);
  var minlon = Math.min.apply(Math, lons);
  var maxlat = Math.max.apply(Math, lats);
  var maxlon = Math.max.apply(Math, lons);
  var missingHeight = Math.max(0, 0.002 - (maxlat - minlat));
  var missingWidth = Math.max(0, 0.002 - (maxlon - minlon));
  return [[minlat - missingHeight / 2, minlon - missingWidth / 2], [maxlat + missingHeight / 2, maxlon + missingWidth / 2]];
}

function getLengthOf(geometry) {
  var d = 0;

  for (var i = 0; i < geometry.length - 1; ++i) {
    var dlat = geometry[i + 1][0] - geometry[i][0];
    var dlon = geometry[i + 1][1] - geometry[i][1];
    d += Math.sqrt(dlat * dlat + dlon * dlon);
  }

  return d;
}

function getMiddleIndexOf(geometry) {
  var middleIndex = 0;
  var distanceSoFar = 0;
  var distanceToHalf = getLengthOf(geometry) * 0.5;

  for (var i = 0; i < geometry.length - 1; ++i) {
    var dlat = geometry[i + 1][0] - geometry[i][0];
    var dlon = geometry[i + 1][1] - geometry[i][1];
    distanceSoFar += Math.sqrt(dlat * dlat + dlon * dlon);
    if (distanceSoFar >= distanceToHalf) {
      middleIndex = i;
      break;
    }
  }
  return middleIndex;
}

export function getMiddleOf(geometry) {
  if (geometry.length <= 0) return { lat: 0, lon: 0 };
  if (geometry.length === 1) return { lat: geometry[0][0], lon: geometry[0][1] };

  var i = Math.max(1, getMiddleIndexOf(geometry));

  return {
    lat: geometry[i - 1][0] + 0.5 * (geometry[i][0] - geometry[i - 1][0]),
    lon: geometry[i - 1][1] + 0.5 * (geometry[i][1] - geometry[i - 1][1])
  };
}

// Sourced from http://paulbourke.net/geometry/polygonmesh/javascript.txt
export var Contour = function () {
  function Contour(pts) {
    _classCallCheck(this, Contour);

    this.pts = pts;
  }

  Contour.prototype.area = function area() {
    var area = 0;
    var pts = this.pts;
    var nPts = pts.length;
    var j = nPts - 1;
    var p1 = void 0;
    var p2 = void 0;

    for (var i = 0; i < nPts; j = i++) {
      // eslint-disable-line no-plusplus
      p1 = pts[i];p2 = pts[j];
      area += p1.x * p2.y;
      area -= p1.y * p2.x;
    }
    area /= 2;
    return area;
  };

  Contour.prototype.centroid = function centroid() {
    var pts = this.pts;
    var nPts = pts.length;
    var x = 0;
    var y = 0;
    var f = void 0;
    var j = nPts - 1;
    var p1 = void 0;
    var p2 = void 0;

    for (var i = 0; i < nPts; j = i++) {
      // eslint-disable-line no-plusplus
      p1 = pts[i];p2 = pts[j];
      f = p1.x * p2.y - p2.x * p1.y;
      x += (p1.x + p2.x) * f;
      y += (p1.y + p2.y) * f;
    }

    f = this.area() * 6;
    return { x: x / f, y: y / f };
  };

  return Contour;
}();