export var getRoutePath = function getRoutePath(from, to) {
  return (// eslint-disable-line import/prefer-default-export
    ['/reitti', encodeURIComponent(from), encodeURIComponent(to)].join('/')
  );
};