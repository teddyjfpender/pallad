import { test, assert } from 'vitest'
import Docker from 'dockerode';
import { AccountInfoArgs } from '@palladxyz/mina-core'
import { AccountInfoGraphQLProvider } from '@palladxyz/mina-graphql'
import http from 'http';

test('Docker interaction with Mina local network', async () => {
  // Create a new Docker object
  let docker = new Docker();

  // Pull the Docker image
  docker.pull('o1labs/mina-local-network:rampup-latest-lightnet', function (err: any, stream: any) {
    assert(!err, 'Failed to pull Docker image');
  });
// Run the Docker image
try {
  const container = await docker.run('o1labs/mina-local-network:rampup-latest-lightnet', [], process.stdout, {});
  await new Promise(resolve => setTimeout(resolve, 60000)); // Wait for 60 seconds
  console.log('Successfully ran Docker image');
} catch (err) {
  console.error(err);
  assert.fail('Failed to run Docker image');
}

// Interact with local host URLs
http.get('http://localhost:8080/graphql', async (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', async () => {
    const minaNetworkGqlApi = JSON.parse(data); // Assuming the response data is the GraphQL endpoint

    const args: AccountInfoArgs = {
      publicKey: 'B62qjsV6WQwTeEWrNrRRBP6VaaLvQhwWTnFi4WP4LQjGvpfZEumXzxb'
    }

    const provider = new AccountInfoGraphQLProvider(minaNetworkGqlApi)
    const health = await provider.healthCheck()
    assert(health, 'Health check failed');

    const response = await provider.getAccountInfo(args)
    assert(response, 'Failed to get account info');
  });

}).on("error", (err) => {
  assert.fail(`Error: ${err.message}`);
});
});
