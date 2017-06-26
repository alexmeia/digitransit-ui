import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Store from 'fluxible/addons/BaseStore';
import { setModeStorage, getModeStorage } from './localStorage';

var ModeStore = function (_Store) {
  _inherits(ModeStore, _Store);

  function ModeStore(dispatcher) {
    _classCallCheck(this, ModeStore);

    var _this = _possibleConstructorReturn(this, _Store.call(this, dispatcher));

    _this.enableAll = function () {
      return {
        busState: _this.config.transportModes.bus.availableForSelection,
        tramState: _this.config.transportModes.tram.availableForSelection,
        railState: _this.config.transportModes.rail.availableForSelection,
        subwayState: _this.config.transportModes.subway.availableForSelection,
        ferryState: _this.config.transportModes.ferry.availableForSelection,
        airplaneState: _this.config.transportModes.airplane.availableForSelection,
        citybikeState: _this.config.transportModes.citybike.availableForSelection
      };
    };

    _this.generateMode = function () {
      var mode = [];

      if (_this.getBusState()) {
        mode.push('BUS');
      }

      if (_this.getTramState()) {
        mode.push('TRAM');
      }

      if (_this.getRailState()) {
        mode.push('RAIL');
      }

      if (_this.getSubwayState()) {
        mode.push('SUBWAY');
      }

      if (_this.getFerryState()) {
        mode.push('FERRY');
      }

      if (_this.getAirplaneState()) {
        mode.push('AIRPLANE');
      }

      if (_this.getCitybikeState()) {
        mode.push('BICYCLE_RENT');
      }

      _this.mode = mode;
      _this.modeString = mode.join(',');
    };

    _this.getMode = function () {
      return _this.mode;
    };

    _this.getModeString = function () {
      return _this.modeString;
    };

    _this.clearState = function () {
      _this.data.subwayState = false;
      _this.data.ferryState = false;
      _this.data.airplaneState = false;
      _this.data.citybikeState = false;
      _this.data.railState = false;
      _this.data.tramState = false;
      _this.data.busState = false;
    };

    _this.doToggle = function (name) {
      if (_this.data.selected !== name) {
        _this.clearState();
        _this.data[name] = true;
        _this.data.selected = name;
      } else {
        _this.data = _this.enableAll();
        _this.data.selected = undefined;
      }
      _this.storeMode();
      _this.generateMode();
      _this.emitChange();
    };

    _this.toggleFerryState = function () {
      _this.doToggle('ferryState');
    };

    _this.toggleAirplaneState = function () {
      _this.doToggle('airplaneState');
    };

    _this.storeMode = function () {
      setModeStorage(_this.data);
    };

    _this.dehydrate = function () {
      return _this.data;
    };

    _this.rehydrate = function (data) {
      _this.data = data;
    };

    var localData = getModeStorage();
    _this.config = dispatcher.getContext().config;
    _this.data = localData.busState !== undefined ? localData : _this.enableAll();
    _this.generateMode();
    return _this;
  }

  ModeStore.prototype.getData = function getData() {
    return this.data;
  };

  // Store the same array/string to enable change detection with shallow comparison


  ModeStore.prototype.getBusState = function getBusState() {
    return this.data.busState;
  };

  ModeStore.prototype.getTramState = function getTramState() {
    return this.data.tramState;
  };

  ModeStore.prototype.getRailState = function getRailState() {
    return this.data.railState;
  };

  ModeStore.prototype.getSubwayState = function getSubwayState() {
    return this.data.subwayState;
  };

  ModeStore.prototype.getFerryState = function getFerryState() {
    return this.data.ferryState;
  };

  ModeStore.prototype.getAirplaneState = function getAirplaneState() {
    return this.data.airplaneState;
  };

  ModeStore.prototype.getCitybikeState = function getCitybikeState() {
    return this.data.citybikeState;
  };

  ModeStore.prototype.toggleBusState = function toggleBusState() {
    this.doToggle('busState');
  };

  ModeStore.prototype.toggleTramState = function toggleTramState() {
    this.doToggle('tramState');
  };

  ModeStore.prototype.toggleRailState = function toggleRailState() {
    this.doToggle('railState');
  };

  ModeStore.prototype.toggleSubwayState = function toggleSubwayState() {
    this.doToggle('subwayState');
  };

  ModeStore.prototype.toggleCitybikeState = function toggleCitybikeState() {
    this.doToggle('citybikeState');
  };

  return ModeStore;
}(Store);

ModeStore.storeName = 'ModeStore';
ModeStore.handlers = {
  ToggleNearbyRouteBusState: 'toggleBusState',
  ToggleNearbyRouteTramState: 'toggleTramState',
  ToggleNearbyRouteRailState: 'toggleRailState',
  ToggleNearbyRouteSubwayState: 'toggleSubwayState',
  ToggleNearbyRouteFerryState: 'toggleFerryState',
  ToggleNearbyRouteCitybikeState: 'toggleCitybikeState',
  ToggleNearbyRouteAirplaneState: 'toggleAirplaneState'
};


export default ModeStore;