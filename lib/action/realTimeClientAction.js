import moment from 'moment';
import { getJson } from '../util/xhrPromise';

// getTopic
// Returns MQTT topic to be subscribed
// Input: options - route, direction, tripStartTime are used to generate the topic
function getTopic(options) {
  var route = options.route ? options.route : '+';

  var direction = options.direction ? parseInt(options.direction, 10) + 1 : '+';

  var tripStartTime = options.tripStartTime ? options.tripStartTime : '+';
  return '/hfp/journey/+/+/' + route + '/' + direction + '/+/' + tripStartTime + '/#';
}

function parseMessage(topic, message, actionContext) {
  var parsedMessage = void 0;

  var _topic$split = /* ...geohash */
  topic.split('/'),
      mode = _topic$split[3],
      id = _topic$split[4],
      line = _topic$split[5],
      dir = _topic$split[6],
      /* headsign*/startTime = _topic$split[8],
      nextStop = _topic$split[9];

  if (message instanceof Uint8Array) {
    parsedMessage = JSON.parse(message).VP;
  } else {
    parsedMessage = message.VP;
  }

  var messageContents = {
    id: id,
    route: 'HSL:' + line,
    direction: parseInt(dir, 10) - 1,
    tripStartTime: startTime,
    operatingDay: parsedMessage.oday && parsedMessage.oday !== 'XXX' ? parsedMessage.oday : moment().format('YYYYMMDD'),
    mode: mode,
    delay: parsedMessage.dl,
    next_stop: nextStop,
    stop_index: parsedMessage.stop_index,
    timestamp: parsedMessage.tsi,
    lat: parsedMessage.lat,
    long: parsedMessage.long,
    heading: parsedMessage.hdg
  };

  actionContext.dispatch('RealTimeClientMessage', { id: id, message: messageContents });
}

function getInitialData(topic, actionContext) {
  getJson(actionContext.config.URL.REALTIME + topic.replace('#', '')).then(function (data) {
    Object.keys(data).forEach(function (resTopic) {
      parseMessage(resTopic, data[resTopic], actionContext);
    });
  });
}

export function startRealTimeClient(actionContext, originalOptions, done) {
  var options = !Array.isArray(originalOptions) ? [originalOptions] : originalOptions;

  var topics = options.map(function (option) {
    return getTopic(option);
  });

  topics.forEach(function (topic) {
    return getInitialData(topic, actionContext);
  });

  System.import('mqtt').then(function (mqtt) {
    var client = mqtt.connect(actionContext.config.URL.MQTT);
    client.on('connect', function () {
      return client.subscribe(topics);
    });
    client.on('message', function (topic, message) {
      return parseMessage(topic, message, actionContext);
    });
    actionContext.dispatch('RealTimeClientStarted', { client: client, topics: topics });
    done();
  });
}

export function updateTopic(actionContext, options, done) {
  options.client.unsubscribe(options.oldTopics);

  var newTopics = !Array.isArray(options.newTopic) ? [getTopic(options.newTopic)] : options.newTopic.map(function (topic) {
    return getTopic(topic);
  });

  options.client.subscribe(newTopics);
  actionContext.dispatch('RealTimeClientTopicChanged', newTopics);

  // Do the loading of initial data after clearing the vehicles object
  newTopics.forEach(function (topic) {
    return getInitialData(topic, actionContext);
  });

  done();
}

export function stopRealTimeClient(actionContext, client, done) {
  client.end();
  actionContext.dispatch('RealTimeClientStopped');
  done();
}