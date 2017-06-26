import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Store from 'fluxible/addons/BaseStore';
import { getFavouriteCityBikeStations, setFavouriteCityBikeStations } from './localStorage';

var FavouriteCityBikeStationStore = function (_Store) {
  _inherits(FavouriteCityBikeStationStore, _Store);

  function FavouriteCityBikeStationStore() {
    _classCallCheck(this, FavouriteCityBikeStationStore);

    return _possibleConstructorReturn(this, _Store.apply(this, arguments));
  }

  // eslint-disable-next-line class-methods-use-this
  FavouriteCityBikeStationStore.prototype.isFavourite = function isFavourite(id) {
    return getFavouriteCityBikeStations().includes(id);
  };

  FavouriteCityBikeStationStore.prototype.addFavouriteCityBikeStation = function addFavouriteCityBikeStation(id) {
    var favourites = getFavouriteCityBikeStations();
    if (!favourites.includes(id)) {
      favourites.push(id);
      setFavouriteCityBikeStations(favourites);
      this.emitChange();
    }
  };

  FavouriteCityBikeStationStore.prototype.removeFavouriteCityBikeStation = function removeFavouriteCityBikeStation(id) {
    var favourites = getFavouriteCityBikeStations();
    var newFavourites = favourites.filter(function (fav) {
      return fav !== id;
    });

    if (newFavourites.length !== favourites.length) {
      setFavouriteCityBikeStations(newFavourites);
      this.emitChange();
    }
  };

  FavouriteCityBikeStationStore.prototype.toggleFavouriteCityBikeStation = function toggleFavouriteCityBikeStation(id) {
    if (this.isFavourite(id)) {
      this.removeFavouriteCityBikeStation(id);
    } else {
      this.addFavouriteCityBikeStation(id);
    }
  };

  return FavouriteCityBikeStationStore;
}(Store);

FavouriteCityBikeStationStore.storeName = 'FavouriteCityBikeStationStore';
FavouriteCityBikeStationStore.handlers = {
  ToggleFavouriteCityBikeStation: 'toggleFavouriteCityBikeStation'
};


export default FavouriteCityBikeStationStore;