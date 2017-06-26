import _typeof from 'babel-runtime/helpers/typeof';
function serialize(obj, prefix) {
  if (!obj) {
    return '';
  }

  return Object.keys(obj).map(function (p) {
    var k = prefix || p;
    var v = obj[p];

    return (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' ? serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v);
  }).join('&');
}

// Return Promise for a url json get request
export function getJson(url, params) {
  return fetch(encodeURI(url) + (params ? (url.search(/\?/) === -1 ? '?' : '&') + serialize(params) : ''), {
    timeout: 10000,
    method: 'GET',

    headers: {
      Accept: 'application/json'
    }
  }).then(function (res) {
    return res.json();
  });
}

// Return Promise for a json post request
export function postJson(url, params, payload) {
  return fetch(encodeURI(url) + (params ? (url.search(/\?/) === -1 ? '?' : '&') + serialize(params) : ''), {
    timeout: 10000,
    method: 'POST',
    body: payload,

    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  });
}

// Return Promise for array of json get requests
export function getJsons(urls) {
  return Promise.all(urls.map(function (url) {
    return getJson(url);
  }));
}