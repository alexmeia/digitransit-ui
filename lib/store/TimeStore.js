import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Store from 'fluxible/addons/BaseStore';
import moment from 'moment';

var TimeStore = function (_Store) {
  _inherits(TimeStore, _Store);

  function TimeStore(dispatcher) {
    _classCallCheck(this, TimeStore);

    var _this = _possibleConstructorReturn(this, _Store.call(this, dispatcher));

    _this.updateCurrentTime = function () {
      _this.currentTime = moment();

      _this.emitChange({
        currentTime: _this.currentTime
      });
    };

    _this.updateCurrentTime();
    setInterval(_this.updateCurrentTime, TimeStore.TWICE_PER_MINUTE);
    return _this;
  }

  TimeStore.prototype.getCurrentTime = function getCurrentTime() {
    return this.currentTime.clone();
  };

  return TimeStore;
}(Store);

TimeStore.storeName = 'TimeStore';
TimeStore.TWICE_PER_MINUTE = 30 * 1000;
TimeStore.handlers = {};


export default TimeStore;