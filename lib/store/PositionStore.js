import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Store from 'fluxible/addons/BaseStore';
import { getPositioningHasSucceeded, setPositioningHasSucceeded } from './localStorage';

var PositionStore = function (_Store) {
  _inherits(PositionStore, _Store);

  function PositionStore(dispatcher) {
    _classCallCheck(this, PositionStore);

    var _this = _possibleConstructorReturn(this, _Store.call(this, dispatcher));

    _this.hasStatusChanged = function (hasLocation) {
      return hasLocation !== _this.getLocationState().hasLocation;
    };

    _this.getWatchId = function () {
      return _this.watchId;
    };

    _this.removeLocation();
    _this.positioningHasSucceeded = getPositioningHasSucceeded();
    return _this;
  }

  PositionStore.prototype.removeLocation = function removeLocation() {
    this.lat = 0;
    this.lon = 0;
    this.heading = null;
    this.address = '';
    this.status = PositionStore.STATUS_NO_LOCATION;
    this.emitChange();
  };

  PositionStore.prototype.geolocationSearch = function geolocationSearch() {
    this.status = PositionStore.STATUS_SEARCHING_LOCATION;
    this.address = '';
    this.emitChange();
  };

  PositionStore.prototype.geolocationNotSupported = function geolocationNotSupported() {
    this.status = PositionStore.STATUS_GEOLOCATION_NOT_SUPPORTED;
    this.emitChange();
  };

  PositionStore.prototype.geolocationDenied = function geolocationDenied() {
    this.status = PositionStore.STATUS_GEOLOCATION_DENIED;
    this.emitChange();
  };

  PositionStore.prototype.geolocationTimeout = function geolocationTimeout() {
    this.status = PositionStore.STATUS_GEOLOCATION_TIMEOUT;
    this.emitChange();
  };

  PositionStore.prototype.geolocationWatchTimeout = function geolocationWatchTimeout() {
    this.status = PositionStore.STATUS_GEOLOCATION_WATCH_TIMEOUT;
    this.emitChange();
  };

  PositionStore.prototype.geolocationPrompt = function geolocationPrompt() {
    this.status = PositionStore.STATUS_GEOLOCATION_PROMPT;
    this.emitChange();
  };

  PositionStore.prototype.storeLocation = function storeLocation(location) {
    if (!this.positioningHasSucceeded) {
      setPositioningHasSucceeded(true);
      this.positioningHasSucceeded = true;
    }

    var statusChanged = this.hasStatusChanged(true);

    if (location && location.disableFiltering !== true) {
      this.lat = this.lat !== 0 ? (this.lat + location.lat) / 2 : location.lat;
      this.lon = this.lon !== 0 ? (this.lon + location.lon) / 2 : location.lon;
    } else {
      this.lat = location.lat;
      this.lon = location.lon;
    }

    this.heading = location.heading ? location.heading : this.heading;
    this.status = PositionStore.STATUS_FOUND_LOCATION;

    this.emitChange({
      statusChanged: statusChanged
    });
  };

  PositionStore.prototype.storeAddress = function storeAddress(location) {
    this.address = location.address + ', ' + location.city;
    this.status = PositionStore.STATUS_FOUND_ADDRESS;
    this.emitChange();
  };

  PositionStore.prototype.getLocationState = function getLocationState() {
    return {
      lat: this.lat,
      lon: this.lon,
      address: this.address,
      status: this.status,
      hasLocation: (this.status === PositionStore.STATUS_FOUND_ADDRESS || this.status === PositionStore.STATUS_FOUND_LOCATION) && (this.lat !== 0 || this.lon !== 0),
      // Locationing is in progress when browser is:
      //   searching address or
      //   reverse geocoding is in progress
      isLocationingInProgress: this.status === PositionStore.STATUS_SEARCHING_LOCATION
    };
  };

  PositionStore.prototype.storeWatchId = function storeWatchId(watchId) {
    this.watchId = watchId;
  };

  PositionStore.prototype.clearWatchId = function clearWatchId() {
    this.watchId = undefined;
  };

  return PositionStore;
}(Store);

PositionStore.storeName = 'PositionStore';
PositionStore.STATUS_NO_LOCATION = 'no-location';
PositionStore.STATUS_SEARCHING_LOCATION = 'searching-location';
PositionStore.STATUS_GEOLOCATION_PROMPT = 'prompt';
PositionStore.STATUS_FOUND_LOCATION = 'found-location';
PositionStore.STATUS_FOUND_ADDRESS = 'found-address';
PositionStore.STATUS_GEOLOCATION_DENIED = 'geolocation-denied';
PositionStore.STATUS_GEOLOCATION_TIMEOUT = 'geolocation-timeout';
PositionStore.STATUS_GEOLOCATION_WATCH_TIMEOUT = 'geolocation-watch-timeout';
PositionStore.STATUS_GEOLOCATION_NOT_SUPPORTED = 'geolocation-not-supported';
PositionStore.handlers = {
  GeolocationSearch: 'geolocationSearch',
  GeolocationFound: 'storeLocation',
  GeolocationNotSupported: 'geolocationNotSupported',
  GeolocationDenied: 'geolocationDenied',
  GeolocationTimeout: 'geolocationTimeout',
  GeolocationWatchTimeout: 'geolocationWatchTimeout',
  GeolocationPrompt: 'geolocationPrompt',
  AddressFound: 'storeAddress',
  GeolocationWatchStarted: 'storeWatchId',
  GeolocationWatchStopped: 'clearWatchId'
};
export default PositionStore;