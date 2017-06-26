import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Store from 'fluxible/addons/BaseStore';
import { getMessagesStorage, setMessagesStorage } from './localStorage';

// Save to local storage as an array of key, value pairs
function saveMapToStorage(msgMap) {
  // Spread (...) operator is broken for Map and Set with babel set to loose
  return setMessagesStorage(Array.from(msgMap.entries()));
}

var MessageStore = function (_Store) {
  _inherits(MessageStore, _Store);

  function MessageStore() {
    _classCallCheck(this, MessageStore);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _Store.call.apply(_Store, [this].concat(args)));

    _this.addMessage = function (msg) {
      var message = _extends({}, msg);
      if (_this.messages.has(message.id)) {
        return;
      }

      message.read = false;
      _this.messages.set(message.id, message);
      saveMapToStorage(_this.messages);
      _this.emitChange();
    };

    _this.addConfigMessages = function (config) {
      if (config.staticMessages) {
        config.staticMessages.forEach(_this.addMessage);
      }
    };

    _this.markMessageAsRead = function (id) {
      _this.messages.get(id).read = true;
      saveMapToStorage(_this.messages);
      _this.emitChange();
    };

    _this.messages = new Map(getMessagesStorage());
    return _this;
  }

  /* Message format:
   * { id: id,
   *   content: {
   *     fi: {"title":"title", "content": "content"},
   *     sv: {"title":"title", "content": "content"},
   *   }
   * }
   */
  // TODO: Generate message id if missing


  return MessageStore;
}(Store);

MessageStore.storeName = 'MessageStore';
MessageStore.handlers = {
  AddMessage: 'addMessage',
  MarkMessageAsRead: 'markMessageAsRead'
};


export default MessageStore;