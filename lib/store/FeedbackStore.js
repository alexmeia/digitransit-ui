import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Store from 'fluxible/addons/BaseStore';

var FeedbackStore = function (_Store) {
  _inherits(FeedbackStore, _Store);

  function FeedbackStore() {
    var _temp, _this, _ret;

    _classCallCheck(this, FeedbackStore);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Store.call.apply(_Store, [this].concat(args))), _this), _this.modalOpen = false, _temp), _possibleConstructorReturn(_this, _ret);
  }

  FeedbackStore.prototype.isModalOpen = function isModalOpen() {
    return this.modalOpen;
  };

  FeedbackStore.prototype.openFeedbackModal = function openFeedbackModal() {
    this.modalOpen = true;
    this.emitChange();
  };

  FeedbackStore.prototype.closeFeedbackModal = function closeFeedbackModal() {
    this.modalOpen = false;
    this.emitChange();
  };

  return FeedbackStore;
}(Store);

FeedbackStore.storeName = 'FeedbackStore';
FeedbackStore.handlers = {
  OpenFeedbackModal: 'openFeedbackModal',
  CloseFeedbackModal: 'closeFeedbackModal'
};


export default FeedbackStore;