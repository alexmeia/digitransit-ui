import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import { VectorTile } from 'vector-tile';
import pick from 'lodash/pick';
import Protobuf from 'pbf';

import { drawIcon, getStopRadius } from '../../../util/mapIconUtils';

var TicketSales = function () {
  function TicketSales(tile, config) {
    _classCallCheck(this, TicketSales);

    this.tile = tile;
    this.config = config;

    this.scaleratio = typeof window !== 'undefined' && window.devicePixelRatio || 1;
    this.promise = this.getPromise();
  }

  TicketSales.prototype.getPromise = function getPromise() {
    var _this = this;

    return fetch('' + this.config.URL.TICKET_SALES_MAP + (this.tile.coords.z + (this.tile.props.zoomOffset || 0)) + ('/' + this.tile.coords.x + '/' + this.tile.coords.y + '.pbf')).then(function (res) {
      if (res.status !== 200) {
        return undefined;
      }

      return res.arrayBuffer().then(function (buf) {
        var vt = new VectorTile(new Protobuf(buf));

        _this.features = [];

        if (vt.layers['ticket-sales'] != null) {
          for (var i = 0, ref = vt.layers['ticket-sales'].length - 1; i <= ref; i++) {
            var feature = vt.layers['ticket-sales'].feature(i);
            feature.geom = feature.loadGeometry()[0][0];
            // Do not show VR ticket machines and ticket offices
            if (!feature.properties.TYYPPI.startsWith('VR')) {
              _this.features.push(pick(feature, ['geom', 'properties']));
              drawIcon(TicketSales.getIcon(feature.properties.TYYPPI), _this.tile, feature.geom, getStopRadius({ $zoom: _this.tile.coords.z }) * 2.5 * _this.scaleratio);
            }
          }
        }
      }, function (err) {
        return console.log(err);
      });
    });
  };

  return TicketSales;
}();

TicketSales.getName = function () {
  return 'ticketSales';
};

TicketSales.getIcon = function (type) {
  switch (type) {
    case 'Palvelupiste':
      return 'icon-icon_service-point';
    case 'HSL Automaatti MNL':
      return 'icon-icon_ticket-machine';
    case 'HSL Automaatti KL':
      return 'icon-icon_ticket-machine';
    case 'Myyntipiste':
      return 'icon-icon_ticket-sales-point';
    case 'R-kioski':
      return 'icon-icon_ticket-sales-point';
    default:
      console.log('Unknown ticket sales type: ' + type);
      return 'icon-icon_ticket-sales-point';
  }
};

export default TicketSales;