import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

let environment;

const source = new RecordSource();
const store = new Store(source);

const handlerProvider = null;

export function setNetworkLayerUrl(url) {
  function fetchQuery(
    operation,
    variables,
    ) {
    return fetch(url, {
      method: 'POST',
      headers: {
        // Add authentication and other headers here
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: operation.text.replace(/on Query/g, 'on QueryType'),
        variables,
      }),
    }).then(response => response.json());
  }

  const network = Network.create(fetchQuery);

  environment = new Environment({
    handlerProvider, // Can omit.
    network,
    store,
  });
}

export default function getEnvironment() { return environment; }
