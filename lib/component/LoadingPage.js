import React from 'react';
import Loading from './Loading';

export default function LoadingPage() {
  return React.createElement(
    'div',
    { style: { minHeight: 100 } },
    React.createElement(Loading, null)
  );
}