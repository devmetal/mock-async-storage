<h1>Mock AsyncStorage for react-native</h1>

Its a mock of react-native AsyncStorage for jest tests

<h2>Install</h2>

<a href="https://npmjs.com" title="npm is a package manager for javascript"><h3>NPM</h3></a><ul>

<li>Install: <code>npm install --save mock-async-storage</code></li>
<li>Import: <code>import MockAsyncStorage from 'mock-async-storage'</code></li></ul>

<h1>Quick Jest Example</h1>

```JavaScript
// jest.config.js
module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/setup-tests.js',
  ],
};
```

```JavaScript
// setup-tests.js
import MockAsyncStorage from 'mock-async-storage';

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-community/async-storage', () => mockImpl);
```

<h2>@react-native-async-storage/async-storage</h2>

```JavaScript
import MockAsyncStorage from "mock-async-storage";

jest.mock(
  "@react-native-async-storage/async-storage",
  () => new MockAsyncStorage()
);
```

<h1>mock-async-storage@2.x.x</h1>

<h2>Whats the main difference?</h2>

<p>
I removed the jest specific part from the mock lib. In the next version
the mocking method is not predefined. You can use any kind of library (sinon) for use this mock.
</p>

<h2>Usage</h2>

<h3>Manual mocks</h3>

<p>
I suggest to use jest manual mocks <a href="https://facebook.github.io/jest/docs/en/manual-mocks.html">
Jest Manual Mocks
</a>
For demonstrate this solution you can find an example in examples folder.
<p>

<h3>Another mocking solution</h3>

```JavaScript
import MockAsyncStorage from 'mock-async-storage';
// or import { mock, release } from 'mock-async-storage';
// mock();
// release();

const mock = () => {
  const mockImpl = new MockAsyncStorage()
  jest.mock('AsyncStorage', () => mockImpl)
}

const release = () => jest.unmock('AsyncStorage')

mock();

// For unmock
mockStorage.release();
```

Working example:

```JavaScript
import 'react-native';
import MockAsyncStorage from 'mock-async-storage'
import React from 'react';
import Index from '../index.android.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const mock = () => {
  const mockImpl = new MockAsyncStorage()
  jest.mock('AsyncStorage', () => mockImpl)
}

mock();

import { AsyncStorage as storage } from 'react-native'

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  );
});

it('Mock Async Storage working', async () => {
  await storage.setItem('myKey', 'myValue')
  const value = await storage.getItem('myKey')
  expect(value).toBe('myValue')
})
```

<h1>mock-async-storage@1.x.x</h1>

<h2>Usage</h2>

In your test codes:

```JavaScript
const mockStorage = require('mock-async-storage');
// or import { mock, release } from 'mock-async-storage';
// mock();
// release();

// For mock AsyncStorage
mockStorage.mock();

// For unmock
mockStorage.release();
```

Working example:

```JavaScript
import 'react-native';
import { mock, release } from 'mock-async-storage'
import React from 'react';
import Index from '../index.android.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

mock()

import { AsyncStorage as storage } from 'react-native'

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  );
});

it('Mock Async Storage working', async () => {
  await storage.setItem('myKey', 'myValue')
  const value = await storage.getItem('myKey')
  expect(value).toBe('myValue')
})
```
