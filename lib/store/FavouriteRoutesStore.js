import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Store from 'fluxible/addons/BaseStore';
import includes from 'lodash/includes';
import { setFavouriteRoutesStorage, getFavouriteRoutesStorage } from './localStorage';

var FavouriteRoutesStore = function (_Store) {
  _inherits(FavouriteRoutesStore, _Store);

  function FavouriteRoutesStore() {
    var _temp, _this, _ret;

    _classCallCheck(this, FavouriteRoutesStore);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Store.call.apply(_Store, [this].concat(args))), _this), _this.routes = _this.getRoutes(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  FavouriteRoutesStore.prototype.isFavourite = function isFavourite(id) {
    return includes(this.routes, id);
  };

  FavouriteRoutesStore.prototype.storeRoutes = function storeRoutes() {
    setFavouriteRoutesStorage(this.routes);
  };

  // eslint-disable-next-line class-methods-use-this


  FavouriteRoutesStore.prototype.getRoutes = function getRoutes() {
    return getFavouriteRoutesStorage();
  };

  FavouriteRoutesStore.prototype.addFavouriteRoute = function addFavouriteRoute(routeId) {
    if (typeof routeId !== 'string') {
      throw new Error('routeId is not a string:' + JSON.stringify(routeId));
    }

    var newRoutes = this.routes.filter(function (id) {
      return id !== routeId;
    });

    if (newRoutes.length === this.routes.length) {
      newRoutes.push(routeId);
    }

    this.routes = newRoutes;
    this.storeRoutes();
    this.emitChange(routeId);
  };

  return FavouriteRoutesStore;
}(Store);

FavouriteRoutesStore.storeName = 'FavouriteRoutesStore';
FavouriteRoutesStore.handlers = {
  AddFavouriteRoute: 'addFavouriteRoute'
};


export default FavouriteRoutesStore;