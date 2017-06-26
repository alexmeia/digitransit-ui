import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Store from 'fluxible/addons/BaseStore';

var EndpointStore = function (_Store) {
  _inherits(EndpointStore, _Store);

  function EndpointStore(dispatcher) {
    _classCallCheck(this, EndpointStore);

    var _this = _possibleConstructorReturn(this, _Store.call(this, dispatcher));

    _this.origin = EndpointStore.getUseCurrent(_this.origin, false);
    _this.destination = EndpointStore.getUseCurrent(_this.destination, false);
    _this.emitChange('origin-use-current');
    return _this;
  }
  // Store the user selections for the origin and destination.
  // Both can optionally be set to track the current geolocation.

  EndpointStore.prototype.isCurrentPositionInUse = function isCurrentPositionInUse() {
    return this.origin.useCurrentPosition || this.destination.useCurrentPosition;
  };

  EndpointStore.prototype.clearOrigin = function clearOrigin() {
    this.origin = EndpointStore.getUseCurrent(null, false);
    this.emitChange('set-origin');
  };

  EndpointStore.prototype.clearDestination = function clearDestination() {
    this.destination = EndpointStore.getUseCurrent(null, false);
    this.emitChange();
  };

  EndpointStore.prototype.swapEndpoints = function swapEndpoints() {
    var _ref = [this.origin, this.destination];
    this.destination = _ref[0];
    this.origin = _ref[1];

    this.emitChange();
  };

  EndpointStore.prototype.setOriginToCurrent = function setOriginToCurrent() {
    if (this.destination.useCurrentPosition === true) {
      this.clearDestination();
    }

    this.origin = EndpointStore.getUseCurrent(this.origin, true);
    this.emitChange('set-origin');
  };

  EndpointStore.prototype.setDestinationToCurrent = function setDestinationToCurrent() {
    if (this.origin.useCurrentPosition === true) {
      this.clearOrigin();
    }

    this.destination = EndpointStore.getUseCurrent(this.destination, true);
    this.emitChange();
  };

  EndpointStore.getUseCurrent = function getUseCurrent(current, useCurrent) {
    return {
      useCurrentPosition: useCurrent,
      userSetPosition: current && current.userSetPosition || false,
      lat: null,
      lon: null,
      address: null
    };
  };

  EndpointStore.prototype.setOrigin = function setOrigin(location) {
    this.origin = {
      userSetPosition: true,
      useCurrentPosition: false,
      lat: location.lat,
      lon: location.lon,
      address: location.address
    };

    this.emitChange('set-origin');
  };

  EndpointStore.prototype.setDestination = function setDestination(location) {
    this.destination = {
      userSetPosition: true,
      useCurrentPosition: false,
      lat: location.lat,
      lon: location.lon,
      address: location.address
    };

    this.emitChange();
  };

  EndpointStore.prototype.getOrigin = function getOrigin() {
    return this.origin;
  };

  EndpointStore.prototype.getDestination = function getDestination() {
    return this.destination;
  };

  EndpointStore.prototype.clearGeolocation = function clearGeolocation() {
    if (this.origin.useCurrentPosition) {
      this.origin = EndpointStore.getUseCurrent(this.origin, false);
    }

    if (this.destination.useCurrentPosition) {
      this.destination = EndpointStore.getUseCurrent(this.destination, false);
    }

    this.emitChange();
  };

  EndpointStore.prototype.dehydrate = function dehydrate() {
    return {
      origin: this.origin,
      destination: this.destination
    };
  };

  EndpointStore.prototype.rehydrate = function rehydrate(data) {
    this.origin = data.origin;
    this.destination = data.destination;
  };

  EndpointStore.prototype.setEndpoint = function setEndpoint(props) {
    var target = props.target,
        value = props.value;


    if (target === 'destination') {
      this.setDestination(value);
    } else {
      this.setOrigin(value);
    }
  };

  EndpointStore.prototype.setEndpointIfNotCurrent = function setEndpointIfNotCurrent(props) {
    var target = props.target,
        value = props.value;


    if (target === 'destination') {
      if (!this.destination.useCurrentPosition) {
        this.setDestination(value);
      }
    } else if (!this.origin.useCurrentPosition) {
      this.setOrigin(value);
    }
  };

  EndpointStore.prototype.useCurrentPosition = function useCurrentPosition(payload) {
    if (payload.target === 'destination') {
      if (!this.destination.userSetPosition || !payload.keepSelectedLocation) {
        this.setDestinationToCurrent();
      }
    } else if (!this.origin.userSetPosition || !payload.keepSelectedLocation) {
      this.setOriginToCurrent();
      this.emitChange('origin-use-current');
    }
  };

  return EndpointStore;
}(Store);

EndpointStore.storeName = 'EndpointStore';
EndpointStore.handlers = {
  setEndpoint: 'setEndpoint',
  setEndpointIfNotCurrent: 'setEndpointIfNotCurrent',
  useCurrentPosition: 'useCurrentPosition',
  swapEndpoints: 'swapEndpoints',
  clearOrigin: 'clearOrigin',
  clearDestination: 'clearDestination',
  clearGeolocation: 'clearGeolocation'
};


export default EndpointStore;