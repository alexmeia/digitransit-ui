export default function supportsInputType(inputType) {
  if (typeof document !== 'undefined') {
    var input = document.createElement('input');
    input.setAttribute('type', inputType);
    var desiredType = input.getAttribute('type');
    var supported = false;
    if (input.type === desiredType) {
      supported = true;
    }
    input.value = 'Hello world';
    var helloWorldAccepted = input.value === 'Hello world';
    switch (desiredType) {
      case 'email':
      case 'url':
        if (!input.validationMessage) {
          supported = false;
        }
        break;
      case 'color':
      case 'number':
      case 'date':
      case 'datetime':
      case 'month':
      case 'time':
      case 'week':
        supported = !helloWorldAccepted;
        break;
      default:
        break;
    }
    return supported;
  }
  return true;
}