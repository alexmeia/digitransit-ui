import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Store from 'fluxible/addons/BaseStore';

var RealTimeInformationStore = function (_Store) {
  _inherits(RealTimeInformationStore, _Store);

  function RealTimeInformationStore(dispatcher) {
    _classCallCheck(this, RealTimeInformationStore);

    var _this = _possibleConstructorReturn(this, _Store.call(this, dispatcher));

    _this.getVehicle = function (id) {
      return _this.vehicles[id];
    };

    _this.getSubscriptions = function () {
      return _this.subscriptions;
    };

    _this.vehicles = {};
    _this.subscriptions = [];
    return _this;
  }

  RealTimeInformationStore.prototype.storeClient = function storeClient(data) {
    this.client = data.client;
    this.subscriptions = data.topics;
  };

  RealTimeInformationStore.prototype.clearClient = function clearClient() {
    this.client = undefined;
    this.vehicles = {};
    this.subscriptions = [];
  };

  RealTimeInformationStore.prototype.updateSubscriptions = function updateSubscriptions(topics) {
    this.subscriptions = topics;
    this.vehicles = {};
  };

  RealTimeInformationStore.prototype.handleMessage = function handleMessage(message) {
    this.vehicles[message.id] = message.message;
    this.emitChange(message.id);
  };

  return RealTimeInformationStore;
}(Store);

RealTimeInformationStore.storeName = 'RealTimeInformationStore';
RealTimeInformationStore.handlers = {
  RealTimeClientStarted: 'storeClient',
  RealTimeClientStopped: 'clearClient',
  RealTimeClientMessage: 'handleMessage',
  RealTimeClientTopicChanged: 'updateSubscriptions'
};


export default RealTimeInformationStore;