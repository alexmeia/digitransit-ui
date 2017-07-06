import {
  Environment,
  Network,
  RecordSource,
  Store,
  QueryResponseCache,
} from 'relay-runtime';

let environment;

const source = new RecordSource();
const store = new Store(source);

const handlerProvider = null;

export function setNetworkLayerUrl(url) {
  const cache = new QueryResponseCache({ size: 100, ttl: 10 * 60 * 1000 });

  function fetchQuery(
    operation,
    variables,
    ) {
    const cachedResponse = cache.get(operation.name, variables);
    if (cachedResponse) return Promise.resolve(cachedResponse);

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
    }).then(
      response => response.json(),
    ).then(
      (response) => {
        cache.set(operation.name, variables, response);
        return response;
      },
    );
  }

  const network = Network.create(fetchQuery);

  environment = new Environment({
    handlerProvider, // Can omit.
    network,
    store,
  });
}

export default function getEnvironment() { return environment; }
