import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Store from 'fluxible/addons/BaseStore';
import includes from 'lodash/includes';
import { getFavouriteStopsStorage, setFavouriteStopsStorage } from './localStorage';

var FavouriteStopsStore = function (_Store) {
  _inherits(FavouriteStopsStore, _Store);

  function FavouriteStopsStore() {
    var _temp, _this, _ret;

    _classCallCheck(this, FavouriteStopsStore);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Store.call.apply(_Store, [this].concat(args))), _this), _this.stops = _this.getStops(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  // eslint-disable-next-line class-methods-use-this
  FavouriteStopsStore.prototype.getStops = function getStops() {
    return getFavouriteStopsStorage();
  };

  FavouriteStopsStore.prototype.isFavourite = function isFavourite(id) {
    return includes(this.stops, id);
  };

  FavouriteStopsStore.prototype.storeStops = function storeStops() {
    setFavouriteStopsStorage(this.stops);
  };

  FavouriteStopsStore.prototype.toggleFavouriteStop = function toggleFavouriteStop(stopId) {
    if (typeof stopId !== 'string') {
      throw new Error('stopId is not a string:' + JSON.stringify(stopId));
    }

    var newStops = this.stops.filter(function (id) {
      return id !== stopId;
    });

    if (newStops.length === this.stops.length) {
      newStops.push(stopId);
    }

    this.stops = newStops;
    this.storeStops();
    this.emitChange(stopId);
  };

  return FavouriteStopsStore;
}(Store);

FavouriteStopsStore.storeName = 'FavouriteStopsStore';
FavouriteStopsStore.handlers = {
  AddFavouriteStop: 'toggleFavouriteStop'
};


export default FavouriteStopsStore;