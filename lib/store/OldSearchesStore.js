import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Store from 'fluxible/addons/BaseStore';
import orderBy from 'lodash/orderBy';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';

import { getOldSearchesStorage, setOldSearchesStorage } from './localStorage';
import { getLabel } from '../util/suggestionUtils';

var OldSearchesStore = function (_Store) {
  _inherits(OldSearchesStore, _Store);

  function OldSearchesStore(dispatcher) {
    _classCallCheck(this, OldSearchesStore);

    var _this = _possibleConstructorReturn(this, _Store.call(this, dispatcher));

    var oldSearches = getOldSearchesStorage();
    if (!oldSearches || oldSearches.version == null || oldSearches.version < 2) {
      setOldSearchesStorage({
        version: 2,
        items: []
      });
    }
    return _this;
  }

  OldSearchesStore.prototype.saveSearch = function saveSearch(destination) {
    var searches = getOldSearchesStorage().items;

    var found = find(searches, function (oldItem) {
      return isEqual(getLabel(destination.item.properties), getLabel(oldItem.item.properties));
    });

    if (found != null) {
      found.count += 1;
    } else {
      searches.push(_extends({ count: 1 }, destination));
    }

    setOldSearchesStorage({ version: 2, items: orderBy(searches, 'count', 'desc') });
    searches = this.getOldSearches();
    this.emitChange(destination);
  };

  // eslint-disable-next-line class-methods-use-this


  OldSearchesStore.prototype.getOldSearches = function getOldSearches(type) {
    return getOldSearchesStorage().items && getOldSearchesStorage().items.filter(function (item) {
      return type ? item.type === type : true;
    }).map(function (item) {
      return item.item;
    }) || [];
  };

  return OldSearchesStore;
}(Store);

OldSearchesStore.storeName = 'OldSearchesStore';
OldSearchesStore.handlers = {
  SaveSearch: 'saveSearch'
};


export default OldSearchesStore;