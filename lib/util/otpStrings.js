// Convert between location objects (address, lat, lon)
// and string format OpenTripPlanner uses in many places


export var otpToLocation = function otpToLocation(otpString) {
  var _otpString$split = otpString.split('::'),
      address = _otpString$split[0],
      coords = _otpString$split[1];

  if (coords) {
    return {
      address: address,
      lat: parseFloat(coords.split(',')[0]),
      lon: parseFloat(coords.split(',')[1])
    };
  }
  return { address: address };
};

export var locationToOTP = function locationToOTP(location) {
  return location.address + '::' + location.lat + ',' + location.lon;
};

export var locationToCoords = function locationToCoords(location) {
  return [location.lat, location.lon];
};