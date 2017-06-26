import _typeof from 'babel-runtime/helpers/typeof';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Store from 'fluxible/addons/BaseStore';
import maxBy from 'lodash/maxBy';
import find from 'lodash/find';
import { getFavouriteLocationsStorage, setFavouriteLocationsStorage } from './localStorage';

var FavouriteLocationStore = function (_Store) {
  _inherits(FavouriteLocationStore, _Store);

  function FavouriteLocationStore(dispatcher) {
    _classCallCheck(this, FavouriteLocationStore);

    var _this = _possibleConstructorReturn(this, _Store.call(this, dispatcher));

    _this.getById = function (id) {
      return find(_this.locations, function (location) {
        return id === location.id;
      });
    };

    _this.migrate = function () {
      _this.migrateAndSave(_this.migrate01(_this.locations));
    };

    _this.migrateAndSave = function (migrationResult) {
      if (migrationResult !== null) {
        _this.locations = migrationResult;
        _this.save();
      }
    };

    _this.getMaxId = function (collection) {
      return (maxBy(collection, function (location) {
        return location.id;
      }) || { id: 0 }).id;
    };

    _this.migrate01 = function (locations) {
      var matchF = function matchF(favourite) {
        return favourite.version === undefined;
      };
      if (locations.filter(matchF).length === 0) return null; // nothing to migrate

      var maxId = _this.getMaxId(locations);

      var modified = locations.map(function (favourite) {
        maxId += 1;
        if (matchF(favourite)) {
          var migrated = _extends({}, favourite, { version: 1, id: maxId });
          return migrated;
        }
        return { favourite: favourite };
      });
      return modified;
    };

    _this.save = function () {
      setFavouriteLocationsStorage(_this.locations);
    };

    _this.locations = _this.getLocations();
    _this.migrate();
    return _this;
  }

  /*
   * migrate local storage data from old format to new.
  *  v1 adds
   *  {
   *    version: 1  // data version so we can migrate later too
   *    id:         // identifier (for updates)
   *  }
   */


  // eslint-disable-next-line class-methods-use-this
  FavouriteLocationStore.prototype.getLocations = function getLocations() {
    return getFavouriteLocationsStorage();
  };

  FavouriteLocationStore.prototype.addFavouriteLocation = function addFavouriteLocation(location) {
    if ((typeof location === 'undefined' ? 'undefined' : _typeof(location)) !== 'object') {
      throw new Error('location is not a object:' + JSON.stringify(location));
    }

    if (location.id === undefined) {
      // new
      this.locations.push(_extends({}, location, { id: 1 + this.getMaxId(this.locations) }));
    } else {
      // update
      this.locations = this.locations.map(function (currentLocation) {
        if (currentLocation.id === location.id) {
          return location;
        }
        return currentLocation;
      });
    }
    this.save();
    this.emitChange();
  };

  FavouriteLocationStore.prototype.deleteFavouriteLocation = function deleteFavouriteLocation(location) {
    this.locations = this.locations.filter(function (currentLocation) {
      return currentLocation.id !== location.id;
    });
    this.save();
    this.emitChange();
  };

  return FavouriteLocationStore;
}(Store);

FavouriteLocationStore.storeName = 'FavouriteLocationStore';
FavouriteLocationStore.handlers = {
  AddFavouriteLocation: 'addFavouriteLocation',
  DeleteFavouriteLocation: 'deleteFavouriteLocation'
};


export default FavouriteLocationStore;