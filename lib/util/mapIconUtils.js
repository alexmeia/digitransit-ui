import memoize from 'lodash/memoize';
import glfun from 'mapbox-gl-function';
import getSelector from './get-selector';

var FONT_SIZE = 11;

export var getCaseRadius = memoize(glfun({
  type: 'exponential',
  base: 1.15,
  domain: [11.9, 12, 22],
  range: [0, 1.5, 26]
}), function (_ref) {
  var $zoom = _ref.$zoom;
  return $zoom;
});

export var getStopRadius = memoize(glfun({
  type: 'exponential',
  base: 1.15,
  domain: [11.9, 12, 22],
  range: [0, 1, 24]
}), function (_ref2) {
  var $zoom = _ref2.$zoom;
  return $zoom;
});

export var getHubRadius = memoize(glfun({
  type: 'exponential',
  base: 1.15,
  domain: [14, 14.1, 22],
  range: [0, 2, 20]
}), function (_ref3) {
  var $zoom = _ref3.$zoom;
  return $zoom;
});

export var getColor = memoize(function (mode) {
  var cssRule = mode && getSelector('.' + mode.toLowerCase());
  return cssRule && cssRule.style.color;
});

function getImageFromSpriteSync(icon, width, height, fill) {
  if (!document) {
    return null;
  }
  var symbol = document.getElementById(icon);
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  var vb = symbol.viewBox.baseVal;
  svg.setAttribute('viewBox', vb.x + ' ' + vb.y + ' ' + vb.width + ' ' + vb.height);
  if (fill) svg.setAttribute('fill', fill);
  // TODO: Simplify after https://github.com/Financial-Times/polyfill-service/pull/722 is merged
  Array.prototype.forEach.call(symbol.childNodes, function (node) {
    var child = node.cloneNode(true);
    if (node.style && !child.attributes.fill) {
      child.style.fill = window.getComputedStyle(node).color;
    }
    svg.appendChild(child);
  });
  var image = new Image(width, height);
  image.src = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(svg));
  return image;
}

function getImageFromSpriteAsync(icon, width, height, fill) {
  return new Promise(function (resolve) {
    // TODO: check that icon exists using MutationObserver
    var image = getImageFromSpriteSync(icon, width, height, fill);
    image.onload = function () {
      return resolve(image);
    };
  });
}

var getImageFromSpriteCache = memoize(getImageFromSpriteAsync, function (icon, w, h, fill) {
  return icon + '_' + w + '_' + h + '_' + fill;
});

function drawIconImage(image, tile, geom, width, height) {
  tile.ctx.drawImage(image, geom.x / tile.ratio - width / 2, geom.y / tile.ratio - height / 2);
}

function calculateIconBadgePosition(coord, tile, imageSize, badgeSize, scaleratio) {
  return coord / tile.ratio - imageSize / 2 - badgeSize / 2 + 2 * scaleratio;
}

function drawIconImageBadge(image, tile, geom, imageSize, badgeSize, scaleratio) {
  tile.ctx.drawImage(image, calculateIconBadgePosition(geom.x, tile, imageSize, badgeSize, scaleratio), calculateIconBadgePosition(geom.y, tile, imageSize, badgeSize, scaleratio));
}

/* eslint-disable no-param-reassign */
export function drawRoundIcon(tile, geom, type, large, platformNumber) {
  var scale = large ? 2 : 1;
  var caseRadius = getCaseRadius({ $zoom: tile.coords.z }) * scale;
  var stopRadius = getStopRadius({ $zoom: tile.coords.z }) * scale;
  var hubRadius = getHubRadius({ $zoom: tile.coords.z }) * scale;

  if (caseRadius > 0) {
    tile.ctx.beginPath();
    tile.ctx.fillStyle = '#fff';
    tile.ctx.arc(geom.x / tile.ratio, geom.y / tile.ratio, caseRadius * tile.scaleratio, 0, Math.PI * 2);
    tile.ctx.fill();

    tile.ctx.beginPath();
    tile.ctx.fillStyle = getColor(type);
    tile.ctx.arc(geom.x / tile.ratio, geom.y / tile.ratio, stopRadius * tile.scaleratio, 0, Math.PI * 2);
    tile.ctx.fill();

    if (hubRadius > 0) {
      tile.ctx.beginPath();
      tile.ctx.fillStyle = '#fff';
      tile.ctx.arc(geom.x / tile.ratio, geom.y / tile.ratio, hubRadius * tile.scaleratio, 0, Math.PI * 2);
      tile.ctx.fill();

      // The text requires 14 pixels in width, so we draw if the hub radius is at least half of that
      if (platformNumber && hubRadius > 7) {
        tile.ctx.font = 1.2 * hubRadius * tile.scaleratio + 'px Gotham XNarrow SSm A, Gotham XNarrow SSm B, Arial, sans-serif';
        tile.ctx.fillStyle = '#333';
        tile.ctx.textAlign = 'center';
        tile.ctx.textBaseline = 'middle';
        tile.ctx.fillText(platformNumber, geom.x / tile.ratio, geom.y / tile.ratio);
      }
    }
  }
}

export function drawTerminalIcon(tile, geom, type, name) {
  var iconSize = (getStopRadius({ $zoom: tile.coords.z }) * 2.5 + 8) * tile.scaleratio;
  getImageFromSpriteCache('icon-icon_' + type.toLowerCase(), iconSize, iconSize).then(function (image) {
    tile.ctx.drawImage(image, geom.x / tile.ratio - iconSize / 2, geom.y / tile.ratio - iconSize / 2);

    if (name) {
      /* eslint-disable no-param-reassign */
      tile.ctx.fillStyle = '#333';
      tile.ctx.strokeStyle = 'white';
      tile.ctx.lineWidth = 2 * tile.scaleratio;
      tile.ctx.textAlign = 'center';
      tile.ctx.textBaseline = 'top';
      tile.ctx.font = '500 ' + FONT_SIZE * tile.scaleratio + 'px\n          Gotham Rounded SSm A, Gotham Rounded SSm B, Arial, Georgia, Serif';
      var y = iconSize / 2 + 2 * tile.scaleratio;
      name.split(' ').forEach(function (part) {
        tile.ctx.strokeText(part, geom.x / tile.ratio, geom.y / tile.ratio + y);
        tile.ctx.fillText(part, geom.x / tile.ratio, geom.y / tile.ratio + y);
        y += (FONT_SIZE + 2) * tile.scaleratio;
      });
    }
  });
}

export function drawParkAndRideIcon(tile, geom, width, height) {
  getImageFromSpriteCache('icon-icon_park-and-ride', width, height).then(function (image) {
    drawIconImage(image, tile, geom, width, height);
  });
}

export function drawCitybikeIcon(tile, geom, imageSize) {
  getImageFromSpriteCache('icon-icon_citybike', imageSize, imageSize).then(function (image) {
    drawIconImage(image, tile, geom, imageSize, imageSize);
  });
}

export function drawCitybikeNotInUseIcon(tile, geom, imageSize) {
  getImageFromSpriteCache('icon-icon_not-in-use', imageSize, imageSize).then(function (image) {
    drawIconImage(image, tile, geom, imageSize, imageSize);
  });
}

export function drawAvailabilityBadge(availability, tile, geom, imageSize, badgeSize, scaleratio) {
  if (availability !== 'good' && availability !== 'poor' && availability !== 'no') {
    throw Error("Supported badges are 'good', 'poor', and 'no'");
  }

  getImageFromSpriteCache('icon-icon_' + availability + '-availability', badgeSize, badgeSize).then(function (image) {
    drawIconImageBadge(image, tile, geom, imageSize, badgeSize, scaleratio);
  });
}

export function drawIcon(icon, tile, geom, imageSize) {
  getImageFromSpriteCache(icon, imageSize, imageSize).then(function (image) {
    drawIconImage(image, tile, geom, imageSize, imageSize);
  });
}